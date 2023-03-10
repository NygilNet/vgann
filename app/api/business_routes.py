from flask import Blueprint, jsonify, request
from app.models import Business

business_routes = Blueprint('businesses', __name__)

@business_routes.route('/')
def businesses():
    """
    Query for all businesses and returns them in a list of business dictionaries
    """
    businesses = Business.query.all()
    return {'businesses': [business.to_dict() for business in businesses]}
