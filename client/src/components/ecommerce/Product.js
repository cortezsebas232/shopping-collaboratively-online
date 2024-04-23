import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import '../../css/Product.css'
import db from '../../firebase'
import ShareProductModal from './ShareProductModal';
import { Tooltip } from 'reactstrap';


function Product({id, title, image, price, rating, quantity, userId, setLength}) {
    const {currentUser} = useAuth();
    const [twinCount, setTwinCount]  = useState(0);
    const [twins, setTwins] = useState([]);
    const [show, setShow] = useState(false);
    const [tooltipOpenTwinCount, setTooltipOpenTwinCount] = useState(false);
    const [tooltipOpenAddToCart, setTooltipOpenAddToCart] = useState(false);
    const [tooltipOpenProductReview, setTooltipOpenProductReview] = useState(false);
    const toggleTwinCount = () => setTooltipOpenTwinCount(!tooltipOpenTwinCount);
    const toggleAddToCart = () => setTooltipOpenAddToCart(!tooltipOpenAddToCart);
    const toggleProdutcReview = () => setTooltipOpenProductReview(!tooltipOpenProductReview);

    const addToBasket = (event) => {
        event.preventDefault();

        db.collection("users").doc(userId).collection("basketItems").doc(id).get().then((doc) => {
            if (doc.exists) {
                quantity  = doc.data().itemQuantity;
                db.collection("users").doc(userId).collection("basketItems").doc(id).update({
                    itemId: id,
                    itemName: title,
                    itemImage: image,
                    itemPrice: price,
                    itemRating: rating,
                    itemQuantity: quantity + 1,
                });
            }
            else {
                db.collection("users").doc(userId).collection("basketItems").doc(id).set({
                    itemId: id,
                    itemName: title,
                    itemImage: image,
                    itemPrice: price,
                    itemRating: rating,
                    itemQuantity: quantity + 1,
                });
            }
        })

        db.collection("users").doc(userId).get().then(docc => {
            const data = docc.data()
            db.collection("users").doc(userId).update({
                subtotal: data.subtotal + price,
                noItems: data.noItems + 1
            })
            setLength(data.noItems + 1);
        })
    }

    useEffect(() => {
        var count = 0;
        db.collection("users").doc(currentUser.uid).collection("friends").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.id);
                db.collection("users").doc(doc.id).collection("basketItems").doc(id).get().then((docc) => { 
                    if (docc.exists) { 
                        setTwins(twins => [...twins, doc.data().friendName]);
                        console.log("Document data:", docc.data()); 
                        count = count + 1;
                    } 
                    else { 
                        // doc.data() will be undefined in this case 
                        console.log("No such document!"); 
                    }
                    setTwinCount(count);
                }).catch((error) => { 
                    console.log("Error getting document:", error); 
                });
                    
            })
        })
        setTwinCount(0);
        setTwins([]);
    // eslint-disable-next-line
    }, [])

    const seeTwinCount = (event) => {
        event.preventDefault();
        if (document.getElementById(`twinList${id}`).style.visibility === "hidden")
            document.getElementById(`twinList${id}`).style.visibility = "visible";
        else
            document.getElementById(`twinList${id}`).style.visibility = "hidden";
    }

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    return (
        <div className="product col-md-4 col-xs-12">
            <div className="product_info" style={{zIndex:"2"}}>
                <p>{title}</p>
                <p className="product_price">
                    <small>₹</small>
                    <strong>{price}</strong>    
                </p>
                <div className="product_rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                        <img src="https://img.icons8.com/fluent/48/000000/star.png" alt="star" height="25px" style={{marginTop: "10px"}} />
                    ))}
                </div>
                
                <div className="product__options">
                    <sub style={{marginLeft: "30px", marginBottom: "-10px", fontSize: "15px"}}><strong>{twinCount}</strong></sub>
                    <img src="https://img.icons8.com/color/48/000000/friends-hanging-out.png" alt="emoji" height="35px" onClick={seeTwinCount} id={`twincount${id}`} style={{outline: "none", color:"#440a67", cursor:"pointer", pointerEvents:"auto", marginBottom:10, marginTop:10, marginRight:20}} />
                    <br />
                    <Tooltip placement="bottom" isOpen={tooltipOpenTwinCount} target={`twincount${id}`} toggle={toggleTwinCount}>
                        See Twin Count
                    </Tooltip>
                    <img src="https://img.icons8.com/color/48/000000/shopping-cart--v2.png" alt="basket" height="35px" onClick={addToBasket} id={`addtocart${id}`} style={{outline: "none", color:"#440a67", cursor:"pointer", marginBottom:10, marginRight:20}} />
                    <br/>
                    <Tooltip placement="bottom" isOpen={tooltipOpenAddToCart} target={`addtocart${id}`} toggle={toggleAddToCart}>
                        Add to basket
                    </Tooltip>
                    <img src="https://img.icons8.com/color/48/000000/reviewer-female.png" alt="review" height="35px" onClick={showModal} id={`productreview${id}`} style={{outline: "none", color:"#440a67", cursor:"pointer", marginBottom:10, marginRight:20}}/>
                    <br/>
                    <Tooltip placement="bottom" isOpen={tooltipOpenProductReview} target={`productreview${id}`} toggle={toggleProdutcReview}>
                        Ask for Product Review
                    </Tooltip>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <img
                alt="productImage"
                src={image}
                />
                <div id={`twinList${id}`} style={{visibility: "hidden", position: "absolute", right: "20px", zIndex:2, backgroundColor:"#440A67", color:"white", width:"fit-content", height:"fit-content", padding:10, marginTop:"-60px", borderRadius:12}}>
                        {twins.map( e =>
                            <div>{ e }</div>
                        )}
                </div>
            </div>
            <ShareProductModal show={show} handleClose={hideModal} image={image} id={id} title={title} userid={currentUser.uid}>
                <p>Modal</p>
            </ShareProductModal>
            
            
        </div>
    )
}

export default Product
