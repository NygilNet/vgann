from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class BusinessImage(db.Model):
    __table__name = "businessimages"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")), nullable=False)
    url = db.Column(db.String)
    preview = db.Column(db.Boolean,default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    business = db.relationship("Business", back_populates="images")
