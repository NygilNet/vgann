from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func


image_routes = Blueprint('images', __name__)

@image_routes.route("/<int:id>", methods=["POST"])
def post_business_image(id):
    json_data = request.json
    business_image=BusinessImage(
        business_id=id,
        url=json_data.get('url'),
        preview= json_data.get('preview')
    )
    db.session.add(business_image)
    db.session.commit()
    return jsonify(business_image.to_dict())


# @image_routes.route('/test',methods=['POST'])
# def some():
    
#     json_data=request.json
#     test =json_data.get('test')
#     print('disdichdihcdichdichdichj',test)
#     return test