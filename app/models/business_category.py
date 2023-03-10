from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from models import Business, Category

business_category = db.Table(
    'business_categories',
    db.Column('business_id', db.ForeingKey(add_prefix_for_prod('businesses.id')), primary_key=True),
    db.Column('category_id', db.ForeingKey(add_prefix_for_prod('categories.id')), primary_key=True)
)
