import './ProfileIcon.css'
import PreviewStars from './PreviewStars';

export default function ProfileIcon({business, src}) {

    return (
        <div id='single-business-top-header'>
            <div id='single-business-top-header-child'>
                <div class="profile-icon-container">
                <div class="profile-icon-image">
                    <img src={src} alt="Profile icon" />
                </div>
                </div>
                <div class="business-info-container">
                <div class="business-name-profile">{business.name}</div>
                <div class="business-stars-container">
                    <div class="business-stars">
                        <PreviewStars avg={business.avgRating} />
                    </div>
                    <div class="business-reviews">{business.numReviews} reviews</div>
                </div>
                <div class="business-categories">
                    {business.categories.map((category, index) => {
                    return (
                        <span key={category.index}>
                        {category.categoryName}
                        {index !== business.categories.length - 1 ? ", " : ""}
                        </span>
                    )
                    })}
                </div>
                </div>
            </div>
        </div>
    );
  }
