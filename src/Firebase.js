import { initializeApp } from 'firebase/app'; // Import the core Firebase module
import 'firebase/firestore'; // Import Firestore if you're using Firestore


const firebaseConfig = {
    apiKey: "AIzaSyBdTN8aNwsryGzkdH8EteeJv8J-47xxfvk",
    authDomain: "e-learning-app-e3c36.firebaseapp.com",
    projectId: "e-learning-app-e3c36",
    storageBucket: "e-learning-app-e3c36.appspot.com",
    messagingSenderId: "636569970130",
    appId: "1:636569970130:web:a8eeb7ee0079d2abc1940b"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export {app};