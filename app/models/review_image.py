from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ReviewImage(db.Model):
    __table__name = "reviewimages"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    review = db.relationship("Review", back_populates="images")
