from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, User, Category, Review, db
from ..forms.review_form import ReviewForm
from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:userId>/current')
@login_required
def current_user_businesses(userId):
    allbusinesses = db.session.query(Business).filter_by(
        owner_id=userId).all()
    togo = []
    for res in allbusinesses:
        business = res.to_dict()
        business['previewimage'] =  db.session.query(BusinessImage).filter_by(business_id=business["id"], preview=True).first().to_dict()
        business['numReviews'] = db.session.query(func.count(
            Review.id)).filter(Review.business_id == business["id"]).scalar()
        business['avgRating'] = db.session.query(
            func.avg(Review.id)).filter(Review.business_id == business["id"]).scalar()
        togo.append(business)
    return jsonify(togo)
