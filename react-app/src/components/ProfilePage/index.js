import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function UserProfilePage() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const currentUser = useSelector(state => state.session.user)




    return (
        <>
            <h1>hello from user's profile page</h1>
        </>
    )

}

export default UserProfilePage
