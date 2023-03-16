import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useSearchParams } from '../../context/SearchParamsContext';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { isFiltered } from '../../utils/searchAndFilters';

function Navigation({ isLoaded }) {

	const {searchParams, setSearchParams} = useSearchParams();
	const sessionUser = useSelector(state => state.session.user);
	const [searchValue, setSearchValue] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(searchParams.query.categories);
	const [openForm, setOpenForm] = useState(false)
	const history = useHistory()
	const location = useLocation();
	const [isHomePage, setIsHomePage] = useState(false);


	// let location = useLocation()
	let onprofilepage = location.pathname.startsWith('/users')
	// useEffect(() =>{
	// 	 onprofilepage =
	// },[location])

	useEffect(()=>{
		setSelectedCategory(searchParams.query.categories)

		return setSelectedCategory(searchParams.query.categories)
	},[searchParams])

  	const handleSearchChange = (e) => {
  	  setSearchValue(e.target.value);
  	};

  	const handleCategoryChange = (e) => {
  	  setSelectedCategory(e.target.value);
  	  let newContext = {
  	    ...searchParams,
  	    query: {
  	      ...searchParams.query,
  	      categories: e.target.value,
  	    },
  	  };
  	  newContext.filters = isFiltered(newContext);
  	  setSearchParams(newContext);
  	};

  	const searchClicked = (e) => {
  	  let newContext = {
  	    ...searchParams,
  	    search: searchValue,
  	  };
  	  newContext.filters = isFiltered(newContext);
  	  setSearchParams(newContext);
  	  if (location.pathname === '/businesses') {
  	    // filterResults(asdad)
  	  } else {
  	    history.push('/businesses');
  	  }
  	};

	// //  for MANAGAE AND CREATE BUS*INESS
	// const handleCreateAndMAnag = (e) => {
	// 	if (e.target.value === 'new') history.push(`/businesses/${e.target.value}`)
	// 	if (e.target.value === 'manage') history.push(`/users/${sessionUser.id}/businesses`)
	// }


	useEffect(() => {
	  setIsHomePage(location.pathname === '/');
	}, [location]);
	return (
		<div class={`${isHomePage ? 'homePageNav' : 'otherPage'}`}>
			<div id="logo-container">
				<NavLink style={{ marginLeft: '50px' }} exact to="/">
				<img
					src={isHomePage ? "https://i.imgur.com/bL6SK8e.png" : 'https://i.imgur.com/9YEsE9Z.png'}
					alt="logo"
					id="logo-image"
					onClick={() => {
					setSearchParams({
						filters: false,
						search: '',
						query: {
						city: '',
						state: '',
						price: '',
						categories: '',
						features: ''
						}
					})
					}}
				/>
				</NavLink>
			</div>
			{onprofilepage ? (null) : (
				<div className='searchBar'>
					<input
						type='text'
						placeholder='Search'
						value={searchValue}
						onChange={handleSearchChange}
					/>
					<select value={selectedCategory} onChange={handleCategoryChange}>
						<option value=''>All Categories</option>
						<option value='Breakfast'>Breakfast</option>
						<option value='Burger'>Burger</option>
						<option value='Italian'>Italian</option>
						<option value='Thai'>Thai</option>
						<option value='Chinese'>Chinese</option>
						<option value='Pizza'>Pizza</option>
						<option value='French'>French</option>
						<option value='Vietnamese'>Vietnamese</option>
						<option value='Cafe'>Cafe</option>
					</select>
					<button id='search-icon-container' onClick={searchClicked}><FontAwesomeIcon icon={faSearch} id='search-icon' /></button>
				</div>
			 ) }

			{isLoaded && (
				<div className='navStyle'>
					<div>
						{sessionUser && (
							<>
							<NavLink to="/businesses/new">Create Business</NavLink>
							</>
						)}
					</div>

					<div className='navbar-profile'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
