import style from './Nav.module.css';
import { Link } from 'react-router-dom';
function Nav(){
    return(
        <div className={style.navContainer}>
            <Link to={`/`} className={style.logo}>
                <div>Logo</div>
            </Link>
            
            <ul >
                <Link to={`/`} className={style.right}>
                    <li>Home</li>
                </Link>
                <Link to={`/login`} className={style.right}>
                    <li>Singn In</li>
                </Link>
            </ul>
        </div>
    );
}

export default Nav;