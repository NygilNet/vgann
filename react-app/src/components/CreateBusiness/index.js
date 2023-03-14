import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { createBusiness } from '../../store/business';

function CreateBusinessForm() {
    let catList = [
        {id:1, category:'Breakfast'},
         {id:2, category:'Burger'},
         { id: 3, category: 'Italian' },
        { id: 4, category: 'Breakfast' },
        { id: 5, category: 'Thai' },
        { id: 6, category: 'Chinese' },
        { id: 7, category: 'Pizza' },
        { id: 8, category: 'French' },
        { id: 9, category: 'Vietnamese' },
        { id: 10, category: 'Cafe' },
        ]


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState('');
    // seperate state for each category

    const [selectedCategory, setSelectedCategory] = useState('');
    let togo=''
    function handleCategoryChange(category) {
        setSelectedCategory(category);
    }

    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        const newBusiness = {
            name,
            description,
            features,
            address,
            city,
            state,
            lng,
            lat,
            price,
            categories
        }

        dispatch(createBusiness(newBusiness)).then(newBiz => history.push(`/businesses/${newBiz.id}`))

    }

    return (
        <>
            <h1>Create a New Business on VGAN</h1>
            <form
                className='create-business-form'
                onSubmit={onSubmit}
            >
                <div>
                    <label>
                        What is the name of your business?
                        <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Describe your business in a few lines.
                        <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Give us a few tags for your business.
                        <textarea
                        type='text'
                        onChange={(e) => setFeatures(e.target.value)}
                        value={features}
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        What street address is your business located at?
                        <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What city?
                        <input
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What state? (i.e. 'XX')
                        <input
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Longitude?
                        <input
                        type='number'
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude?
                        <input
                        type='number'
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What price range is your business?
                        <select
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        >
                            <option key={1}>$</option>
                            <option key={2}>$$</option>
                            <option key={3}>$$$</option>
                            <option key={4}>$$$$</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        What are some miscellaneous categories you want to add to your business?
                        <div>
                            {catList.map(({id,category}) => (
                                <label key={category}>
                                    
                                    <input
                                        type="radio"
                                        name="category"
                                        value={id}
                                        checked={selectedCategory == category}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </label>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    );

}

export default CreateBusinessForm
