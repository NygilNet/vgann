import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinesses } from '../../store/business'
import BusinessTile from './BusinessTile'
import BusinessesMap from './BusinessesMap'
import FilterForm from './FilterForm'
import './index.css'

const Businesses = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.business.all_businesses);
//   const [markers, setMarkers] = useState([
//     { id: 1, name: 'Marker 1', lat: 40.748817, lng: -73.985664 },
//     { id: 2, name: 'Marker 2', lat: 40.712776, lng: -74.005974 },
//     { id: 3, name: 'Marker 3', lat: 40.729640, lng: -73.959724 }
//   ]);

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  if (!businesses) return null

  return (
    <div id='business-container'>
      <section id='business-filter'>
        <FilterForm />
      </section>
      <section id='business-gallery'>
          <div id='business-tiles'>
          {Object.values(businesses).map(business => <BusinessTile business={business} key={business.id}/>)}
          </div>
      </section>
      <section id='business-map'>
          <BusinessesMap businesses={Object.values(businesses)} />
      </section>
    </div>
  )
};

export default Businesses;
