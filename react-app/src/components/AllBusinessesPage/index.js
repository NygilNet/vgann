import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinesses } from '../../store/business'
import BusinessTile from './BusinessTile'

const Businesses = () => {
  const dispatch = useDispatch();

  const businesses = useSelector(state => state.businesses.businesses);

  useEffect(() => {dispatch(getBusinesses())}, [dispatch]);

  if (!businesses) {
    return null;
  }

  return (
    <>
        <section id='business-map'></section>
        <section id='business-gallery'>
        <div id='business-tiles'>
            {Object.values(businesses).map(business => <BusinessTile business={business} />)}
        </div>
        </section>
    </>
  )
};

export default Businesses;
