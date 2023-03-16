import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getSingleBusiness } from '../../store/business';
import { deletereviewthunk } from '../../store/review';

export default function DeleteReviewModal(id){
    const {closeModal} = useModal()
    // console.log("the id -----> ", id.review.id)
    const dispatch = useDispatch()
    const deleteReview = async e =>{
        // console.log("You chose delete!")
        await dispatch(deletereviewthunk(id.review.id))
        await dispatch(getSingleBusiness(id.review.business_id))
        closeModal()
    }

    return (
        <div className="delete-review-modal">
            {/* <h1>{id}</h1> */}
            <h2>Are you sure you want to delete this review?</h2>
            <div className="delete-keep">
                <button onClick={deleteReview}>Delete</button>
                <button onClick={closeModal}>Keep Review</button>
            </div>
        </div>
    )
}
