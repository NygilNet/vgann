import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readASingleReview } from '../../store/review';


function UpdateReviewForm({ businessId }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    useEffect(() => {
        dispatch(readASingleReview(businessId))
    }, [dispatch, businessId])

    const business = useSelector(state => state.business.business);
    const { id } = useParams;


}
