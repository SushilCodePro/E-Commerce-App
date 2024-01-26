import style from './Home.module.css'

function Home(){
    return(
        <div className={style.homeContainer}>
            <div className={style.search}>
                <input placeholder='Search By Name'/>
            </div>
            
            <div className={style.mainBody}>
                <div className={style.homeLeft}>

                </div>
                <div className={style.homeRight}>
        
                </div>
            </div>
        </div>
    );
}

export default Home;