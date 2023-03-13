from flask import Blueprint, jsonify, request, redirect
from app.models import Review, db
from flask_login import login_required, current_user
from sqlalchemy import func

review_routes = Blueprint('reviews', __name__)

# Delete review route
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
    else:
        return jsonify({'message':'forbidden'}), 403


# Edit Review Route
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
        req = request.json
        if req.get('stars') or req.get('stars') == 0:
            if int(req.get('stars')) in range(1,6):
                review.stars = req.get('stars')
            else:
                return jsonify({
                    "message": "Stars must be between 1-5",
                    "statusCode": 404
                })
        if req.get('review'):
            if len(req.get('review')):
                review.review = req.get('review')
            else:
                return jsonify({
                    "message": "Review must have text!",
                    "statusCode": 404
                })
        db.session.commit()
        return jsonify(review.to_dict()), 200


# Test route to get review - no production use is needed!
@review_routes.route('/<int:id>')
def get_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({
            "message": "Review couldn't be found",
            "statusCode": 404
        }), 404
    else:
        return jsonify(review.to_dict())
