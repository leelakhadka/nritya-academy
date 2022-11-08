import { createContext, useState, useEffect } from 'react'

const ReviewContext = createContext()

export const ReviewProvider = ({ children, currentUser, currentDanceClass }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [review, setReview] = useState([])
    const [user, setUser] = useState(null)
    const [danceClass, setDanceClass] = useState(null)
    const [reviewEdit, setReviewEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        setUser(currentUser)
        setDanceClass(currentDanceClass)
        fetchReview()
    }, [])

    const fetchReview = async () => {
        const response = await fetch(`/api/reviews`)
        const data = await response.json()


        console.log(data)
        setReview(data.filter(singleReview => singleReview.dance_class.id === currentDanceClass.id))
        setIsLoading(false)
    }

    const addReview = async (newReview) => {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
        })

        const data = await response.json()

        setReview([data, ...review])
    }

    const deleteReview = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/api/reviews/${id}`, { method: 'DELETE' })

            setReview(review.filter((item) => item.id !== id))
        }
    }

    const updateReview = async (id, updItem) => {
        const response = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })

        const data = await response.json()

        setReview(review.map((item) => (item.id === id ? data : item)))

        setReviewEdit({
            item: {},
            edit: false,
        })
    }

    const editReview = (item) => {
        setReviewEdit({
            item,
            edit: true,
        })
    }

    return (
        <ReviewContext.Provider
            value={{
                user,
                danceClass,
                review,
                reviewEdit,
                isLoading,
                deleteReview,
                addReview,
                editReview,
                updateReview,
            }}
        >
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContext