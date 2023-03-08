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


```python

class BusinessPage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(150), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    category_id = db.Column(db.Integer, nullable=False)

```
