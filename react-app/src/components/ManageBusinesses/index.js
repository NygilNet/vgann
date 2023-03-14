import { useEffect, useState } from 'react';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getUserBusinesses } from '../../store/business';
import { NavLink, Route, useParams } from 'react-router-dom';

export default function ManageBusinesses(){
    const dispatch = useDispatch()
    const {userId} = useParams()
    const businesses = useSelector((state) => Object.values(state.business.all_businesses))
    useEffect(() => {
        dispatch(getUserBusinesses(userId))
    },[dispatch, userId])
    if (!businesses){
        return 
    }
    return(
        <>
        {!businesses ? (<h1>No Businesses to Display </h1>) : (
                <div className='forfirst'>
                    {businesses.map((business) => {
                        return (
                            <nav key={business.id} className='forNewDiv'>
                                <div className='forNav' >
                                    <div >
                                        <div className='spotClass' >
                                            {console.log(business.previewimage.url)}
                                            <img src={business.previewimage.url} className='forImage'></img>
                                            
                                        </div>
                                        <div className='forInside'>
                                            <div>{business.city}, {business.state}</div>
                                            <div>{business.avgRating ? `⭐️ ${parseFloat(business.avgRating).toFixed(1)}` : '⭐️ New'}</div>
                                        </div>
                                        <div className='forInside'>
                                            <div>{business.price}</div>
                                            <NavLink to={`/businesses/${business.id}/edit`}><button >Update</button></NavLink>
                                            {/* <div><OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spotId={spot.id} />} /></div> */}
                                            <div><button>Delete</button></div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        )
                    })}
                </div> 
        )}
        </>
        
    )
}