import { useEffect, useState } from 'react'
import './PreviewStars.css'

export default function PreviewStars({ avg }) {
    const [starFiller, setStarFiller] = useState({});

    useEffect(() => {
      const rounded = Math.round(avg * 2) / 2; // round avg to nearest half decimal
      const stars = Math.floor(rounded); // whole number of stars
      const halfStar = rounded - stars === 0.5; // check if half star should be shown
      let filler = {}
        for(let i=1;i<=5;i++){
            if(i<=avg){
                filler[i] = `${Math.floor(avg)}`
            }else{
                filler[i] = ""
            }
        }
        setStarFiller(filler)
        },[])
    // const colorFiller = {
    //     1: 'stars1',
    //     2: 'stars2',
    //     3: 'stars3',
    //     4: 'stars4',
    //     5: 'stars5'
    // }

    return (
        <>
        <div id='stars-container'>
        <i
            id={1}
            className={starsObj[1]+' padd-right-5px'}
            onMouseOver={handleHover}
            onMouseOut={resetStars}
            onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
            id={2}
            className={starsObj[2]+' padd-right-5px'}
            onMouseOver={handleHover}
            onMouseOut={resetStars}
            onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
            id={3}
            className={starsObj[3]+' padd-right-5px'}
            onMouseOver={handleHover}
            onMouseOut={resetStars}
            onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
            id={4}
            className={starsObj[4]+' padd-right-5px'}
            onMouseOver={handleHover}
            onMouseOut={resetStars}
            onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <i
            id={5}
            className={starsObj[5]+' padd-right-5px'}
            onMouseOver={handleHover}
            onMouseOut={resetStars}
            onClick={e=>setStarsPicked(e.target.id)}
        ></i>
        <p>Stars</p>
        </div>
        <button
        disabled={enableSubmit}
        onClick={handleSubmit}
        id='submit-review-button'>
            Submit Your Review
        </button>
        </>
    );
  }
