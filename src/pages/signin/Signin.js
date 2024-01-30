import { useState } from 'react';
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import style from './Signin.module.css';

function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Update user's display name using updateProfile
      await updateDisplayName(newUser, name);

      console.log('User signed up successfully!');
      console.log('New User ID:', newUser.uid);
    } catch (error) {
      setError(error.message);
      console.error('Sign-up error:', error.message);
    }
  };

  const updateDisplayName = async (user, displayName) => {
    try {
      await setDisplayName(user, displayName);
    } catch (error) {
      console.error('Error updating display name:', error.message);
    }
  };

  const setDisplayName = (user, displayName) => {
    return new Promise((resolve, reject) => {
      // This is a workaround as the updateProfile method is not available directly in Firebase v9
      user.updateProfile({
        displayName: displayName,
      })
      .then(() => resolve())
      .catch((error) => reject(error));
    });
  };

  return (
    <div className={style.signinContainer}>
      <div className={style.signin}>
        <h1>Sign Up</h1>
        <div className={style.form}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button onClick={handleSignUp}>Sign Up</button>
          {error && <p className={style.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Signin;
