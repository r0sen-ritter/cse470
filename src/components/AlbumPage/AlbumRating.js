import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const AlbumRating = () => {
    const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    // other logic
    }

    return (
        <>
            <Rating onClick={handleRating} ratingValue={rating} /* Available Props */ />
        </>
    )
}

export default AlbumRating