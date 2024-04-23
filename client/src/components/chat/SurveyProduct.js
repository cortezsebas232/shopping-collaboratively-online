import React, { useState } from 'react'
import ProductReviewModal from './ProductReviewModal';
import '../../css/Users.css';

function SurveyProduct({key, id, productName, productImage}) {
    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    if (show) {
        if (document.getElementById(`review-card${id}`)) {
            document.getElementById(`review-card${id}`).classList.remove('card');
            document.getElementById(`review-card${id}`).classList.add('review');
        }
    }

    if (!show) {
        if (document.getElementById(`review-card${id}`)) {
            document.getElementById(`review-card${id}`).classList.remove('review');
            document.getElementById(`review-card${id}`).classList.add('card');
        }
    }
    return (
        <div id={`review-card${id}`} class="card" style={{height:"fit-content", marginTop: -20}}>
        <div class="card-header" style={{background:"white", height: "auto"}}>
            <img src={productImage} alt="item" style={{height:250, padding:0, objectFit:"contain"}}/>
        </div>
        <div class="card-body" style={{background:"#DAB5DA"}}>
            <h5>{productName}</h5>
            <ProductReviewModal show={show} productId={id} handleClose={hideModal}>
                    <p>Modal</p>
            </ProductReviewModal>
            <button onClick={showModal}>View Review</button>
        </div>
        </div>
    )
}

export default SurveyProduct
