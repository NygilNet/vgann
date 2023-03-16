
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const REMOVE_REVIEWS = 'reviews/REMOVE_REVIEWS'

// action creators
const loadReviews = payload => ({
    type: LOAD_REVIEWS,
    payload
});


const addReview = payload => ({
    type: ADD_REVIEW,
    payload
});

const removeReviews = () => ({
    type: REMOVE_REVIEWS
  })


// thunk functions
export const getReviews = () => async dispatch => {
    console.log('MADE IT INTO THE THUNK FUNCTION')
    const response = await fetch('/api/reviews');
    if (response.ok) {
        const payload = await response.json();
        console.log('THIS SHOULD BE AN OBJECT OF REVIEWS', payload)
        dispatch(loadReviews(payload))
    }
}

export const postReview = (id, post) => async dispatch => {
    const response = await fetch(`/api/businesses/${id}/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })

    if (response.ok) {
        const data = await response.json()

        dispatch(addReview(data))
        return data;
    }
};

export const clearReviews = () => async dispatch => {
    dispatch(removeReviews())
}

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
        case REMOVE_REVIEWS:
            return {}
        default:
            return state;
    }
}

export default reviewReducer;
