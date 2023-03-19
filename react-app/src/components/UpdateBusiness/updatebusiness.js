import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getBusinesses, updateBusiness } from '../../store/business';
import { getSingleBusiness } from '../../store/business';

export default function UpdateBusiness(){
    const {id} =useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const ownerId = useSelector((state) => state.session.user.id);
    // const business = useSelector((state) => state.business.business);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [price, setPrice] = useState(1);

    // talk about functionality of categories and image with group
    // const [categories, setCategories] = useState(business.categories);
    // const [image, setImage] = useState(business.image)

        useEffect(() => {
            let someState = async () => {
                let business = await dispatch(getSingleBusiness(id))

                setName(business.name)
                setDescription(business.description)
                setFeatures(business.features)
                setAddress(business.address)
                setCity(business.city)
                setState(business.state)
                setLat(business.lat)
                setLng(business.lng)
                setPrice(business.price)
            }
            someState()

        }, [dispatch, id])



    const onSubmit = async e => {
        e.preventDefault();

        const updatedBusiness = {
            name,
            description,
            features,
            address,
            city,
            state,
            lat,
            lng,
            price
        }

        const updatedBiz = await dispatch(updateBusiness(id, updatedBusiness))
        await dispatch(getBusinesses())
        return history.push(`/businesses/${updatedBiz.id}`)

    }


    return (
        <>
            <h1>Update {} </h1>
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
                        Give us a few tags for your business. (i.e. Open All Day,Delivery,...)
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
                        onChange={(e) => setLng(+e.target.value)}
                        value={lng}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Latitude?
                        <input
                        type='number'
                        onChange={(e) => setLat(+e.target.value)}
                        value={lat}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        What price range is your business?
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
                {/* <div>
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
                </div> */}
                <div>
                    <input type="submit" />
                </div>
            </form>
        </>
    );


}
