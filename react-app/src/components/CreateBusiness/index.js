import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { createBusiness } from '../../store/business';

export default function CreateBusinessForm () {
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
    const [image, setImage] = useState('')
    // seperate state for each category

    const [selectedCategory, setSelectedCategory] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9:false
    , 10:false });
    function handleCategoryChange(e) {  
        let categoryObj = {
            ...selectedCategory,
            [e.target.value]: !selectedCategory[e.target.value]
        }

        setSelectedCategory(categoryObj)
        let togo=''
        for (let i = 1; i <11; i++) {
            if (selectedCategory[i]) {
                togo += `${i},`
                console.log(togo)
            } 
        setCategories(togo)
        
      }
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
            categories,
            image


        }

        // dispatch(createBusiness(newBusiness)).then(newBiz => history.push(`/businesses/${newBiz.id}`))
        dispatch(createBusiness(newBusiness)).then(console.log('succesfully cretaed'))

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
                                <>
                                <label key={category}>
                                    
                                    <input
                                        type="checkbox"
                                        name="category"
                                        value={id}
                                        onChange={handleCategoryChange}
                                    />
                                    {category}
                                </label>
                                   
                                </>
                            ))}
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        <h3>Liven up your spot with photos</h3>
                        <p>
                            Competitive pricing can help your listing stand out and rank
                            higher in search results.
                        </p>
                        <input
                            type="text"
                            name="previewPhoto"
                            required
                            value={image}
                            placeholder="Preview Image URL"
                            onChange={(e) =>setImage(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    );
    
}
















