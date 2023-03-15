import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/review";
import { getSingleBusiness } from "../../store/business";


function WriteReviewForm() {

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);
    const business = useSelector(state => state.business.business);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSingleBusiness(id))
    }, [dispatch, id])

    const onSubmit = async e => {
        e.preventDefault();

        const newReview = {
            stars,
            review
        }

        await dispatch(postReview(id, newReview));

        return history.push(`/businesses/${id}`)
    };

    if (!Object.values(business)[0]) return null;

    return (
        <>
            <h1>Write a review for {business.name}</h1>
            <form
            className="write-review-form"
            onSubmit={onSubmit}
            >
                <div>
                    <div onClick={e => setStars(1)}>{stars >= 1 ? (<i class="fa-solid fa-star"/>) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(2)}>{stars >= 2 ? (<i class="fa-solid fa-star"/>) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(3)}>{stars >= 3 ? (<i class="fa-solid fa-star"/>) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(4)}>{stars >= 4 ? (<i class="fa-solid fa-star"/>) : (<i class="fa-regular fa-star" />)}</div>
                    <div onClick={e => setStars(5)}>{stars >= 5 ? (<i class="fa-solid fa-star"/>) : (<i class="fa-regular fa-star" />)}</div>
                </div>
                <div>
                    <textarea
                    type='text'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                    ></textarea>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    )

}

export default WriteReviewForm
