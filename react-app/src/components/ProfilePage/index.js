import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBusinesses } from '../../store/business';

function UserProfilePage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const currentUser = useSelector(state => state.session.user)

    useEffect (() => {
        dispatch(
            getUserBusinesses(id)
        );
    }, [dispatch, id]);




    return (
        <>
            <h1>hello from user's profile page</h1>
        </>
    )

}

export default UserProfilePage
