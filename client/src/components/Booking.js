function Booking({ booking, deleteBooking, currentBooking }) {

    const { id, fee, dance_class } = booking

    const { category, location, date, start_time, duration, image } = dance_class

    const handleClick = () => {
        fetch('/api/bookings/' + id, {
            method: 'DELETE'
        })
            .then(() => {
                deleteBooking(booking)
            })
    }

    const handleToggle = () => {
        currentBooking(booking)
    }

    return (
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
                            <p className='danceClassListingLocation'>Location: {location}</p>
                            <p className='bookingElement'>Date: {date}</p>
                            <p className='bookingElement'>Start Time: {start_time}</p>
                            <p className='bookingElement'>Duration: {duration} hour</p>
                            <p className='bookingElement'>Paid: {fee}</p>
                            <p className='bookingElement'>Due: {10 - fee} </p>
                            <button className='btn btn-danger' onClick={handleClick}>Cancel this booking</button>

                            {
                                fee === 10 ?
                                    <button type="button" className='btn-payed' disabled='true'>No Payment Due</button>
                                    :
                                    <button className='btn' onClick={handleToggle}>Pay Remaining Balance</button>

                            }
                        </div>
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default Booking;