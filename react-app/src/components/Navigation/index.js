import React, {useState, useEffect} from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useSearchParams } from '../../context/SearchParamsContext';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { isFiltered } from '../../utils/searchAndFilters';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [searchValue, setSearchValue] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const {searchParams, setSearchParams} = useSearchParams();
	const [openForm, setOpenForm] = useState(false)
	const history = useHistory()
	const location = useLocation();
	const [isHomePage, setIsHomePage] = useState(false);

	const handleSearchChange = (e) => {
		setSearchValue(()=>e.target.value);

	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(()=>e.target.value);
		let newContext = {
			...searchParams,
			query: {
				...searchParams.query,
				categories: e.target.value
			}
		}
		newContext.filters = isFiltered(newContext)
		setSearchParams(()=>newContext)
	};

	const searchClicked = e => {

		let newContext = {
			...searchParams,
			search: searchValue
		}
		newContext.filters = isFiltered(newContext)
		setSearchParams(()=>newContext);
		if(location.pathname === '/businesses'){
			// filterResults(asdad)
		}else{
			return history.push('/businesses')
		}

	}


	//Navbar background color will be transparent on the homepage

	useEffect(() => {
	  setIsHomePage(location.pathname === '/');
	}, [location]);
	return (

		<div className={`${isHomePage ? 'homePageNav' : 'otherPage'}`}>
			<div id='logo-container'>
				<NavLink style={{ marginLeft: '50px', }} exact to="/"><img src={isHomePage ? "https://i.imgur.com/bL6SK8e.png" : 'https://i.imgur.com/9YEsE9Z.png'} alt='logo' id='logo-image' /></NavLink>
			</div>
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
					<option value='Breakfast'>Breakfast</option>
					<option value='Thai'>Thai</option>
					<option value='Chinese'>Chinese</option>
					<option value='Pizza'>Pizza</option>
					<option value='French'>French</option>
					<option value='Vietnamese'>Vietnamese</option>
					<option value='Cafe'>Cafe</option>
				</select>
				<FontAwesomeIcon icon={faSearch} onClick={searchClicked}/>
			</div>
			{isLoaded && (
				<div className='navStyle'>
					<div>
						{sessionUser && (
							<NavLink
								to={'/businesses/new'}
								style={{ textDecoration: 'none', }}
							>
								<h4 style={{ fontStyle: 'italic', marginTop: '5px', marginRight: '10px' }}>
									Yelp for Business
								</h4>
							</NavLink>
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

export default Navigation;
