import React, { useRef, useEffect, useState } from 'react';
import {useSearchParams} from "../../context/SearchParamsContext"

export default function FilterSearch(){
    const {SearchParams, setSearchParams} = useSearchParams()
    const [filterParams, setFilterParams] = useState({})

    const handleChange = (e) =>{
        const new_filter_object = {
            price: 2,
            features: "delivery,takeout"
        }
        const context = "?price=2&features=delivey&"
    }

    return (
        <div>
            <input type="radio" id="1">$</input>
            <input type="radio" id="2">$$</input>
            <input type="radio" id="3">$$$</input>
            <input type="radio" id="4">$$$$</input>
        </div>
    )
}
