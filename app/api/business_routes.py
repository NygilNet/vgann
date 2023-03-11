from flask import Blueprint, jsonify, request
from app.models import Business, BusinessImage, User, Category
from sqlalchemy.orm import joinedload
business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
def businesses():
    """
    Query for all businesses and returns them in a list of business dictionaries
    """

    query = Business.query.join(BusinessImage)
    city = request.args.get('city')
    name = request.args.get('name')
    # category = request.args.get('category')
    if city:
        query = query.filter(Business.city == city)
    if name:
        query = query.filter(Business.name == name)
    # if category:
    #     query = query.filter(Business.categories[0].categoryName == category)



    #working with one category
    # category = request.args.get('category')
    # if category:
    #     # Use a subquery to filter restaurants by category
    #     category_query = Category.query.filter_by(category_name=category).first()
    #     query = query.filter(Business.categories.contains(category_query))
        # print('dduhisdhdichdichdichdich',query)


    # categories = request.args.getlist('category')
    # if categories:
    #     # Use a list comprehension to get a list of Category objects
    #     category_queries = [Category.query.filter_by(category_name=c).first() for c in categories if c]

    #     # Use the any() function to generate a single filter that checks if
    #     # any of the categories are in the Restaurant's categories relationship
    #     query = query.filter(Business.categories.contains(c) for c in category_queries)


    categories = request.args.getlist('category')
    cat_list=[cat.split(',') for cat in categories]
    print('shjsijsijsijissssss',cat_list)
    categories=cat_list[0]

    if cat_list:
    # Use a list comprehension to get a list of Category objects
        category_queries = [Category.query.filter_by(category_name=c).first() for c in categories if c]

    # Use the any() function to generate a single filter that checks if
    # any of the categories are in the Business's categories relationship
        query = query.filter(Business.categories.any(
        Category.id.in_([c.id for c in category_queries])))


    # businesses_dict = [{
    #     'id': business.id,
    #     'ownerId': business.owner_id,
    #     'name': business.name,
    #     'description': business.description,
    #     'features': business.features,
    #     'address': business.address,
    #     'city': business.city,
    #     'state': business.state,
    #     'lng': business.lng,
    #     'lat': business.lat,
    #     'createdAt': business.created_at,
    #     'updatedAt': business.updated_at,
    #     'images': [{
    #         'id': img.id,
    #         'businessId': img.business_id,
    #         'url': img.url,
    #         'preview': img.preview,
    #         'createdAt': img.created_at,
    #         'updatedAt': img.updated_at

    #     } for img in business.images]
    # } for business in query.all()]
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
        'images': [img.to_dict() for img in business.images],
        'categories':[category.to_dict() for category in business.categories],
    } for business in query.all()]



    #businesses = [business.to_dict() for business in query.all()]
    # [biz['images'] for biz in businessesBefore]
    # for biz in businesses:
    #     print('x')
        # images = BusinessImage.query.filter_by(business_id=biz['id']).all()
        # print("dsfsfsf",images)
        # biz['images'] = images

    # businesses = [business.to_dict() for business in query.all()]



    return jsonify({'businesses': businesses_dict})

@business_routes.route('/test')
def tester():
    query = Business.query
    businessesBefore = query.all()
    dicto = {biz for biz in businessesBefore}
    print(dicto)
    return "Hello"
