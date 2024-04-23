import React from 'react'

function ProductReview({key, id, feedback, fitting, material, quality, valMoney, reviewer}) {
    return (
            <div className="sidebarChat__info">
                <p className="checkoutProduct_title">
                    Reviewed by: {reviewer}
                </p>
                <p className="checkoutProduct_title">
                    Quality: {quality}
                </p>
                <p className="checkoutProduct_title">
                    Fitting: {fitting}
                </p>
                <p className="checkoutProduct_title">
                    Material: {material}
                </p>
                <p className="checkoutProduct_title">
                    Value for Money: {valMoney}
                </p>
                <p className="checkoutProduct_title">
                    Feedback: {feedback}
                </p>
            </div>
    )
}

export default ProductReview
