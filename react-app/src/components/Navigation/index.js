import React, {useState, useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Image from '../../Logo/image';
import './Navigation.css';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [openForm, setOpenForm] = useState(false)

	//Navbar background color will be transparent on the homepage
	const location = useLocation();
	const [isHomePage, setIsHomePage] = useState(false);

	useEffect(() => {
	  setIsHomePage(location.pathname === '/');
	}, [location]);
	return (

		<div className={`headerStyle ${isHomePage ? 'homePageNav' : ''}`}>
			<div style={{ marginLeft: '50px' }}>
				<NavLink style={{ marginLeft: '50px', }} exact to="/"><Image /></NavLink>
			</div>
			{isLoaded && (
				<div className='navStyle'>
					<div> {sessionUser && <NavLink to={'/spots/new'} style={{ textDecoration: 'none', }} ><h4 style={{ fontStyle: 'italic', marginTop: '5px', marginRight: '10px' }}>Create a New Spot</h4> </NavLink>

					}</div>
					<div className='forProfile'>  <ProfileButton user={sessionUser} /> </div>
				</div>
			)}

		</div>

	);
}

// function Navigation({ isLoaded }){
// 	const sessionUser = useSelector(state => state.session.user);

// 	return (
// 		<ul>
// 			<li>
// 				<NavLink exact to="/">Home</NavLink>
// 			</li>
// 			{isLoaded && (
// 				<li>
// 					<ProfileButton user={sessionUser} />
// 				</li>
// 			)}
// 		</ul>
// 	);
// }

export default Navigation;
