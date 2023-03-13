import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateBusinessForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lng, setLng] = useState('');
    const [lat, setLat] = useState('');
    const [categories, setCategories] = useState('');

    let history = useHistory();

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
            categories
        }

    }

    return (
        <>
            <h1>Hello from the create business form</h1>
            <form
                className='create-business-form'
                onSubmit={onSubmit}
            >
                <label>
                    What is the name of your business?
                    <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
                </label>
                <label>
                    Describe your business in a few lines.
                    <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    ></textarea>
                </label>
                <label>
                    Give us a few tags for your business.
                    <textarea
                    type='text'
                    onChange={(e) => setFeatures(e.target.value)}
                    value={features}
                    ></textarea>
                </label>
                <label>
                    What street address is your business located at?
                    <input
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    />
                </label>
                <label>
                    What city?
                    <input
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    />
                </label>
                <label>
                    What state? (i.e. 'XX')
                    <input
                    type='text'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    />
                </label>
                <label>
                    Longitude?
                    <input
                    type='number'
                    onChange={(e) => setLng(e.target.value)}
                    value={lng}
                    />
                </label>
                <label>
                    Latitude?
                    <input
                    type='number'
                    onChange={(e) => setLat(e.target.value)}
                    value={lat}
                    />
                </label>
                <label>
                    What are some miscellaneous categories you want to add to your business?
                    <input
                    type='text'
                    onChange={(e) => setCategories(e.target.value)}
                    value={categories}
                    />
                </label>
            </form>
        </>
    );

}
