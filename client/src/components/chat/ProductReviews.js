import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import db from '../../firebase'
import ProductReview from './ProductReview';

function ProductReviews({productId}) {

    const {currentUser} = useAuth();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).collection('surveyResults').doc(productId).collection('reviews')
        .onSnapshot((snapshot) => 
            setReviews(snapshot.docs.map((doc) => ({
                ReviewId: doc.id,
                review: doc.data()
            })))
        );
    // eslint-disable-next-line
    }, [])

    return (
        <div className="checkout">
            <div className="sidebar__chats">
    
            <div>
                <h2 className="checkout__title">Product Reviews</h2>
                {reviews.map(({ reviewId, review }) => (
                    <ProductReview 
                        key = {reviewId}
                        id = {reviewId}
                        feedback = {review.productFeedback}
                        fitting = {review.productFitting}
                        material = {review.productMaterial}
                        quality = {review.productQuality}
                        valMoney = {review.productValMoney}
                        reviewer = {review.reviewerName}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}

export default ProductReviews
