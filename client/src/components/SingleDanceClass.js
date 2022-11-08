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
            <div className='danceClass'>
                <h1>{category} Class</h1>
                <main>
                    <ul className='danceClassListings'>
                        <li className='danceClassListing'>
                            <img
                                src={image}
                                alt={category}
                                className='danceClassListingsImg'
                            />
                            <div className='danceClassListingDetails'>
                                <p className='danceClassListingName'>{category}</p>
                                <p className='danceClassListingLocation'>{location}</p>
                                <p className='danceClassListingElement'>{date}</p>
                                <p className='danceClassListingElement'>{start_time}</p>
                                <p className='danceClassListingElement'>{duration} hour</p>
                                <button className='btn' onClick={handleToggle}>Book this class</button>
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