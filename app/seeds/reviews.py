from app.models import db, User, environment, SCHEMA, Review
from sqlalchemy.sql import text
from datetime import datetime
def seed_reviews():
    review1 = Review(
        user_id=1,
        business_id=1,
        stars=4,
        review="The food here was excellent, and the service was great too. Would definitely recommend!",
        created_at=datetime.strptime(
            "2022-02-15 10:30:00", "%Y-%m-%d %H:%M:%S"),
        updated_at=datetime.strptime(
            "2022-02-15 10:30:00", "%Y-%m-%d %H:%M:%S")
    )
    review2 = Review(
        user_id=2,
        business_id=1,
        stars=3,
        review="The food was good, but the service was a bit slow.",
        created_at=datetime.strptime(
            "2022-03-01 15:45:00", "%Y-%m-%d %H:%M:%S"),
        updated_at=datetime.strptime(
            "2022-03-01 15:45:00", "%Y-%m-%d %H:%M:%S")
    )
    review3 = Review(
        user_id=3,
        business_id=2,
        stars=5,
        review="This place is amazing! The food is delicious and the service is top-notch.",
        created_at=datetime.strptime(
            "2022-04-10 12:00:00", "%Y-%m-%d %H:%M:%S"),
        updated_at=datetime.strptime(
            "2022-04-10 12:00:00", "%Y-%m-%d %H:%M:%S")
    )
    review4 = Review(
        user_id=2,
        business_id=3,
        stars=2,
        review="I was really disappointed with my meal here. The food was bland and the service was terrible.",
        created_at=datetime.strptime(
            "2022-05-20 18:30:00", "%Y-%m-%d %H:%M:%S"),
        updated_at=datetime.strptime(
            "2022-05-20 18:30:00", "%Y-%m-%d %H:%M:%S")
    )
    review5 = Review(
        user_id=4,
        business_id=3,
        stars=4,
        review="The atmosphere here is great, and the food is pretty good too. Service could be a bit better though.",
        created_at=datetime.strptime(
            "2022-06-05 20:00:00", "%Y-%m-%d %H:%M:%S"),
        updated_at=datetime.strptime(
            "2022-06-05 20:00:00", "%Y-%m-%d %H:%M:%S")
    )

    db.session.add_all([review1,review2,review3,review4,review5]) 
    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
