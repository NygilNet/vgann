import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearBusiness, getSingleBusiness } from '../../store/business';
import { clearReviews, getReviews, loadReviews } from '../../store/review';
import BusinessImages from './BusinessImages';
import DisplayReviews from './DisplayReviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './index.css'
import { NavLink } from 'react-router-dom';
import BusinessReview from './BusinessReview';
import ProfileIcon from './ProfileIcon';

const SingleBusinessShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleBusiness(id));
    return () => dispatch(clearBusiness());
  }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(getReviews(id));
  // }, [dispatch, id]);

  const business = useSelector(state => state.business.business);
  const user = useSelector(state => state.session.user);

  useEffect(()=>{
    if(business){
      dispatch(getReviews(business.reviews))
    }
  },[business])

  const reviews = useSelector(state=> state.reviews)

  const usersReview = Object.values(reviews).find(review => review.user_id === user.id && review.business_id === business.id);
  console.log(usersReview)


  if (!business ) {
    return null;
  }
  const reviewsArray = business.reviews
  if (!reviewsArray) {
    return null;
  }

  const avgRating = business.avgRating
  const price = Number.parseFloat(business.price).toFixed(2);
  let forcheck
  if(user){
    forcheck=user.id
  }
  const userHasPosted =  reviewsArray.find(r => r.user_id == forcheck);

  const previewImage = business.images.find(image => image.preview === true);
  const src = previewImage ? previewImage.url : null;


  return (
    <>
      <section id='single-business-top-images'>
        <BusinessImages images={business.images} />
      </section>
      <section id='single-business-top-content'>
        <ProfileIcon business={business} src={src} />
      </section>
      <div>
        {business.city}, {business.state}, {business.country}
      </div>
      <div>
        <div>
          <i className="fa-regular fa-star"></i>{avgRating}
        </div>
        <div className='review-button-container'>
          {user ?
            userHasPosted ?
              <NavLink to={`/businesses/${usersReview.id}/reviews/edit`} > "Edit Your Review"</NavLink>
              :<NavLink to={`/businesses/${business.id}/reviews/new`} > "POST Your Review"</NavLink>
            : ''}
        </div>
        <ul className='single-business-display-reviews-list'>
          <DisplayReviews businessId={id} />
        </ul>
      </div>
    <section className='all-biz-reviews'>

      {/* {reviews && Object.values(reviews).map(el=>( */}
      {business && business.reviews.map(el=>(

        <BusinessReview review={el}/>
      ))}
    </section>
    </>
  );
};

export default SingleBusinessShow;
