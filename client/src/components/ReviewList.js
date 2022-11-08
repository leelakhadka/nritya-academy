import { useContext } from 'react'
import FeedbackItem from './ReviewItem'
import ReviewContext from '../context/ReviewContext'

function ReviewList() {
  const { review, isLoading } = useContext(ReviewContext)

  if (!isLoading && (!review || review.length === 0)) {
    return <p>No Review Yet</p>
  }

  return (
    <div className='review-list'>
      {review.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ReviewList