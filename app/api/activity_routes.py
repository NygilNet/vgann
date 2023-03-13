from flask import Blueprint, jsonify, request, redirect
from app.models import Business, BusinessImage, ReviewImage, User, Category, Review, db
from flask_login import login_required, current_user
from sqlalchemy import func

activity_routes = Blueprint('activites', __name__)

@activity_routes.get('/recent')
def recent_activity():
    activities = (Business.query.order_by(Business.updated_at.desc()).limit(10).all() +
                  Review.query.order_by(Review.updated_at.desc()).limit(10).all() +
                  BusinessImage.query.order_by(BusinessImage.updated_at.desc()).limit(10).all() +
                  ReviewImage.query.order_by(ReviewImage.updated_at.desc()).limit(10).all())
    activities.sort(key=lambda x: x.updated_at, reverse=True)
    res_list = []
    for act in activities[0:10]:
        if isinstance(act,Review):
            res = act.to_dict()
            res['type'] = 'review'
            res_list.append(res)
        elif isinstance(act,Business):
            res = act.to_dict()
            res['type'] = 'business'
            res_list.append(res)
        elif isinstance(act,BusinessImage):
            res = act.to_dict()
            res['type'] = 'businessImage'
            res_list.append(res)
        else:
            res = act.to_dict()
            res['type'] = 'reviewImage'
            res_list.append(res)

    return jsonify(res_list)
