# VGAN MVP List

VGAN, a Yelp clone, is a website for users to post their restaurant businesses and leave (possibly passive aggressive) reviews about the businesses.

## 1. New account creation, log in, log out, and guest/demo login (partial)

* Users can sign up, log in, and log out
* Users can not use certain features without logging in (like posting businesses)
* Logged out users can view all businesses

## 2. Business Page (full)

* Logged in users can post businesses
* Logged in users can edit and delete their own businesses
* All user can view all businesses

## 3. Search / filters

* read

## 4. Reviews / ratings (full)

* Logged in users can post review
* Logged in users can edit and delete their own reviews
* All users can view reviews related to a business

## 5. Map


businesses model for database mark-up
```python

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.foreignKey('user.id'), nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String, nullable=False)
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    category_id = db.Column(db.Integer, db.foreignKey('category.id'), nullable=False)

    owner = db.relationship("User", back_populates="owners")
    category = db.relationship("Category", back_populates="categories")
    images = db.relationship("BusinessImage", back_populates="business", cascade="all,delete")
    reviews = db.relationship("Review", back_populates='business')

    # ponies = relationship("Pony",
    #                       back_populates="owner",
    #                       cascade="all, delete-orphan")

```

reviews model for database mark-up
```python
class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.foreignKey('user.id'), nullable=False)
    business_id = db.Column(db.Integer, db.foreignKey('business.id'), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(),nullable=False)

    business = db.relationship('Business', back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
```
