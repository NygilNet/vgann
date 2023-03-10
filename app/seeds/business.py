from app import db
from app.models import Business, Category

# Seed the database with 5 businesses
def seed_businesses():
    # Retrieve the existing categories from the database
    categories = Category.query.all()

    # Create some businesses
    biz1 = Business(owner_id=1, name='Bob\'s Burgers', description='Classic burgers and fries.', features="Outdoor seating,Delivery", address='123 Main St', city='New York', state='NY', lng=-73.985428, lat=40.748817)
    biz1.categories = categories[0:3]

    biz2 = Business(owner_id=2, name='Joe\'s Pub', description='Live music and drinks.', features="Outdoor seating,Open All Day", address='456 Broadway', city='New York', state='NY', lng=-73.997706, lat=40.726442)
    biz2.categories = categories[3:6]

    biz3 = Business(owner_id=3, name='Pete\'s Pizza', description='Authentic Italian pizza.', features="Takeout,Deliver", address='789 7th Ave', city='New York', state='NY', lng=-73.975952, lat=40.761745)
    biz3.categories = categories[0:3]

    biz4 = Business(owner_id=2, name='Sally\'s Salon', description='Full-service hair salon.', features="Open All Day", address='321 5th Ave', city='Brooklyn', state='NY', lng=-73.975952, lat=40.678178)
    biz4.categories = categories[6:9]

    biz5 = Business(owner_id=4, name='Moe\'s Deli', description='Fresh sandwiches and salads.', address='654 Smith St', city='Brooklyn', state='NY', lng=-73.998606, lat=40.678701)
    biz5.categories = categories[0:5]

    # Add the businesses to the database
    db.session.add_all([biz1, biz2, biz3, biz4, biz5])
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
