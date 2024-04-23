import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import db from '../../firebase'
import SurveyProduct from './SurveyProduct';
import Header from '../social/Header.js'
import '../../css/Users.css'

function SurveyResults() {
    const {currentUser} = useAuth();
    const [products, setProducts] = useState([]);
    const [length, setLength] = useState(0);
    const [requests, setRequests] = useState(0);

    useEffect(() => {
        if (currentUser) {
            db.collection("users").doc(currentUser.uid).get().then(docc => {
                const data = docc.data();
                setLength(data.noItems);
            })
            db.collection("users").doc(currentUser.uid).collection("friendRequests").get().then(snapshot => {
              setRequests(snapshot.size);
          })
        }
    })

    useEffect(() => {
        db.collection('users').doc(currentUser.uid).collection('surveyResults')
        .onSnapshot((snapshot) => 
        setProducts(snapshot.docs.map((doc) => ({
            productId: doc.id,
            product: doc.data()
        })))
    );
    // eslint-disable-next-line
    }, [])

    return (
      <div>
        <Header length={length} noRequests={requests} />
        <h2 className="users-heading">Survey Results <span><img src="https://img.icons8.com/color/64/000000/report-card.png" alt="" /></span></h2>
        <div className="user__row" style={{marginTop: "40px"}}>
            {products.map(({ productId, product }) => (
				<SurveyProduct 
					key = {productId}
					id = {productId}
					productName = {product.itemName}
					productImage = {product.itemImage}
				/>
            ))}
          </div>
    </div>
    )
}

export default SurveyResults
