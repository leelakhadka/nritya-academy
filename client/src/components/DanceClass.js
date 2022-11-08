import { useNavigate } from 'react-router-dom'

function DanceClass({ dance_class, singleDanceClass }) {
    let navigate = useNavigate();

    const { category, location, image } = dance_class

    const handleSingleDanceClass = () => {
        singleDanceClass(dance_class)
        navigate(`/available_classes/${dance_class.id}`)
    }
    return (



        <li className='danceClassListing' onClick={handleSingleDanceClass} style={{ cursor: 'pointer' }}>
            <img
                src={image}
                alt={category}
                className='danceClassListingsImg'
            />
            <div className='danceClassListingDetails'>
                <p className='danceClassListingName'>{category}</p>
                <p className='danceClassListingLocation'>{location}</p>
            </div>
        </li>
    )
}

export default DanceClass;