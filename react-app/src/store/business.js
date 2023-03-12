

const LOAD_BUSINESSES = 'spots/LOAD_BUSINESSES'

// action creators
const loadBusinesses = payload => ({
  type: LOAD_BUSINESSES,
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

const initialState = {
  businesses: {}
};


const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUSINESSES:
      const businesses = {};
      action.payload.businesses.forEach(business => (businesses[business.id] = business));
      return {
        ...state,
        businesses
      }
    default:
      return state;
  }
}

export default businessesReducer;
