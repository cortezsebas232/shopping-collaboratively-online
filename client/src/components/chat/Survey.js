import React, { useState } from 'react'
import '../../css/Survey.css'
import db from '../../firebase';
import {useAuth} from "../../contexts/AuthContext";
import {FaStar} from "react-icons/fa"
 
function Survey({handleClose, productImage, productId, productName, userId}) {
    const {currentUser} = useAuth();
    const [quality, setQuality] = useState(null);
    const [hoverQuality, setHoverQuality] = useState(null)
    const [fitting, setFitting] = useState(null);
    const [hoverFitting, setHoverFitting] = useState(null)
    const [valMoney, setValMoney] = useState(null);
    const [hoverValMoney, setHoverValMoney] = useState(null)
    const [material, setMaterial] = useState(null);
    const [hoverMaterial, setHoverMaterial] = useState(null)
    const [feedback, setFeedback] = useState('');
 
    const submitFeedback = () => {
        db.collection('users').doc(userId).collection('surveyResults').doc(productId).set({
            itemName: productName,
            itemImage: productImage,
            itemId: productId
        })
 
        db.collection('users').doc(userId).collection('surveyResults').doc(productId).collection('reviews').doc(currentUser.uid).set({
            reviewerName: currentUser.displayName,
            productQuality: quality,
            productFitting: fitting,
            productValMoney: valMoney,
            productMaterial: material,
            productFeedback: feedback
        })
        handleClose();
    }
 
 
    return (
        <div className="survey-modal">
            <br />
            <br />
            <p>Please rate the quality of this product: </p>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
 
                return (
                    <label>
                        <input type="radio" className="d-none" name="rating" value={ratingValue} 
                            onClick={() => setQuality(ratingValue)} />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hoverQuality || quality) ? "#ffc107" : "#e4e5e9"}
                            size={40}
                            onMouseEnter={() => setHoverQuality(ratingValue)}
                            onMouseLeave={() => setHoverQuality(null)}
                        />
                    </label>
                );
            })}

            <hr/>
 
            <p>Please rate this product on the basis of it's comfortableness and fitting: </p>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
 
                return (
                    <label>
                        <input type="radio" className="d-none" name="rating" value={ratingValue} 
                            onClick={() => setFitting(ratingValue)} />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hoverFitting || fitting) ? "#ffc107" : "#e4e5e9"}
                            size={40}
                            onMouseEnter={() => setHoverFitting(ratingValue)}
                            onMouseLeave={() => setHoverFitting(null)}
                        />
                    </label>
                );
            })}

            <hr/>
 
            <p>Is it a good value for money? </p>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
 
                return (
                    <label>
                        <input type="radio" className="d-none" name="rating" value={ratingValue} 
                            onClick={() => setValMoney(ratingValue)} />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hoverValMoney || valMoney) ? "#ffc107" : "#e4e5e9"}
                            size={40}
                            onMouseEnter={() => setHoverValMoney(ratingValue)}
                            onMouseLeave={() => setHoverValMoney(null)}
                        />
                    </label>
                );
            })}

            <hr/>
 
            <p>Is the material and color of this product good? </p>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
 
                return (
                    <label>
                        <input type="radio" className="d-none" name="rating" value={ratingValue} 
                            onClick={() => setMaterial(ratingValue)} />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hoverMaterial || material) ? "#ffc107" : "#e4e5e9"}
                            size={40}
                            onMouseEnter={() => setHoverMaterial(ratingValue)}
                            onMouseLeave={() => setHoverMaterial(null)}
                        />
                    </label>
                );
            })}
            <hr/>
            <label>
                What is you overall satisfaction with the product? <br />
                <input onChange={(e) => setFeedback(e.target.value)} type="text" value={feedback} placeholder="Write feedback" />
            </label>
            <br />
 
            <button onClick={submitFeedback} type="submit" className="register__register">Submit</button>
        </div>
    )
}
 
export default Survey
