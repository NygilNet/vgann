from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

category_routes = Blueprint('categories', __name__)

@category_routes.route('/<int:business_id>/categories',methods=['PUT'])
@login_required
def update_business_categories(business_id):
    business=Business.query.get(business_id)
    if not business:
        return jsonify({'message':'Business not found'})
    tocheckcategories=request.json.get('categories').split(',')
    categories= Category.query.filter(Category.id.in_(tocheckcategories)).all()
    business.categories=categories
    db.session.commit()
    return jsonify({'message':'Categories updated suyccesfully'})