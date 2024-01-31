import React, { useEffect, useState } from "react";
import { app } from "../../Firebase";
import { collection, getFirestore, doc, getDocs, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import style from './Mycart.module.css'
function Mycart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const auth = getAuth(app);
        const user = auth.currentUser;
    
        if (user) {
          const userId = user.uid;
          const db = getFirestore(app);
          const userDocRef = doc(collection(db, 'users'), userId);
          const cartCollectionRef = collection(userDocRef, 'cart');
    
          // Use onSnapshot to listen for real-time updates
          const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
            const updatedCartData = snapshot.docs.map(doc => doc.data());
            setCartItems(updatedCartData);
          });
          
          const totalItems=cartItems.map((item)=>(
            item.quantity
          )).reduce((acc,count)=>acc+count,0)

          console.log("Navbar:",totalItems);

          
          // To stop listening, call the unsubscribe function when the component unmounts
          return () => unsubscribe();
        }
      }, []); // Empty dependency array means this effect runs once when the component mounts

   async function removeItemHandle(item) {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const db = getFirestore(app);
            const userDocRef = doc(collection(db, 'users'), userId);
            const cartCollectionRef = collection(userDocRef, 'cart');
            const itemDocRef = doc(cartCollectionRef, item.itemId);
            
            // Delete the document
            await deleteDoc(itemDocRef);
            // Fetch updated cart items after deletion
            //  const updatedCartSnapshot = await getDocs(cartCollectionRef);
            //  const updatedCartData = updatedCartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            //  setCartItems(updatedCartData);
 
            //  alert("Item Removed");
         } else {
             alert("Invalid User");
         }
    }


    async function handleIncrease(item) {
        const auth = getAuth(app);
        const user = auth.currentUser;
      
        try {
          if (user) {
            const userId = user.uid;
            const db = getFirestore(app);
            const userDocRef = doc(collection(db, 'users'), userId);
            const cartCollectionRef = collection(userDocRef, 'cart');
            const itemDocRef = doc(cartCollectionRef, item.itemId);
      
            const currentQuantity = item.quantity || 0;
            await updateDoc(itemDocRef, {
              quantity: currentQuantity + 1,
            });
      
            // alert("Item quantity increased!");
          } else {
            alert("Invalid User");
          }
        } catch (error) {
          console.error("Error updating item quantity:", error.message);
          alert("Failed to increase item quantity. Please try again.");
        }
      }
      async function handleDecrease(item) {
        const auth = getAuth(app);
        const user = auth.currentUser;
      
        try {
          if (user) {
            const userId = user.uid;
            const db = getFirestore(app);
            const userDocRef = doc(collection(db, 'users'), userId);
            const cartCollectionRef = collection(userDocRef, 'cart');
            const itemDocRef = doc(cartCollectionRef, item.itemId);
      
            const currentQuantity = item.quantity || 0;
            if(currentQuantity<=0){
                return;
            }
            await updateDoc(itemDocRef, {
              quantity: currentQuantity - 1,
            });
      
            // alert("Item quantity increased!");
          } else {
            alert("Invalid User");
          }
        } catch (error) {
          console.error("Error updating item quantity:", error.message);
          alert("Failed to increase item quantity. Please try again.");
        }
      }
      const itemsPrice = cartItems.map((item) =>(  
        item.Price *item.quantity)
       ).reduce((acc, price) => acc + price, 0);
    //    setTotalPrice(itemsPrice);
       console.log("itemsPrice: ",itemsPrice);

    return (
        <div>
            <h2>Your Cart</h2>
            <div className={style.mainBody}>
                <div className={style.homeLeft}>
                    <p>Total Price: ₹{itemsPrice}</p>
                    <button className={style.placeOrder}>Place Order</button>
                </div>

                <div className={style.homeRight}>
                    {
                        cartItems.map((item, index) => (
                            <div className={style.itempro} key={`item-${index}`}>
                                <img src={item.Image} alt={`Product: ${item.Title}`} style={{ height: 200, width: 197 }}></img>
                                <h3>{item.Title}</h3>
                                <div className={style.countPriceContainer}>
                                    <p>₹ {item.Price}</p>
                                    <div className={style.count}>
                                        <img
                                        style={{cursor:'pointer'}}
                                        onClick={()=>handleDecrease(item)}
                                        alt="- Icon" 
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC" />
                                        {item.quantity}
                                        <img
                                        style={{cursor:'pointer'}}
                                        onClick={()=>handleIncrease(item)}
                                        alt="+ Icon" 
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC" />
                                    </div>
                                </div>
                                {/* <h3></h3> */}
                                <button onClick={() => removeItemHandle(item)} className={style.cartButton}>Remove From Cart</button>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default Mycart;
