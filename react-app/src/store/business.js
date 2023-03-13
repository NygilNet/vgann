

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
  all_businesses: {}
};


const businessesReducer = (state = initialState, action) => {
  switch (action.type) {
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
