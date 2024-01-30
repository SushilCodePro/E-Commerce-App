import style from './Nav.module.css';
import { Link ,useNavigate} from 'react-router-dom';
import { auth } from '../../Firebase';
import { useState ,useEffect } from 'react';
function Nav() {
    const [user, setUser] = useState(null);
     // Use useNavigate instead of useHistory
     const navigate = useNavigate();

    useEffect(() => {
        //This method is provided by Firebase Authentication. It sets up a listener for authentication state changes.
        // It takes a callback function (callback) that will be called whenever the authentication state changes.
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
        setUser(authUser);
        });

        // Cleanup function to unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            console.log('User signed out successfully!');
            // Redirect to the home page after logout
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };
   
    return (
        <div className={style.navContainer}>
            <Link to={`/`} className={style.logo}>
                <div>Logo</div>
            </Link>

            <ul>
                {user? (
                    <>
                        <Link to={`/`} className={style.right}>
                            <li>Home</li>
                        </Link>
                        <Link to={`/mycart`} className={style.right}>
                            <li>My Cart</li>
                        </Link>
                        <Link to={`/myorder`} className={style.right}>
                            <li>My Orders</li>
                        </Link>
                        {/* <button onClick={handleLogout} className={style.right}>
                            Log Out
                        </button> */}
                        <li onClick={handleLogout} className={style.right} style={{cursor:"pointer"}}>
                            Log Out
                        </li>
                    </>
                ) : (
                    <>
                        <Link to={`/`} className={style.right}>
                            <li>Home</li>
                        </Link>
                        <Link to={`/login`} className={style.right}>
                            <li>Sign In</li>
                        </Link>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Nav;