import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readASingleReview } from '../../store/review';
import { getSingleBusiness } from '../../store/business';
import { editReview } from '../../store/review';
import DynamicStars from '../WriteReview/DynamicStars';
import './index.css';

export default function UpdateReviewForm({ oldReview }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const currentreview=useSelector(state => state.reviews)
    // console.log(currentreview)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const [validationErrors, setValidationErrors] = useState({
        stars: '',
        review: ''
    })

    useEffect(() => {
        let tofill = async() =>{
        //   let reviewinfo= await dispatch(readASingleReview(id))
        //   console.log("chgecking review infoooooooooo", reviewinfo)
          setReview(oldReview.review)
          setStars(oldReview.stars)

        }
        tofill()
    }, [dispatch, id])

    const business = useSelector(state => state.business.business);
    const onSubmit= async (e) =>{
        e.preventDefault()
        const toedit ={
            review,
            stars
        }

        const errors = {};

        if (stars <= 0 || stars > 5) errors.stars = 'Reviews must have 1 to 5 stars';
        if (!review.length) errors.review = 'Review is required';

        if (!Object.values(errors).length) {
            const editedreview = await dispatch(editReview(oldReview.id, toedit))

            await dispatch(getSingleBusiness(oldReview.business_id))
        } else {
            setValidationErrors(errors);
        }

    //    history.push(`/businesses/${editedreview.business_id}`)
    }

    return(
        <div className='update-review-form-container'>
            <h1>Update your review for {business.name}</h1>
            <form
                className="update-review-form"
                onSubmit={onSubmit}
            >
                <DynamicStars class="class-dyn" stars={stars} setStars={setStars} />
                <span className='validationErrors'>{validationErrors.stars}</span>
                {/* <div>
                    <div onClick={e => setStars(1)}>{stars >= 1 ? (<i class="fa-solid fa-star" />) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(2)}>{stars >= 2 ? (<i class="fa-solid fa-star" />) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(3)}>{stars >= 3 ? (<i class="fa-solid fa-star" />) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(4)}>{stars >= 4 ? (<i class="fa-solid fa-star" />) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(5)}>{stars >= 5 ? (<i class="fa-solid fa-star" />) : (<i class="fa-regular fa-star" />)}</div>
                </div> */}
                <div>
                    <textarea
                        type='text'
                        id='update-review-text'
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                    ></textarea>
                </div>
                    <span className='validationErrors'>{validationErrors.review}</span>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </div>
    )
}
