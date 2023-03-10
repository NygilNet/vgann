from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from models import business_category

class Category(db.Model):
    __table__name = "categories"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(), nullable=False)

    businesses = db.relationship("Business",secondary=business_category, back_populates='categories')

    