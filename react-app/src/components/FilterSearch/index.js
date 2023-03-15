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
    const [citiesObj,setCitiesObj] = useState({})
    const [categories,setCategories] = useState([])
    const [catObj,setCatObj] = useState({})
    const [tester,setTester] = useState([])


    //Setup arrays for filters
    useEffect(()=>{
        if(businesses){
            setFeatures(()=>[...new Set(Object.values(businesses).map(el=>el.features).filter(el=>el).join(',').split(','))])
            let newFeaturesObj = {}
            Object.values(businesses).map(el=>el.features).filter(el=>el).join(',').split(',').forEach(el=>{
                newFeaturesObj[el] = false;
            })
            setFeaturesObj(newFeaturesObj)

            let citiesArr = [...new Set(Object.values(businesses).map(el=>el.city))]
            setCities(()=>citiesArr)
            let newCityObj = {}
            citiesArr.forEach(el=> newCityObj[el] = false)
            setCitiesObj(()=>newCityObj)

            let categoriesArr = Object.values(businesses)
            .map(el=> el.categories)
            categoriesArr = [].concat(...categoriesArr).map(el=>el.categoryName)
            categoriesArr = [...new Set(categoriesArr)]
            console.log("categoriesArr-------------->", categoriesArr)
            setCategories(()=>categoriesArr)
            let newCatObj = {}
            // for(let cat of categoriesArr){
            //     console.log(cat)
            //     console.log("searchParams", searchParams.query.categories)
            // }
            // categoriesArr.forEach(el=>{
            //     if(el===searchParams.query.categories){
            //         newCatObj[el] = true
            //     }else{
            //         newCatObj[el] = false
            //     }
            // })
            // setCatObj(()=>newCatObj)
            // console.log("cat object ----->", newCatObj)
        }
    },[businesses])

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
        // console.log("features111111=====>",featuresObj)
        // console.log("features555555=====>",tester)
        let featuresQuery = []
        Object.entries(featuresObj).forEach(el=>{
            if(el[1]) featuresQuery.push(el[0])
        })
        // console.log(featuresQuery)
        // console.log(featuresQuery.join(','))
        let newContext = {
            ...searchParams,
			query: {
                ...searchParams.query,
				features: featuresQuery.join(',')
			}
		}
        newContext.filters = isFiltered(newContext)
        // console.log(newContext)
        setSearchParams(()=>newContext)
    },[featuresObj])

    useEffect(()=>{
        // console.log(citiesObj)
        let citiesQuery = []
        Object.entries(citiesObj).forEach(el=>{
            if(el[1]) citiesQuery.push(el[0])
        })

        let newContext = {
            ...searchParams,
			query: {
                ...searchParams.query,
				city: citiesQuery.join(',')
			}
		}
        newContext.filters = isFiltered(newContext)
        // console.log(newContext)
        setSearchParams(()=>newContext)

    },[citiesObj])

    const handlePriceChange = (e) =>{
        // console.log(e.target.value)
        let newPriceObj = {
            ...priceFilter,
            [e.target.value]: !priceFilter[e.target.value]
        }
        // console.log(newPriceObj)
        setPriceFilter(newPriceObj)
    }

    const handleFeatureChange = (e) =>{
        // console.log(e.target.value)
        let newfeatObj = {
            ...featuresObj,
            [e.target.value]: !featuresObj[e.target.value]
        }
        setFeaturesObj(newfeatObj)
    }

    const handleCityChange = e =>{
        // console.log(e.target.value)
        let newCityObj = {
            ...citiesObj,
            [e.target.value]: !citiesObj[e.target.value]
        }
        setCitiesObj(newCityObj)
    }

    const handleCategoryChange = e =>{
        console.log(e.target.value)
    }

    useEffect(()=>{
        console.log("tester------>", tester)
    },[tester,searchParams])

    return (
        <div className='filters-menu'>
            <h3>Filter Results</h3>
            <div>
                <h5>Price</h5>
                <div class="price-button-group margin5-top-bottom">
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
            </div>
            <div class='features-button-group flex-col margin5-top-bottom push-text'>
                <h5>Business Features</h5>
                {features && features.map(el=>(
                    <label>
                        <input type="checkbox" value={el} onChange={handleFeatureChange} />
                        <span class="">{el}</span>
                    </label>
                ))}
            </div>
            <div class='city-button-group flex-col margin5-top-bottom push-text'>
                <h5>Cities</h5>
                {cities && cities.map(el=>(
                    <label>
                        <input type="checkbox" value={el} onChange={handleCityChange} />
                        <span class="">{el}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
