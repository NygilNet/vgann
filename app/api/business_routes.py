from flask import Blueprint, jsonify, request
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from flask_login import login_required, current_user
from sqlalchemy import func

business_routes = Blueprint('businesses', __name__)

@business_routes.route('')
def businesses():
    """
    Query for all businesses and returns them in a list of business dictionaries
    """

    query = Business.query.join(BusinessImage)
    query = Business.query.join(BusinessImage)
    city = request.args.get('city')
    name = request.args.get('name')
    categories = request.args.getlist('category')

    if city:
        query = query.filter(Business.city == city)
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
        'createdAt': business.created_at,
        'updatedAt': business.updated_at,
        'numReviews': db.session.query(func.count(Review.id)).filter(Review.business_id == business.id).scalar(),
        'avgRating': db.session.query(func.avg(Review.id)).filter(Review.business_id == business.id).scalar(),
        'images': [img.to_dict() for img in business.images],
        'categories':[category.to_dict() for category in business.categories],
    } for business in query.all()]

    return jsonify({'businesses': businesses_dict})

@business_routes.route('/<businessId>/reviews', methods=['POST'])
@login_required
def create_review(businessId):
    # Error handler 1: Business is not found
    business = Business.query.filter_by(id=businessId).all()
    if businessId is None or not business:
        return jsonify({
        "message": "Business couldn't be found",
        "statusCode": 404
        }), 404

    # Get the review data from the form fields
    form=ReviewForm()
    # Get the user id from the session
    user_id = current_user.id
    # Get review and stars data from form
    review=form.review.data
    stars=form.stars.data

    # Error handler 2: Either Review or stars data is missing
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

    # Error handler 3: Review from the current user already exists for the business
    reviews = Review.query.filter_by(user_id=user_id).all()
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
            business_id=businessId
        )
        db.session.add(review)
        db.session.commit()

        # Return a successful response
        return jsonify({
            'success': True,
            'message': 'Review created successfully',
            'review': review.to_dict()
        }), 201


@business_routes.route('/test')
def tester():
    query = Business.query
    businessesBefore = query.all()
    dicto = {biz for biz in businessesBefore}
    print(dicto)
    return "Hello"
