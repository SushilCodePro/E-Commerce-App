import AddItems from './AddItems';
import style from './Home.module.css'
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { app } from "../../Firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

function Home() {

    const [items, setitems] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(87000);

    useEffect(() => {
        const db = getFirestore(app);
        const Ref = collection(db, 'items');
        const unsubscribe = onSnapshot(Ref, (snapshot) => {
            const data = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data(),
                }
            ))
            setitems(data);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // function onChangeHandle(e) {
    //     setSearchValue(e.target.value);
    //     console.log("seachinput", searchValue);

    // }

    // console.log("befor click check",checked);
    function onChangeHandle(e) {
        e.persist();
        console.log("precheck", e.target.checked);
        // Check if the event target is a checkbox
        if (e.target.type === "checkbox") {
            // If it's a checkbox, update selected categories
            const category = e.target.value;

            console.log("cat", e.target.value);
            setSelectedCategories((prevCategories) =>
                // If the checkbox is checked, add the category to the array
                e.target.checked
                    ? [...prevCategories, category]
                    // If the checkbox is unchecked, remove the category from the array
                    : prevCategories.filter((c) => c !== category)
            );

        } else {
            // If it's the search input, update searchValue
            setSearchValue(e.target.value);
        }
        console.log("after", selectedCategories);
    }

    // const filteredItems = items.filter((item) => item.Title.toLowerCase().includes(searchValue.toLowerCase()));
    const filteredItems = items.filter(
        (item) =>
            item.Title.toLowerCase().includes(searchValue.toLowerCase()) &&
            (selectedCategories.length === 0 ||
                selectedCategories.includes(item.Category)) && (item.Price <= priceRange)
    );

    function updatePrice(e) {
        console.log("range", e.target.value);
        setPriceRange(Number(e.target.value));
        console.log("range", priceRange);
    }
    return (
        <div className={style.homeContainer}>
            <AddItems />
            <div className={style.search}>
                <input
                    type='text'
                    placeholder='Search By Name'
                    value={searchValue}
                    onChange={(e) => { onChangeHandle(e) }}
                />
            </div>

            <div className={style.mainBody}>
                <div className={style.homeLeft}>
                    <h2>Filter</h2>
                    <div>
                        <label htmlFor="price">Price:{priceRange}</label>
                        <input
                            type='range'
                            id='price'
                            min="0"
                            max="99991"
                            step="10"
                            value={priceRange}
                            onInput={(e) => updatePrice(e)}
                            className={style.rangeInput}
                        />
                    </div>
                    <h2>Category</h2>
                    <ul>
                        <li>
                            <input
                                type="checkbox"
                                id="menClothing"
                                value="Men's Clothing"
                                onChange={(e) => onChangeHandle(e)}
                            // checked="true"
                            // checked={selectedCategories.includes("Men's Clothing")}//  determine the initial checked state
                            />
                            <label htmlFor="menClothing">Men's Clothing</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="womenClothing"
                                value="Women's Clothing"
                                onChange={(e) => onChangeHandle(e)}
                            // checked={selectedCategories.includes("Women's Clothing")}
                            />
                            <label htmlFor="womenClothing">Women's Clothing</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="jewelry"
                                value="Jewelry"
                                onChange={(e) => onChangeHandle(e)}
                            // checked={selectedCategories.includes("Jewelry")}
                            />
                            <label htmlFor="jewelry">Jewelry</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="electronics"
                                value="Electronics"
                                onChange={(e) => onChangeHandle(e)}
                            // checked={selectedCategories.includes("Electronics")}
                            />
                            <label htmlFor="electronics">Electronics</label>
                        </li>

                    </ul>

                </div>
                {/* <div className={style.scrollableContainer}> */}
                    <div className={style.homeRight}>
                        {
                            filteredItems.map((item, index) => (
                                <div className={style.itempro} key={`item-${index}`}>
                                    <img src={item.Image} alt={`Product: ${item.Title}`} style={{ height: 200, width: 197 }}></img>
                                    <h3>{item.Title}</h3>
                                    <h3>₹ {item.Price}</h3>
                                </div>
                            ))
                        }
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default Home;