

const LOAD_RECENT_ACTIVITY = 'recentActivity/LOAD_RECENT_ACTIVITY'

// action creators
const loadRecentActivity = payload => ({
  type: LOAD_RECENT_ACTIVITY,
  payload
});

//thunk functions
export const getRecentActivity = () => async dispatch => {
  const response = await fetch('/api/activity/recent');
  if (response.ok) {
    const payload = await response.json();
    dispatch(loadRecentActivity(payload));
  }
};

const initialState = [];

const recentActivityReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_RECENT_ACTIVITY:
        return [...state, ...action.payload];
      default:
        return state;
    }
  };

export default recentActivityReducer;
