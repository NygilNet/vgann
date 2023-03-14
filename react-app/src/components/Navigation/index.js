import React, {useState, useEffect} from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useSearchParams } from '../../context/SearchParamsContext';
import Image from '../../Logo/image';
import './Navigation.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [searchValue, setSearchValue] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const {searchParams, setSearchParams} = useSearchParams()
	const [createbusines, setcreatebusiness] = useState('')
	const history = useHistory()
	console.log("GAGAGAGAG", searchParams)
	
	const handleSearchChange = (e) => {

		setSearchValue(e.target.value)
		let newContext = {
			...searchParams,
			search: e.target.value
		}
		setSearchParams(newContext)
		console.log(searchParams)
	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
		// console.log(selectedCategory)
		let newContext = {
			...searchParams,
			query: {
				...searchParams.query,
				categories: e.target.value
			}
		}
		setSearchParams(newContext)
		console.log(searchParams)
	};
	const handleCreateAndMAnag = (e) =>{
		if (e.target.value==='new') history.push(`/businesses/${e.target.value}`)
		if (e.target.value === 'manage') history.push(`/users/${sessionUser.id}/businesses`)
	}

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
			<div className='searchBar'>
				<input
					type='text'
					placeholder='Search'
					value={searchValue}
					onChange={handleSearchChange}
				/>
				<FontAwesomeIcon icon={faSearch} />
				<select value={selectedCategory} onChange={handleCategoryChange}>
					<option value=''>All Categories</option>
					<option value='Breakfast'>Breakfast</option>
					<option value='Burger'>Burger</option>
					<option value='Italian'>Italian</option>
					<option value='Breakfast'>Breakfast</option>
					<option value='Thai'>Thai</option>
					<option value='Chinese'>Chinese</option>
					<option value='Pizza'>Pizza</option>
					<option value='French'>French</option>
					<option value='Vietnamese'>Vietnamese</option>
					<option value='Cafe'>Cafe</option>
					{/* Add more categories here */}
				</select>
			</div>
			{isLoaded && (
				<div className='navStyle'>
					<div>
						{sessionUser && (
							<>
							<select value={selectedCategory} onChange={handleCreateAndMAnag}>
							<option value=''>Yelp For Business</option>
							<option value='new'>Create Business</option>
							<option value='manage'>Manage Your Business</option>
							</select>
							</>
						)}
					</div>

					<div className='forProfile'>
						<ProfileButton user={sessionUser} />
					</div>
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
// <NavLink to={'/businesses/new'} style={{textDecoration:'none'}} >Create New Business</NavLink>
