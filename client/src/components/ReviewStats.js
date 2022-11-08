import { useContext } from 'react'
import ReviewContext from '../context/ReviewContext'

function ReviewStats() {
    const { review } = useContext(ReviewContext)

    const average = Math.round(
        review.reduce((acc, { rating }) => acc + rating, 0) / review.length
    )

    return (
        <div className='review-feedback-stats'>
            <h4>{review.length} Reviews</h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}

export default ReviewStats