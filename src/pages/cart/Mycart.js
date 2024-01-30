import React, { useEffect, useState } from "react";
import { app } from "../../Firebase";
import { collection, getFirestore, doc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import style from'./Mycart.module.css'
function Mycart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const db = getFirestore(app);
            const userDocRef = doc(collection(db, 'users'), userId);
            const cartCollectionRef = collection(userDocRef, 'cart');

            // Fetch cart items
            const fetchCartItems = async () => {
                try {
                    const cartSnapshot = await getDocs(cartCollectionRef);
                    const cartData = cartSnapshot.docs.map(doc => doc.data());
                    setCartItems(cartData);
                } catch (error) {
                    console.error('Error fetching cart data:', error);
                }
            };

            fetchCartItems();
        }
    }, []);

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <div className={style.itempro} key={`item-${index}`}>
                        <img src={item.Image} alt={`Product: ${item.Title}`} style={{ height: 200, width: 197 }}></img>
                        <h3>{item.Title}</h3>
                        <h3>₹ {item.Price}</h3>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Mycart;
