import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBusinesses } from '../../store/business';
import { getuserthunk } from '../../store/userinfo';
function UserProfilePage() {

    const dispatch = useDispatch();
    const {id} = useParams();
    
    const currentUser = useSelector(state => state.session.user)

    useEffect (() => {
        dispatch(
            getUserBusinesses(currentUser.id)
            );
        console.log('from componeneneneentttt',id)
            dispatch(getuserthunk(currentUser.id))
    }, [dispatch, id]);




    return (
        <>
            <h1>hello from user's profile page</h1>
        </>
    )

}

export default UserProfilePage
