// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './Login.module.css';

function Login(){
    return(
        <div className={style.signinContainer}>
            <div className={style.signin}>
                <h1>LogIn</h1>
                <div className={style.form}>
                    <input placeholder='Enter Email'/>
                    <input placeholder='Enter Password'/>
                    <button>Submit</button>
                    <Link to={`/signin`} className={style.formfoot}>
                        <p>Or SignUp instead</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;