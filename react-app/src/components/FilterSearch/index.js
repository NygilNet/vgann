import React, { useRef, useEffect, useState } from 'react';
import {useSearchParams} from "../../context/SearchParamsContext"
import { isFiltered } from '../../utils/searchAndFilters';

export default function FilterSearch(){
    const {searchParams, setSearchParams} = useSearchParams()
    // const [filterParams, setFilterParams] = useState({})
    const [priceFilter,setPriceFilter] = useState({1:false,2:false,3:false,4:false})

    const handleChange = (e) =>{
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
				price: priceString
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
    },[priceFilter])

    useEffect(()=>{
        console.log("^^^^^^^----",searchParams)
    },[searchParams])
    return (
        <div>
            <label>
              <input type="checkbox" value="1" onChange={handleChange} />
              ${1}
            </label>
            <label>
              <input type="checkbox" value="2" onChange={handleChange} />
              ${2}
            </label>
            <label>
              <input type="checkbox" value="3" onChange={handleChange} />
              ${3}
            </label>
            <label>
              <input type="checkbox" value="4" onChange={handleChange} />
              ${4}
            </label>
        </div>
    )
}
