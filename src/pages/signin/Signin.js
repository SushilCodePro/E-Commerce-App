// import { Link } from 'react-router-dom';
import style from './Signin.module.css';

function Signin(){
    return(
        <div className={style.signinContainer}>
            <div className={style.signin}>
                <h1>Sign Up</h1>
                <div className={style.form}>
                    <input placeholder='Enter Name'/>
                    <input placeholder='Enter Email'/>
                    <input placeholder='Enter Password'/>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Signin;