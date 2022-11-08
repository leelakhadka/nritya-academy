import React, { useState } from "react";
import { toast } from 'react-toastify';

function BookingForm({ danceClass, currentUser, newBooking }) {

    const [fee, setFee] = useState('')
    const [userId, setUserId] = useState('')

    const formHandler = (e) => {
        e.preventDefault();

        if (fee === '' || fee > 10 || fee < 1) {
            toast.error("Please pay fee between 1 to 10 and enter correct student ID");
        } else {
            fetch('/api/bookings', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fee, user_id: currentUser.id, dance_class_id: danceClass.id
                }),
            })
                .then(r => r.json())
                .then(booking => {
                    newBooking(booking)
                    setFee(null);
                    setUserId(null);
                    toast.success("Booked " + danceClass.category + " successfully");
                })

        }
    }

    return (
        < div >
            <section className="form">
                <form onSubmit={formHandler}>
                    <section className='heading'>
                        <p>You are about to book a class for student: {currentUser.id}</p>
                    </section>
                    <div className='form-group'>
                        <input
                            type='number'
                            className='form-control'
                            id='fee'
                            value={fee}
                            onChange={e => setFee(e.target.value)}
                            placeholder='Enter Fee' />
                    </div>
                    <div className="form-group">
                        <button className='btn btn-block' type='submit'>Register In Class</button>
                    </div>
                </form>
            </section>
        </div >
    )
}

export default BookingForm;