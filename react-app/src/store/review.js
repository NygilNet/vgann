
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'

// action creators
const loadReviews = payload => ({
    type: LOAD_REVIEWS,
    payload
});


const addReview = payload => ({
    type: ADD_REVIEW,
    payload
});


// thunk functions
export const getReviews = () => async dispatch => {
    const response = await fetch('/api/reviews');
    if (response.ok) {
        const payload = await response.json();
        dispatch(loadReviews(payload))
    }
}

export const postReview = (post) => async dispatch => {
    const { user_id, business_id, stars, review } = post;
    const response = await fetch(`api/businesses/${business_id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            user_id,
            business_id,
            stars,
            review
        })
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(addReview(data))
        return data;
    }
};

const initialState = {}


const reviewReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case LOAD_REVIEWS:
            const reviews = action.payload
            return {...state, reviews }
        case ADD_REVIEW:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
