import React from 'react'
import '../../css/CheckoutProduct.css';
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';

function CheckoutProduct({productId, title, price, image, rating, quantity, setLength, setTotal}) {
    const {currentUser} = useAuth();

    const removeFromBasket = () => {
        if(quantity > 1) {
            db.collection("users").doc(currentUser.uid).collection("basketItems").doc(productId).update({
                itemQuantity: quantity - 1
            }).then(() => {
                console.log("Item successfully deleted!");
                db.collection("users").doc(currentUser.uid).get().then(docc => {
                    const data = docc.data()
                    db.collection("users").doc(currentUser.uid).update({
                        subtotal: data.subtotal - price,
                        noItems: data.noItems - 1
                    })
                    setLength(data.noItems - 1);
                    setTotal(data.subtotal - price);
                    if (data.noItems - 1 === 0) {
                        setTotal(0);
                    }
                })
            }).catch((error) => {
                console.error("Error removing item: ", error);
            });
        }
        else {
            db.collection("users").doc(currentUser.uid).collection("basketItems").doc(productId).delete().then(() => {
                console.log("Item successfully deleted!");
                db.collection("users").doc(currentUser.uid).get().then(docc => {
                    const data = docc.data()
                    db.collection("users").doc(currentUser.uid).update({
                        subtotal: data.subtotal - price,
                        noItems: data.noItems - 1
                    })
                    setLength(data.noItems - 1);
                    setTotal(data.subtotal - price);
                    if (data.noItems - 1 === 0) {
                        setTotal(0);
                    }
                })
            }).catch((error) => {
                console.error("Error removing item: ", error);
            });
        }
    };
    return (
        <div className="checkoutProduct">
            <img alt="" className="checkoutProduct_image" src={image} />
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">
                    {title}
                </p>
                <p className="checkoutProduct_price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <p>Quantity: &nbsp;
                <strong>{quantity}</strong></p>
                <div className="checkoutProduct_rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                        <p className="star">⭐</p>
                    ))}
                </div>
                <button onClick={removeFromBasket}>Remove from checkout</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
