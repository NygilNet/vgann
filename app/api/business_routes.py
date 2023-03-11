from flask import Blueprint, jsonify, request
from app.models import Business, BusinessImage, User

business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
def businesses():
    """
    Query for all businesses and returns them in a list of business dictionaries
    """

    query = Business.query
    city = request.args.get('city')
    name = request.args.get('name')
    if city:
        query = query.filter_by(city=city)
    if name:
        query = query.filter_by(name=name)



    businesses = [business.to_dict() for business in query.all()]
    # [biz['images'] for biz in businessesBefore]
    for biz in businesses:
        print('x')
        # images = BusinessImage.query.filter_by(business_id=biz['id']).all()
        # print("dsfsfsf",images)
        # biz['images'] = images

    # businesses = [business.to_dict() for business in query.all()]



    return jsonify({'businesses': businesses})

@business_routes.route('/test')
def tester():
    query = Business.query
    businessesBefore = query.all()
    dicto = {biz for biz in businessesBefore}
    print(dicto)
    return "Hello"
