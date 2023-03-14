

const LOAD_BUSINESSES = 'spots/LOAD_BUSINESSES'
const ADD_BUSINESS = 'spots/ADD_BUSINESS'
const LOAD_CURRENT_USER_BUSINESSES = 'spots/LOAD_CURRENT_USER_BUSINESSES'
const Load_Single_Businness_Details = 'spots/Load_Single_Businness_Details'
const LOAD_FILTERED = 'spots/LOAD_FILTERED'

// action creators
const loadBusinesses = payload => ({
  type: LOAD_BUSINESSES,
  payload
});


const addBusiness = payload => ({
  type: ADD_BUSINESS,
  payload
});


const loadUserBusinesses = payload => ({
  type: LOAD_CURRENT_USER_BUSINESSES,
  payload
});

const loadSingleBusiness = payload =>({
  type:Load_Single_Businness_Details,
  payload
})


export const loadFiltered = payload =>({
  type: LOAD_FILTERED,
  payload
})

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


export const getUserBusinesses = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/current`)

  if (response.ok) {
    const data = await response.json();
    dispatch(loadUserBusinesses(data))
    return data
  }
}


export const getSingleBusiness = (id) => async dispatch =>{
  const response = await fetch(`/api/businesses/${id}`)
  if (response.ok){
    const data = await response.json()
    dispatch(loadSingleBusiness(data))
    return data
  }
}

const initialState = {
  all_businesses: {},
  business: {},
  filtered_businesses: {}
};


const businessesReducer = (state = initialState, action) => {
  let newState = {...state}
  const all_businesses = {};
  switch (action.type) {
    case Load_Single_Businness_Details:
      newState.business=action.payload
      return newState  

    case LOAD_CURRENT_USER_BUSINESSES:
      action.payload.forEach(business => (all_businesses[business.id] = business));
      
      return {
        ...state,
        all_businesses
      }
      
    case ADD_BUSINESS:
      newState.all_businesses[action.payload.id] = action.payload;
      return newState;
    case LOAD_BUSINESSES:
      
      action.payload.businesses.forEach(business => (all_businesses[business.id] = business));
      return {
        ...state,
        all_businesses,
        filtered_businesses: all_businesses
      }
    case LOAD_FILTERED:
      const filtered_businesses = {}
      action.payload.forEach(biz=> filtered_businesses[biz.id] = biz)
      return {
        ...state,
        filtered_businesses
      }
    default:
      return state;
  }
}

export default businessesReducer;
