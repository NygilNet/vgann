import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearBusiness, getSingleBusiness } from '../../store/business';
import { clearReviews, getReviews } from '../../store/review';
import BusinessImages from './BusinessImages';
import DisplayReviews from './DisplayReviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './index.css'
import PreviewStars from './PreviewStars';
import { NavLink } from 'react-router-dom';
import BusinessReview from './BusinessReview';

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
  //const reviews = useSelector(state => state.reviews);
  const user = useSelector(state => state.session.user);

  if (!business ) {
    return null;
  }
  const reviewsArray = business.reviews
  if (!reviewsArray) {
    return null;
  }

  //const reviewsArray = Object.values(reviews);
  //const avgRating = (reviewsArray.reduce((acc, b) => acc + b.stars, 0) / reviewsArray.length).toFixed(1) || 'New';


  const avgRating = business.avgRating
  const price = Number.parseFloat(business.price).toFixed(2);
  let forcheck
  if(user){
    forcheck=user.id
  }
  const userHasPosted =  reviewsArray.find(r => r.user_id == forcheck);

  console.log('dsbcjdbcjdbcjdcbdjcb',userHasPosted)


  return (
    <>
    <section id='single-business-top'>
        <BusinessImages images={business.images} />
    </section>
    <section id='single-business-middle'>
        <div id='single-business-top-header'>
            <FontAwesomeIcon icon={faUser} id="profile-icon" /><span ><div>{business.name}</div><div><PreviewStars avg={.5} /> </div></span>
        </div>
      <div>{business.city}, {business.state}, {business.country}</div>
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
            {user ? userHasPosted ? <NavLink to={`/businesses/${business.id}/reviews/new`} > "Edit Your Review"</NavLink> :<NavLink to={`/businesses/${business.id}/reviews/new`} > "POST Your Review"</NavLink>  : ''}

        </div>
        <ul className='single-business-display-reviews-list'>
          <DisplayReviews businessId={id} />
        </ul>
      </div>
    </section>
    <section className='all-biz-reviews'>
      {business && business.reviews.map(el=>(
        <BusinessReview review={el}/>
      ))}
    </section>
    </>
  );
};

export default SingleBusinessShow;
