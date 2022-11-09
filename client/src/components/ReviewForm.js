import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import ReviewContext from '../context/ReviewContext'

function ReviewForm() {
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const { user, danceClass, addReview, reviewEdit, updateReview } =
        useContext(ReviewContext)

    useEffect(() => {
        if (reviewEdit.edit === true) {
            setBtnDisabled(false)
            setComment(reviewEdit.item.comment)
            setRating(reviewEdit.item.rating)
        }
    }, [reviewEdit])

    const handleTextChange = ({ target: { value } }) => {
        if (value === '') {
            setBtnDisabled(true)
            setMessage(null)

        } else if (value.trim().length < 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setComment(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (comment.trim().length > 10) {
            const newReview = {
                comment,
                rating,
                user_id: user.id,
                dance_class_id: danceClass.id
            }

            if (reviewEdit.edit === true) {
                updateReview(reviewEdit.item.id, newReview)
            } else {
                addReview(newReview)
            }

            setBtnDisabled(true)
            setRating(10)
            setComment('')
        }
    }

    return (
        <div className='review-div'
            style={{
                backgroundColor: '#fff',
                color: '#000',
            }}>
            <form onSubmit={handleSubmit}>
                <h2>Write a review on the above dance class</h2>
                <RatingSelect select={setRating} selected={rating} />
                <div className='review-input-group'>
                    <input className='review-input'
                        onChange={handleTextChange}
                        type='comment'
                        placeholder='Write your review here'
                        value={comment}
                    />
                    <button type='submit' disabled={btnDisabled} className={"review-btn review-btn-primary"}>
                        Send
                    </button>
                </div>

                {message && <div className='review-message'>{message}</div>}
            </form>
        </div>
    )
}

export default ReviewForm