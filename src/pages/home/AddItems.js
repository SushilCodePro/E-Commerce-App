import { useState } from "react";
import { app } from '../../Firebase';
import { addDoc, collection, getFirestore } from "firebase/firestore";

function AddItems() {
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Title", Title);
    console.log("Image", Image);
    console.log("Price", Price);

    const db = getFirestore(app);
    const Ref = collection(db, 'items');

    try {
      // Use addDoc to add a new document to the 'post' collection
      const docRef = await addDoc(Ref, {
        Title,
        Image,
        Price,
        Category,
        CreatedAt: new Date(),
      });
      alert("Product added successfully");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // Clear the form fields after submission
    setTitle("");
    setImage("");
    setPrice("");
    setCategory("");
  }

  return (
    <div className="">
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label>Title</label>
          <input value={Title} onChange={(e) => {setTitle(e.target.value)}} />
        </div>
        <div className="">
          <label>Image</label>
          <input value={Image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="">
          <label>Price</label>
          <textarea value={Price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="">
          <label>Category</label>
          <textarea value={Category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button className="" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItems;
