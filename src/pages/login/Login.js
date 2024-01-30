// Login.js
import { useState } from 'react';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import style from './Login.module.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Use useNavigate instead of useHistory
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            //he provided line of code attempts to sign in a user with the provided email and password, 
            //and once the sign-in is successful, it stores the UserCredential object in the userCredential variable
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in successfully!');
            console.log('User ID:', user.uid);

            // Redirect to the home page after successful login
            navigate('/'); // Use navigate instead of history.push

        } catch (error) {
            setError(error.message);
            console.error('Sign-in error:', error.message);
        }
    };

    return (
        <div className={style.signinContainer}>
            <div className={style.signin}>
                <h1>Log In</h1>
                <div className={style.form}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSignIn}>Log In</button>
                    {error && <p className={style.error}>{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
