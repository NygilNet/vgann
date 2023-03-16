import React, { useState, useEffect } from 'react';
import './ReviewOptionsMenu.css'
export default function ReviewOptionsMenu(prop){
    const [clickedTarget, setClickedTarget] = useState('');
    const [hidden,setHidden] = useState(true)

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
        document.removeEventListener('mousedown', handleClick);
        }
    }, [])

    const handleClick = (e) => {
        e.stopPropagation()
        // console.log("menuClick",e.target.getAttribute('name'))
        let clicked = e.target.getAttribute('name')
        if(clicked==='mb'){
            if(!hidden) setHidden(true)
            else setHidden(false)
        }else if (clicked==='rrb'){
            console.log("Edit review clicked")
        }
        else setHidden(()=>true)
        setClickedTarget(e.target.textContent);
    }

    useEffect(()=>{
    },[clickedTarget])
    return(
        <div className="button-container">
            <div name="mb" className="options-button">
            {/* <i class="fa-sharp fa-solid fa-bars"></i> */}
                <i name="mb" class="fa-sharp fa-solid fa-bars"></i>
            </div>
            <div name="mb" className={`drop-menu ${hidden?'hidden':''}`} >
                <p class="drop-menu-item" onClick={()=>console.log("Edit review clicked")} name="rrb">Edit Review</p>
                <p class="drop-menu-item" onClick={()=>console.log("Edit review clicked")} name="rrb">Delete Review</p>
            </div>
        </div>
    )
}
