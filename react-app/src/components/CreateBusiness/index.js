import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../store/business';
import './index.css'

export default function CreateBusinessForm () {
    const ownerId= useSelector((state) => state.session.user.id)
    let catList = [
        { id: 1, category:'Breakfast'},
        { id: 2, category:'Burger'},
        { id: 3, category: 'Italian' },
        { id: 4, category: 'Thai' },
        { id: 5, category: 'Chinese' },
        { id: 6, category: 'Pizza' },
        { id: 7, category: 'French' },
        { id: 8, category: 'Vietnamese' },
        { id: 9, category: 'Cafe' },
        ]


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [price, setPrice] = useState(1);
    const [categories, setCategories] = useState('');
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [image5, setImage5] = useState('')
    const [image6, setImage6] = useState('')
    // seperate state for each category


    //Validation Errors set state
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        description: '',
        features: '',
        address: '',
        city: '',
        state: '',
        lng: '',
        lat: '',
        price: '',
        categories: '',
        imageType: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
    })

    const [selectedCategory, setSelectedCategory] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9:false});
    function handleCategoryChange(e) {
        let categoryObj = {
            ...selectedCategory,
            [e.target.value]: !selectedCategory[e.target.value]
        }

        setSelectedCategory(categoryObj)
        let togo=[]
        for (let i = 1; i <11; i++) {
            if (selectedCategory[i]) {
                togo.push(i)
            }

            setCategories(togo.join())
      }
    }

    const history = useHistory();
    const dispatch = useDispatch();


    const onSubmit = async (e) => {
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
            image1,
            image2,
            image3,
            image4,
            image5,
            image6
        }


        //Validates the form fields
        const errors = {}
        if (!newBusiness.name.length) errors.name = 'Name is required';
        if (newBusiness.description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!newBusiness.features.length) errors.features = 'Tag(s) is required';
        if (!newBusiness.address.length) errors.address = 'Address is required';
        if (!newBusiness.city.toString().length) errors.city = 'City is required';
        if (!newBusiness.state.toString().length) errors.state = 'State is required';
        if (!newBusiness.lng) errors.lng = 'Longitude is required';
        if (!newBusiness.lat) errors.lat = 'Latitude is required';
        if (!newBusiness.categories.length) errors.categories = 'Pick at least one category';
        if (!newBusiness.price) errors.price = 'Price is required';

        //Validates the images
        if (!newBusiness.image1.length) errors.image1 = 'Preview image is required';
        for (let i = 2; i <= 6; i++) {
            const imageField = newBusiness[`image${i}`];
            if (imageField.length && !/\.(png|jpe?g)$/.test(imageField)) {
              errors[`image${i}`] = 'Image URL must end in .png, .jpg, or .jpeg';
            }
        }

        if (!Object.values(errors).length) {
            let newBiz = await dispatch(createBusiness(newBusiness));

            if (newBiz) {
                history.push(`/businesses/${newBiz.id}`)
            }

        } else {
            setValidationErrors(errors)
        }

    }

    return (
        <>
            <form
                className='create-business-form'
                onSubmit={onSubmit}
                >
                <div id="create-business-h1-container"><h1>Create a New Business on VGAN</h1></div>
                <div>
                    <label>
                        What is the name of your business? <span className='validationErrors'>{validationErrors.name}</span>
                        <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Describe your business in a few lines. <span className='validationErrors'>{validationErrors.description}</span>
                        <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        Give us a few tags for your business. (i.e. Open All Day,Delivery,...) <span className='validationErrors'>{validationErrors.features}</span>
                        <textarea
                        type='text'
                        onChange={(e) => setFeatures(e.target.value)}
                        value={features}
                        ></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        What street address is your business located at? <span className='validationErrors'>{validationErrors.address}</span>
                        <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What city? <span className='validationErrors'>{validationErrors.city}</span>
                        <input
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What state? <span className='validationErrors'>{validationErrors.state}</span>
                        <input
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Longitude? <span className='validationErrors'>{validationErrors.lng}</span>
                        <input
                        type='number'
                        onChange={(e) => setLng(+e.target.value)}
                        value={lng}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude? <span className='validationErrors'>{validationErrors.lat}</span>
                        <input
                        type='number'
                        onChange={(e) => setLat(+e.target.value)}
                        value={lat}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What price category does your business belong to? <span className='validationErrors'>{validationErrors.price}</span>
                        <select
                        onChange={(e) => setPrice(+e.target.value)}
                        value={price}
                        >
                            <option value={1}>$</option>
                            <option value={2}>$$</option>
                            <option value={3}>$$$</option>
                            <option value={4}>$$$$</option>
                        </select>

                    </label>
                </div>
                <div>
                    <label>
                        What are some miscellaneous categories you want to add to your business? <div className='validationErrors'>{validationErrors.categories}</div>
                        <div id='create-business-categories'>
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
                        <h3>Liven up your business with photos</h3>
                        <p>
                            Competitive pricing can help your listing stand out and rank
                            higher in search results.
                        </p>
                        <div className='validationErrors'>{validationErrors.image1}</div>
                        <div className='validationErrors'>{validationErrors.imageType}</div>
                        <input
                            type="text"
                            name="image1"
                            value={image1}
                            placeholder="Preview Image URL"
                            onChange={(e) =>setImage1(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image2}</div>
                        <input
                            type="text"
                            name="image2"
                            value={image2}
                            placeholder="Image 1"
                            onChange={(e) =>setImage2(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image3}</div>
                        <input
                            type="text"
                            name="image3"
                            value={image3}
                            placeholder="Image 2"
                            onChange={(e) =>setImage3(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image4}</div>
                        <input
                            type="text"
                            name="image4"
                            value={image4}
                            placeholder="Image 3"
                            onChange={(e) =>setImage4(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image5}</div>
                        <input
                            type="text"
                            name="image5"
                            value={image5}
                            placeholder="Image 4"
                            onChange={(e) =>setImage5(e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='validationErrors'>{validationErrors.image6}</div>
                        <input
                            type="text"
                            name="image6"
                            value={image6}
                            placeholder="Image 5"
                            onChange={(e) =>setImage6(e.target.value)}
                        />
                    </label>
                </div>
                <div id="create-business-submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );

}
