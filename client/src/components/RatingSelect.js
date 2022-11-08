function RatingSelect({ select, selected }) {

    const handleChange = (e) => {
        select(+e.currentTarget.value)
    }

    return (
        <ul className='review-rating'>
            {Array.from({ length: 10 }, (_, i) => (
                <li key={`rating-${i + 1}`} className='review-rating'>
                    <input
                        type='radio'
                        id={`num${i + 1}`}
                        name='rating'
                        value={i + 1}
                        onChange={handleChange}
                        checked={selected === i + 1}
                        className='review-input'
                    />
                    <label htmlFor={`num${i + 1}`}>{i + 1}</label>
                </li>
            ))
            }
        </ul >
    )
}

export default RatingSelect