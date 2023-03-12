from flask import Blueprint, jsonify, request, redirect
from app.models import Review, db
# from ..forms.review_form import ReviewForm
# from ..forms.new_business_form import BusinessForm
from flask_login import login_required, current_user
from sqlalchemy import func

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({
            "message": "Review couldn't be found",
            "statusCode": 404
        }), 404
    if review.user_id==current_user.id:
        db.session.delete(review)
        db.session.commit()
        return jsonify({
            "message": "Successfully deleted",
            "statusCode": 200
        }), 200


# Edit Review Route, still in progress
@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({
            "message": "Review couldn't be found",
            "statusCode": 404
        }), 404
    if review.user_id==current_user.id:
        req = request.json()
        review.stars = req('stars',review.stars)
        review.review = req('review', review.review)
        db.session.commit()
        return jsonify(review.to_dict()), 200
