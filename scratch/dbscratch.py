class BusinessImage(db.Model):
    __table__name = "businessimages"

    business_id = db.Column(db.Integer, db.ForeignKey(
        "businesses.id"), nullable=False)
    url = db.Column(db.String)
    preview = db.Column(db.Boolean)

    business = db.relationship("Business", back_populates="images")


class Review(db.Model):
    tablename = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.foreignKey('user.id'), nullable=False)
    business_id = db.Column(db.Integer, db.foreignKey(
        'business.id'), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(), nullable=False)

    business = db.relationship('Business', back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
