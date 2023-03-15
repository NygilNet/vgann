from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

business_routes = Blueprint('businesses', __name__)

# Middleware verifies if business exists
def business_exists_middleware(view_func):
    def nested_func(id):
        if Business.query.get(id) is None:
            return jsonify({
                'message': 'Business not found',
                'statusCode': 404
            }), 404
        return view_func(id=id)
    return nested_func


@business_routes.route('')
def businesses():
    """
    Query for all businesses and returns them in a list of business dictionaries
    """
    query = Business.query.join(BusinessImage)
    city = request.args.get('city')
    name = request.args.get('name')
    categories = request.args.getlist('category')

    if city:
        query = query.filter(Business.city == city)
    if name:
        query = query.filter(Business.name == name)
    if categories:
        cat_list=[cat.split(',') for cat in categories]
        categories=cat_list[0]
    # Use a list comprehension to get a list of Category objects
        category_queries = [Category.query.filter_by(category_name=c).first() for c in categories if c]
    # Use the any() function to generate a single filter that checks if
    # any of the categories are in the Business's categories relationship
        query = query.filter(Business.categories.any(
        Category.id.in_([c.id for c in category_queries])))

    #working with one category
    # category = request.args.get('category')
    # if category:
    #     # Use a subquery to filter restaurants by category
    #     category_query = Category.query.filter_by(category_name=category).first()
    #     query = query.filter(Business.categories.contains(category_query))
        # print('dduhisdhdichdichdichdich',query)

    businesses_dict = [{
        'id': business.id,
        'ownerId': business.owner_id,
        'name': business.name,
        'description': business.description,
        'features': business.features,
        'address': business.address,
        'city': business.city,
        'state': business.state,
        'lng': business.lng,
        'lat': business.lat,
        'price': business.price,
        'createdAt': business.created_at,
        'updatedAt': business.updated_at,
        'numReviews': db.session.query(func.count(Review.id)).filter(Review.business_id == business.id).scalar(),
        'avgRating': db.session.query(func.avg(Review.id)).filter(Review.business_id == business.id).scalar(),
        'previewImage': [img.to_dict() for img in business.images if img.preview == True],
        'categories':[category.to_dict() for category in business.categories],
    } for business in query.all()]

    return jsonify({'businesses': businesses_dict})

@business_routes.route('', methods=["POST"])
def create_new_business():
    form = BusinessForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        business = Business(
            name=form.name.data,
            description=form.description.data,
            features=form.features.data,
            address=form.address.data,
            city=form.city.data,
            state=form.state.data,
            lng=form.lng.data,
            lat=form.lat.data,
            owner_id=current_user.id
        )
        categories=form.categories.data.split(",")
        for cat in categories:
            business.categories.append(Category.query.get(cat))
        img=BusinessImage(url=request.json.get('image'))
        business.images.append(img)
        db.session.add(business)
        db.session.commit()
        return jsonify(business.to_dict())



@business_routes.route('/<int:id>')
def single_business(id):
    res = db.session.query(Business).filter_by(id=id).first()
    business = res.to_dict()
    business['images'] = [img.to_dict() for img in db.session.query(
        BusinessImage).filter_by(business_id=id).all()]
    business['numReviews'] = db.session.query(func.count(
        Review.id)).filter(Review.business_id == id).scalar()
    business['avgRating'] = db.session.query(
        func.avg(Review.id)).filter(Review.business_id == id).scalar()
    business['categories'] = [category.to_dict() for category in res.categories]
    business['reviews'] = [rev.to_dict() for rev in res.reviews]

    return jsonify(business)


#Get Business of Current USer


@business_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_business(id):
    business = Business.query.get(id)

    # check if the business exists
    if not business:
        return jsonify({'message': 'Business not found'}), 404

    # update the business attributes
    if business.owner_id == current_user.id:
        business_data=request.get_json()
        business.name = business_data.get('name', business.name)
        business.description = business_data.get(
            'description', business.description)
        business.features = business_data.get('features', business.features)
        business.address = business_data.get('address', business.address)
        business.city = business_data.get('city', business.city)
        business.state = business_data.get('state', business.state)
        business.lng = business_data.get('lng', business.lng)
        business.lat = business_data.get('lat', business.lat)
        db.session.commit()
    # commit the changes to the database
    # images_data = business_data.get('images', [])
    # for image_data in images_data:
    #     image_id = image_data.get('id')
    #     if image_id:
    #         # Update existing image
    #         image = BusinessImage.query.filter_by(
    #             id=image_id, business_id=id).first()
    #         if image:
    #             image.url = image_data.get('url', image.url)
    #             image.preview = image_data.get('preview', image.preview)
    #     else:
    #         # Create new image
    #         image = BusinessImage(
    #             business_id=id,
    #             url=image_data.get('url'),
    #             preview=image_data.get('preview', False)
    #         )
    #         db.session.add(image)


        return jsonify(business.to_dict()), 200
    else:
        return {"message":'forbidden'}



@business_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
@business_exists_middleware
def create_review(id):
    # Get the review data from the form fields
    form=ReviewForm()
    # Get the user id from the session
    user_id = current_user.id
    # Get review and stars data from form
    review=form.review.data
    stars=form.stars.data

    # Error handler 1: Either Review or stars data is missing
    if stars is None or review is None:
        errors = {}
        if stars is None:
            errors['stars'] = "Stars must be an integer from 1 to 5"
        if review is None:
            errors['review'] = "Review text is required"
        return jsonify({
            "errors": errors,
            "statusCode": 400
        }), 400

    # Error handler 2: Review from the current user already exists for the business
    reviews = Review.query.filter_by(user_id=user_id,business_id=id).all()
    if reviews:
        return jsonify({
            "message": "User already has a review for this business",
            "statusCode": 403
        }), 403

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        review = Review(
            review=review,
            stars=stars,
            user_id=user_id,
            business_id=id
        )
        db.session.add(review)
        db.session.commit()

        # Return a successful response
        return jsonify({
            'success': True,
            'message': 'Review created successfully',
            'review': review.to_dict()
        }), 201


@business_routes.route('/<int:id>/reviews')
def business_reviews(id):
    # Error handler 1: Business is not found
    business = Business.query.filter_by(id=id).all()
    if id is None or not business:
        return jsonify({
        "message": "Business couldn't be found",
        "statusCode": 404
        }), 404
    reviews = Review.query.filter_by(business_id=id).all()
    return jsonify([rev.to_dict() for rev in reviews])


@business_routes.route("/<int:id>/images", methods=["POST"])
def post_business_image(id):
    json_data = request.json
    business_image = BusinessImage(
        business_id=id,
        url=json_data.get('url'),
        preview=json_data.get('preview')
    )
    db.session.add(business_image)
    db.session.commit()
    return jsonify(business_image.to_dict())


#DELETE BUSINESS

@business_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_business(id):
    business = Business.query.get(id)
    if business.owner_id==current_user.id:
        db.session.delete(business)
        db.session.commit()
        return {"message": "successfully deleted"}
    else:
        return {'message':'forbidden'}






@business_routes.route('/test')
def tester():
    img=BusinessImage(
        business_id=6,
        url="siisih.jpg",
        preview=True
    )
    db.session.add(img)
    db.session.commit()
    return "Hello"
