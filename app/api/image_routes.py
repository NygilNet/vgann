from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func


image_routes = Blueprint('images', __name__)

@image_routes.route('/business/<int:id>', methods=["DELETE"])
@login_required
def delete_image(id):
    img=BusinessImage.query.get(id)
    db.session.delete(img)
    db.session.commit()
    return {"message":"successfully deleted"}

# @image_routes.route('/test',methods=['POST'])
# def some():
    
#     json_data=request.json
#     test =json_data.get('test')
#     print('disdichdihcdichdichdichj',test)
#     return test