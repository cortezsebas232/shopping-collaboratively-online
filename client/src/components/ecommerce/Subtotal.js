import React from "react";
import "../../css/Subtotal.css";
import CurrencyFormat from "react-currency-format";

function Subtotal({length, total, checkout}) {
    return (
        <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
            <>
                <p>
                Subtotal ({length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                {checkout? <label><input type="checkbox" /> This order contains a gift</label> : <div></div>}
                </small>
            </>
            )}
            decimalScale={2}
            value={total} 
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
        />
        {checkout? <button>Proceed to Checkout</button>: <div></div>}
        
        </div>
    );
}

export default Subtotal;