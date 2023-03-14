import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecentActivity } from '../../store/recentActivity';
import { getBusinesses } from '../../store/business'
import './index.css'
import ReviewTile from './ReviewTile';
import BusinessTile from './BusinessTile'
import CategoriesGrid from '../CategoriesGrid';

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
  // const businesses = recentActivity.filter(el => el.type === 'business')
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
      <section className='categories-tiles'>
        <CategoriesGrid />
      </section>
    </>
  )
};

export default HomePage;
