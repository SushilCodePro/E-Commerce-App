import React, { useEffect, useState } from "react";
import { app } from "../../Firebase";
import { collection, getFirestore, doc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import style from './Order.module.css'


function Order() {
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const auth = getAuth(app);
            const user = auth.currentUser;

            try {
                if (user) {
                    const userId = user.uid;
                    const db = getFirestore(app);
                    const userDocRef = doc(collection(db, 'users'), userId);
                    const ordersCollectionRef = collection(userDocRef, 'orders');

                    const ordersSnapshot = await getDocs(ordersCollectionRef);

                    const allOrdersData = [];
                    for (const orderDoc of ordersSnapshot.docs) {
                        const orderId = orderDoc.id;
                        const transactionCollectionRef = collection(ordersCollectionRef, orderId, 'Transaction');

                        const transactionSnapshot = await getDocs(transactionCollectionRef);

                        const transactionData = [];
                        for (const itemDoc of transactionSnapshot.docs) {
                            transactionData.push(itemDoc.data());
                        }
                        console.log('transactionData:', transactionData);
                        allOrdersData.push({
                            orderId: orderId,
                            transaction: transactionData,
                        });
                    }

                    setOrdersData(allOrdersData);
                    console.log('User Orders:', allOrdersData);
                } else {
                    alert('Invalid User');
                }
            } catch (error) {
                console.error('Error retrieving orders:', error.message);
                alert('Failed to retrieve orders. Please try again.');
            }
        }

        fetchData();
    }, []);

    console.log('orderHis: ', ordersData);
    return (
    <>
        <div>
            <h1>Your Order</h1>
            {ordersData.map((order) => (
                <div key={order.orderId}>
                    <h2>Order ID: {order.orderId}</h2>
                    <ul>
                        {order.transaction.map((item) => (
                            <li key={item.itemId}>
                                {/* <p>Created At: {new Date(item.CreatedAt.seconds * 1000).toLocaleString()}</p> */}
                                <p>Title: {item.Title}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.Price}</p>
                                <br/>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </>
);

    
}

export default Order;