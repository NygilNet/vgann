import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateBusiness(){
    const {id} =useParams()
    

    return(
        <h1>hello from update</h1>
    )

}