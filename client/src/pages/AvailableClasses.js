import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import DanceClassSearch from '../components/DanceClassSearch'
import DanceClassList from '../components/DanceClassList'

function AvailableClasses({ currentUser, classList, singleDanceClass }) {
    console.log(currentUser)
    const navigate = useNavigate()
    const [searchString, setSearchString] = useState("");


    return (

        <div>
            <DanceClassSearch search={searchString} onSearchChange={setSearchString} />
            <DanceClassList dance_classes={classList.filter(danceClass => danceClass.category.toLowerCase().includes(searchString.toLowerCase()))} singleDanceClass={singleDanceClass} />
        </div>
    )
}

export default AvailableClasses;