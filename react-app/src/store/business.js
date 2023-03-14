

const LOAD_BUSINESSES = 'spots/LOAD_BUSINESSES'
const ADD_BUSINESS = 'spots/ADD_BUSINESS'

// action creators
const loadBusinesses = payload => ({
  type: LOAD_BUSINESSES,
  payload
});


const addBusiness = payload => ({
  type: ADD_BUSINESS,
  payload
});

//thunk functions
export const getBusinesses = () => async dispatch => {
  const response = await fetch('/api/businesses');
  if (response.ok) {
    const payload = await response.json();
    dispatch(loadBusinesses(payload));
  }
};


export const createBusiness = (business) => async dispatch => {
  const { name, description, features, address, city, state, lng, lat, price, categories } = business
  const response = await fetch('/api/businesses', {
    method: 'POST',
    body: JSON.stringify({
      name,
      description,
      features,
      address,
      city,
      state,
      lng,
      lat,
      price,
      categories
    })
  })

  if (response.ok) {
    const data = await response.json()

    dispatch(addBusiness(data))
    return data;
  }


};


const initialState = {
  all_businesses: {},
  business: {}
};


const businessesReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case ADD_BUSINESS:
      newState.all_businesses[action.payload.id] = action.payload;
      return newState;
    case LOAD_BUSINESSES:
      const all_businesses = {};
      action.payload.businesses.forEach(business => (all_businesses[business.id] = business));
      return {
        ...state,
        all_businesses
      }
    default:
      return state;
  }
}

export default businessesReducer;
