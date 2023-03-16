import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { removebuinessfunc } from '../../store/business';
import { deletereviewthunk } from '../../store/review';

export default function DeleteBusines({reviewid}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const onDelete = () => {
        return dispatch(deletereviewthunk(reviewid))
            .then(closeModal)
        
    }

    return (
        <div className='sonMod'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button style={{ width: '300px' }} className="Red" type="submit" onClick={onDelete} >Yes(Delete Review)</button>
            <button style={{ width: '300px' }} className="Blk" type="submit" onClick={closeModal}>No(Keep Review)</button>
        </div>
    )
}