import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createBusiness } from '../../store/business';
import './index.css'


export default function CreateBusinessForm () {
    const ownerId= useSelector((state) => state.session.user.id)
    let catList = [
        { id: 1, category:'Home Repair'},
        { id: 2, category:'Phone Repair'},
        { id: 3, category: 'Cleaning' },
        { id: 4, category: 'Handyman' },
        { id: 5, category: 'Tv Mounting' },
        ]

    let startedObj = {}
    for(let cat in catList){
        startedObj[cat.id] = false
    }

    let feautureList = [
        { id: 1, feature: 'Outdoor seating' },
        { id: 2, feature: 'Delivery' },
        { id: 3, feature: 'Open All Day' },
        { id: 4, feature: 'Takeout' },
        { id: 5, feature: '21+' },
        { id: 6, feature: 'Live Music' },
        { id: 7, feature: 'Vegan Friendly' },
        { id: 8, feature: 'Vegeterian Friendly' },
        { id: 9, feature: 'Pet Friendly' },
        { id: 10, feature: 'Family Owned' },
    ]

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
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

    // const [selectedCategory, setSelectedCategory] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9:false, 10:false});
    const [selectedCategory, setSelectedCategory] = useState(startedObj);
    const [selectedFeature, setSelectedFeature] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false });

    function handleCategoryChange(e) {
        let categoryObj = {
            ...selectedCategory,
            [e.target.value]: !selectedCategory[e.target.value]
        }

        setSelectedCategory(categoryObj)
    }

    useEffect(()=>{
        let togo=[]
        for (let i = 1; i <11; i++) {
            if (selectedCategory[i]) {
                togo.push(i)
            }
        }
        setCategories(togo.join())
    },[selectedCategory])

    function handleFeatureChange(e) {
        let featureObj = {
            ...selectedFeature,
            [e.target.value]: !selectedFeature[e.target.value]
        }
        setSelectedFeature(featureObj)
    }

    useEffect(()=>{
        let togofeature = []
        for (let i = 1; i < 11; i++) {
            if (selectedFeature[i]) {
                let some= feautureList.find(obj => obj.id==i)

               togofeature.push(some.feature)
            }
            setFeatures(togofeature.join())
        }
    },[selectedFeature])

    const history = useHistory();
    const dispatch = useDispatch();

    // const preSub = e =>{
    //     if(features.length>0){
    //         let featuresArray = features.split(",")
    //         featuresArray = featuresArray.map(el=>el.trim())
    //         setFeatures(()=> featuresArray.join())
    //     }
    //     onSubmit()
    // }
    const onSubmit = async (e) => {
        e.preventDefault();

        const newBusiness = {
            name,
            description,
            features,
            address,
            city,
            state,
            lng: +lng,
            lat: +lat,
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
        if (newBusiness.lng < -180 ) errors.lng = 'Longitude must be between -180 and 180';
        if (newBusiness.lng > 180) errors.lng = 'Longitude must be beetween -180 and 180';
        if (!newBusiness.lat) errors.lat = 'Latitude is required';
        if (newBusiness.lat < -90) errors.lat = 'Lattitude must be between -90 and 90';
        if (newBusiness.lat > 90) errors.lat = 'Lattitude must be beetween -90 and 90';
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
                <div id="create-business-h1-container"><h1>Create a New Service on Tuls</h1></div>
                <div>
                    <label>
                        What is the name of your service? <span className='validationErrors'>{validationErrors.name}</span>
                        <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Describe your service in a few lines. <span className='validationErrors'>{validationErrors.description}</span>
                        <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        ></textarea>
                    </label>
                </div>
            
           
         
               
         
                <div>
                    <label>
                        What is the price of your service? <span className='validationErrors'>{validationErrors.name}</span>
                        <input
                            type='number'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What type of service do you want to add ? <div className='validationErrors'>{validationErrors.categories}</div>
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
               
                
                <div id="create-business-submit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );

}
