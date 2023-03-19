from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    stacy = User(
        username='stacy', email='stacy@aa.io', password='7Fg5Ug'
    )
    jennie = User(
        username='jenny', email='jenjen@gmail.com', password='RYww9T'
    )
    joe = User(
        username='joe', email='jojo@gmail.com', password='ra2apV'
    )
    martin = User(
        username='martin', email='marty@aa.io', password='N326x6'
    )
    mario = User(
        username='mario', email='letsgo@gmail.com', password='Ny9KCT'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(stacy)
    db.session.add(jennie)
    db.session.add(joe)
    db.session.add(martin)
    db.session.add(mario)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
