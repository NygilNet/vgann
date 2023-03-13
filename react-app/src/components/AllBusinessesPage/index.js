import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinesses } from '../../store/business'
import BusinessTile from './BusinessTile'
import BusinessesMap from './BusinessesMap'

const Businesses = () => {
  const dispatch = useDispatch();
  const businesses = useSelector(state => state.businesses.all_businesses);
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
    <div>
    <section style={{ height: "500px" }}>
        <BusinessesMap />
    </section>
    <section id='business-gallery'>
        <div id='business-tiles'>
        {Object.values(businesses).map(business => <BusinessTile business={business} key={business.id}/>)}
        </div>
    </section>
    </div>
  )
};

export default Businesses;
