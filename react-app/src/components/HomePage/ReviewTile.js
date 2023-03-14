
import { Link } from 'react-router-dom'
import './ReviewTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';

const ReviewTile = ({ review }) => {

    return (
        <div className='recent-review-tile' key={review.id} to={`businesses/${review.businessId}`}>
            {review.revImgUrl ? <div><img className='recent-review-image' src={review.revImgUrl} alt={review.name}></img></div> : <div></div>}
            <Link className='recent-review-businessName'>{review.businessName}</Link>
            <div className='recent-review-preview-information'>
            <div className="recent-review-stars">
                {Array(parseInt(review.stars)).fill().map((_, index) => (
                    <FontAwesomeIcon key={index} icon={fullStar} />
                ))}
                {Array((5 - parseInt(review.stars))).fill().map((_, index) => (
                    <FontAwesomeIcon key={index} icon={emptyStar} />
                ))}

            </div>
            <div>{review.review}</div>
            <div><Link><FontAwesomeIcon icon={faLightbulb} /></Link></div>
            </div>
        </div>
    )
}

export default ReviewTile
