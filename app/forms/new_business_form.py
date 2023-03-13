from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField,FloatField
from wtforms.validators import DataRequired, NumberRange,Length


class BusinessForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=150)])
    description = TextAreaField('Description', validators=[DataRequired()])
    features = TextAreaField('Features')
    address = StringField('Address', validators=[
                          DataRequired(), Length(max=150)])
    city = StringField('City', validators=[DataRequired(), Length(max=150)])
    state = StringField('State', validators=[DataRequired(), Length(max=2)])
    lng = FloatField('Longitude', validators=[DataRequired()])
    lat = FloatField('Latitude', validators=[DataRequired()])
    price = IntegerField('Price', validators=(DataRequired(), NumberRange(min=1, max=4)))
    categories=StringField("Categories")
