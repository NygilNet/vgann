import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecentActivity } from '../../store/recentActivity';
import { getBusinesses } from '../../store/business'
import './index.css'
import ReviewTile from './ReviewTile';

const HomePage = () => {
  const dispatch = useDispatch()
  const recentActivity = useSelector(state => state.recentActivity);

  useEffect(() => {
    dispatch(getBusinesses());
    dispatch(getRecentActivity());
  }, [dispatch]);

  if (recentActivity.length === 0) {
    return (
      <div>Loading recent activity...</div>
    );
  }
  const reviews = recentActivity.filter(el => el.type === 'review')

  return (
    <>
      <section id='homePage'>
          <div id='homePage-previewImage'>
              <img src='https://i.imgur.com/HnO4Ygx.jpg' alt='Preview image' />
          </div>
      </section>
      <section>
        {reviews.map(review => <ReviewTile review={review} key={review.id}/>)}
      </section>
    </>
  )
};

export default HomePage;
