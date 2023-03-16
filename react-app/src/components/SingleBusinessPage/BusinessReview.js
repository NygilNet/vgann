import { useEffect, useState } from 'react';
import PreviewStars from './PreviewStars';
import './BusinessReview.css'
export default function BusinessReview(prop){
    console.log("review------>",prop)
    const review = prop.review
    const user = review.user

    return (
        <div className='single-review'>
            <div className='user-info-container'>
                <i className={`fa-solid fa-user user-avatar avatar-color${Math.floor(Math.random() * 5) + 1}`}></i>
                <div className="user-info-tags">
                    <h3>{user.username}</h3>
                    <h5>{user.email}</h5>
                    <div className='flex-row-cen'>
                        <i class="fa-solid fa-star small-star"></i><span>{user.numReviews}</span>
                    </div>
                </div>
            </div>
            <div className='starts-container'>
                <PreviewStars avg={review.stars}/>
                <p>{review.updated_at.split(" ").slice(0,3).join(" ")}</p>
            </div>
            <p className='review-content'>{review.review}</p>
        </div>
    )
}
