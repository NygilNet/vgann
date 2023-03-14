import { Link } from 'react-router-dom'
import './BusinessTile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const BusinessTile = ({ business: { id, username, revImgUrl, name, businessId, businessName, stars, review } }) => {

  return (
    <div className="business-tile" id={`business-${id}`}>
      <div className="business-info">
        <FontAwesomeIcon className="business-icon" icon={faUser} /><span className="business-username"><div>{username}</div><div className="business-action">Owns a business</div></span>
      </div>
      {revImgUrl ? (
        <div className="business-image">
          <img className="recent-business-image" src={revImgUrl} alt={name} />
        </div>
      ) : (
        <div className="business-image"></div>
      )}
      <Link className="business-name" to={`/businesses/${businessId}`}>{businessName}</Link>
      <div className="business-stars">
        {Array.from({ length: 5 }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < stars ? fullStar : emptyStar}
          />
        ))}
      </div>
      <div className="business-content">{review}</div>
      <div><Link to={`/businesses/${businessId}`} className="business-keep-reading">Conitinue reading...</Link></div>
      <div className='business-border-container'><div className='business-border'></div></div>
      <div className="business-actions">
        <Link className="action-link"><FontAwesomeIcon icon={faLightbulb} className="action-link-icons" /></Link>
        <Link className="action-link"><FontAwesomeIcon icon={faFaceSmile} className="action-link-icons" /></Link>
        <Link className="action-link"><FontAwesomeIcon icon={faHeart} className="action-link-icons" /></Link>
      </div>
    </div>
  );
}

export default BusinessTile;
