import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import ReviewList from './ReviewList'
import ReviewStats from './ReviewStats'
import ReviewForm from './ReviewForm'
import { ReviewProvider } from '../context/ReviewContext'

function SingleDanceClass({ danceClass, user }) {
    let navigate = useNavigate();

    const { category, location, date, start_time, duration, image } = danceClass

    const handleToggle = () => {
        if (user == null) {
            toast.warn("Create User before booking this class");
            navigate(`/sign-in`)
        } else {
            navigate(`/booking`)
        }
    }

    return (
        <>
            <div className='singleDanceClass'>
                <h1 className='singleDanceClassListingHeading'>Details</h1>
                <main>
                    <ul className='singleDanceClassListings'>
                        <li className='singleDanceClassListing'>
                            <img
                                src={image}
                                alt={category}
                                className='singleDanceClassListingsImg'
                            />
                            <div className='singleDanceClassListingDetails'>
                                <p className='singleDanceClassListingName'>{category}</p>
                                <p className='singleDanceClassListingLocation'>{location}</p>
                                <p className='singleDanceClassListingElement'>{date}</p>
                                <p className='singleDanceClassListingElement'>{start_time}</p>
                                <p className='singleDanceClassListingElement'>{duration} hour</p>
                                <button className='singleDanceClassBtn' onClick={handleToggle}>Book this class</button>
                            </div>
                        </li>
                    </ul>
                </main>
            </div>


            <div className='review-container'>
                <ReviewProvider currentUser={user} currentDanceClass={danceClass}>
                    <ReviewForm />
                    <ReviewStats />
                    <ReviewList />
                </ReviewProvider>
            </div>


        </>
    )
}

export default SingleDanceClass;