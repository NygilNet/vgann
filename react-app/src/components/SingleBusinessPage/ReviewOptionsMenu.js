import React, { useState, useEffect, useRef } from 'react';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import './ReviewOptionsMenu.css'
export default function ReviewOptionsMenu(prop){
    // console.log("options button prop---->", prop)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const ulClassName = "drop-menu" + (showMenu ? "" : " hidden");

    useEffect(() => {
        if (!showMenu) return;
        // console.log(ulRef)
        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const openMenu = e =>{
        if (showMenu) return;
        setShowMenu(true);
    }
    const closeMenu = () => setShowMenu(false);

    return(
        <div className="button-container">
            <div className="options-button" onClick={openMenu}>
                <i class="fa-sharp fa-solid fa-bars"></i>
            </div>
            <div ref={ulRef} className={ulClassName} >
                <OpenModalButton
                buttonText="Delete Review"
                onItemClick={closeMenu}
                modalComponent={<DeleteReviewModal review={prop.review}/>}
                />
                <button>Edit Review</button>
            </div>
        </div>
    )
}
