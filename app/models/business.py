from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(), nullable=False)
    features = db.Column(db.String())
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    lng = db.Column(db.Float,nullable=False)
    lat = db.Column(db.Float,nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    # category_id = db.Column(db.Integer, db.foreignKey('category.id'), nullable=False)

    owner = db.relationship("User", back_populates="owners")
    category = db.relationship("Category", back_populates="categories")
    images = db.relationship("BusinessImage", back_populates="business", cascade="all,delete")
    reviews = db.relationship("Review", back_populates='business')
