import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecentActivity } from '../../store/recentActivity';
import './index.css'
import ReviewTile from './ReviewTile';

const HomePage = () => {
  const dispatch = useDispatch()
  const recentActivity = useSelector(state => state.recentActivity);

  useEffect(() => {
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
      <div className='recent-activity-title'>Recent Activity</div>
      <section className='recent-activity-container'>
        <div className='recent-activity-tiles'>
          {reviews.map(review => <ReviewTile review={review} key={review.id}/>)}
        </div>
      </section>
    </>
  )
};

export default HomePage;
