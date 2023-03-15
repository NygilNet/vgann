import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useSearchParams} from "../../context/SearchParamsContext"
import { isFiltered } from '../../utils/searchAndFilters';
import './index.css'

export default function FilterSearch(){
    const {searchParams, setSearchParams} = useSearchParams()
    const businesses = useSelector(state => state.business.all_businesses);
    const [priceFilter,setPriceFilter] = useState({1:false,2:false,3:false,4:false})
    const [features,setFeatures] = useState([])
    const [featuresObj,setFeaturesObj] = useState({})
    const [cities,setCities] = useState([])
    const [cisitesObj,setCitiesObj] = useState({})

    const handlePriceChange = (e) =>{
        console.log(e.target.value)
        let newPriceObj = {
            ...priceFilter,
            [e.target.value]: !priceFilter[e.target.value]
        }
        console.log(newPriceObj)
        setPriceFilter(newPriceObj)
    }

    useEffect(()=>{
        let priceString = ""
        for(let i=1;i<5;i++){
            if(priceFilter[i]) priceString+=`${i},`
        }
        let newContext = {
			...searchParams,
			query: {
				...searchParams.query,
				price: priceString.slice(0,priceString.length-1)
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
    },[priceFilter])

    useEffect(()=>{
        // console.log("^^^^^^^----",searchParams)
        if(businesses){
            setFeatures(()=>Object.values(businesses).map(el=>el.features).filter(el=>el).join(',').split(','))
            let newFeaturesObj = {}
            Object.values(businesses).map(el=>el.features).filter(el=>el).join(',').split(',').forEach(el=>{
                newFeaturesObj[el] = false;
            })
            setFeaturesObj(newFeaturesObj)

        }
    },[businesses])

    useEffect(()=>{
        console.log("features=====>",featuresObj)
        let featuresQuery = []
        Object.entries(featuresObj).forEach(el=>{
            if(el[1]) featuresQuery.push(el[0])
        })
        console.log(featuresQuery)
        console.log(featuresQuery.join(','))
        let newContext = {
			...searchParams,
			query: {
				...searchParams.query,
				features: featuresQuery.join(',')
			}
		}
        newContext.filters = isFiltered(newContext)
        console.log(newContext)
        setSearchParams(()=>newContext)
    },[featuresObj])

    const handleFeatureChange = (e) =>{
        console.log(e.target.value)
        let newfeatObj = {
            ...featuresObj,
            [e.target.value]: !featuresObj[e.target.value]
        }
        setFeaturesObj(newfeatObj)
    }

    return (
        <div className='filters-menu'>
            <div class="price-button-group">
                <label class="checkbox-label">
                  <input type="checkbox" value="1" onChange={handlePriceChange} />
                  <span class="label-text">$</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" value="2" onChange={handlePriceChange} />
                  <span class="label-text">$$</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" value="3" onChange={handlePriceChange} />
                  <span class="label-text">$$$</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" value="4" onChange={handlePriceChange} />
                  <span class="label-text">$$$$</span>
                </label>
            </div>
            <div class='features-button-group'>
                {features && features.map(el=>(
                    <label>
                        <input type="checkbox" value={el} onChange={handleFeatureChange} />
                        <span class="">{el}</span>
                    </label>
                ))}
            </div>
            {/* <div class='city-button-group'>
                {features && features.map(el=>(
                    <label>
                        <input type="checkbox" value={el} onChange={handleFeatureChange} />
                        <span class="">{el}</span>
                    </label>
                ))}
            </div> */}
        </div>
    )
}
