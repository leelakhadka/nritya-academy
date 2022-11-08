import React from "react";
import Booking from "./Booking";

function MyBookings({ currentUser, userBookings, deleteBooking, currentBooking }) {
    console.log(currentUser)
    console.log(userBookings)
    return (
        <div>
            <h1> {currentUser.first_name} {currentUser.last_name}  total bookings({userBookings.length})</h1>
            {userBookings.map(booking => <Booking key={booking.id} booking={booking} deleteBooking={deleteBooking} currentBooking={currentBooking} />)}
        </div>
    )
}

export default MyBookings;