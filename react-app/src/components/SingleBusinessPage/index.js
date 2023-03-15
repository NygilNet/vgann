import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearBusiness, getSingleBusiness } from '../../store/business';
import { clearReviews, getReviews } from '../../store/review';
import BusinessImages from './BusinessImages';
import DisplayReviews from './DisplayReviews';
import './index.css'

const SingleBusinessShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleBusiness(id));
    return () => dispatch(clearBusiness());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  const business = useSelector(state => state.business.business);
  const reviews = useSelector(state => state.reviews);
  const user = useSelector(state => state.session.user);

  if (!business) {
    return null;
  }

  const reviewsArray = Object.values(reviews);
  const avgRating = (reviewsArray.reduce((acc, b) => acc + b.stars, 0) / reviewsArray.length).toFixed(1) || 'New';
  const price = Number.parseFloat(business.price).toFixed(2);
  const userHasPosted = user && reviewsArray.some(r => r.userId === user.id);

  return (
    <section id='single-business'>
      <div>{business.name}</div>
      <div>{business.city}, {business.state}, {business.country}</div>
      <BusinessImages images={business.images} />
      <div id='description-container'>
        <div id="name-description-container">
          <div id="hosted-by">Hosted by -insert owner name-</div>
          <div id="business-description">{business.description}</div>
        </div>
        <div id="reserve-container">
          <div id="reserve-container-child1">
            <div>
              <span id="reserve-container-price">${price}</span><span id="reserve-container-child1-night"> night</span>
            </div>
            <div>
              <i className="fa-regular fa-star"></i><span>{avgRating} · {reviewsArray.length} reviews</span>
            </div>
          </div>
          <div className='reserve-button-container'>
            <button className="reserve-button" type="button" onClick={() => alert('Feature Coming Soon...')}>
                Reserve
            </button>
          </div>
        </div>
      </div>
      <div>
        <div><i className="fa-regular fa-star"></i>{avgRating}</div>
        <div className='review-button-container'>
        {userHasPosted && user && <button>"Post Your Review"</button>}
        </div>
        <ul className='single-business-display-reviews-list'>
          <DisplayReviews businessId={id} />
        </ul>
      </div>
    </section>
  );
};

export default SingleBusinessShow;
