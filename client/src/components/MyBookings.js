import React from "react";
import Booking from "./Booking";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


function MyBookings({ currentUser, userBookings, deleteBooking, currentBooking }) {
    console.log(currentUser)
    console.log(userBookings)
    return (
        <div>
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                events={userBookings.map(booking => {
                    return {
                        title: booking.dance_class.category,
                        date: booking.dance_class.date
                    }
                })}
            />
            {userBookings.map(booking => <Booking key={booking.id} booking={booking} deleteBooking={deleteBooking} currentBooking={currentBooking} />)}
        </div>
    )
}

export default MyBookings;