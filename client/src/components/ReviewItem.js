import { FaTimes, FaEdit } from 'react-icons/fa'
import { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReviewContext from '../context/ReviewContext'

function ReviewItem({ item }) {
    const { user, deleteReview, editReview } = useContext(ReviewContext)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        debugger
        if (item.user.id === user.id) {
            setShowButton(true)
        }
    }, [user])

    return (
        <div className='review-div'
            style={{
                backgroundColor: '#fff',
                color: '#000',
            }}>
            <div className='review-num-display'>{item.rating}</div>
            <div className='reviewer'>{item.user.first_name}</div>

            {
                showButton === true ?
                    <>
                        <button onClick={() => deleteReview(item.id)} className='review-close'>
                            <FaTimes color='black' />
                        </button>
                        <button onClick={() => editReview(item)} className='review-edit'>
                            <FaEdit color='black' />
                        </button></>
                    :
                    <></>

            }


            <div>{item.comment}</div>
        </div>
    )
}

ReviewItem.propTypes = {
    item: PropTypes.object.isRequired,
}

export default ReviewItem