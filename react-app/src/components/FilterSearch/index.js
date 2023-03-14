import React, { useRef, useEffect, useState } from 'react';
import {useSearchParams} from "../../context/SearchParamsContext"
import { isFiltered } from '../../utils/searchAndFilters';
import './index.css'

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
				price: priceString.slice(0,priceString.length-1)
			}
		}
        newContext.filters = isFiltered(newContext)
        setSearchParams(()=>newContext)
    },[priceFilter])

    useEffect(()=>{
        // console.log("^^^^^^^----",searchParams)
    },[searchParams])
    return (
        // <div>
        //     <label>
        //       <input type="checkbox" value="1" onChange={handleChange} />
        //       $
        //     </label>
        //     <label>
        //       <input type="checkbox" value="2" onChange={handleChange} />
        //       $$
        //     </label>
        //     <label>
        //       <input type="checkbox" value="3" onChange={handleChange} />
        //       $$$
        //     </label>
        //     <label>
        //       <input type="checkbox" value="4" onChange={handleChange} />
        //       $$$$
        //     </label>
        // </div>
        <div class="button-group">
            <label class="checkbox-label">
              <input type="checkbox" value="1" onChange={handleChange} />
              <span class="label-text">$</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="2" onChange={handleChange} />
              <span class="label-text">$$</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="3" onChange={handleChange} />
              <span class="label-text">$$$</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" value="4" onChange={handleChange} />
              <span class="label-text">$$$$</span>
            </label>
        </div>
    )
}
