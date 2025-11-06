import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const AddProductPage = () => {
    const [cat, setCat] = useState([]);
    const token = sessionStorage.getItem("token");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const [oneCategory, setOneCategory] = useState("");


    const handleCat = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/cat/catToModify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            setCat(response.data.categories || response.data);


        }catch(err){
            setError(err)
        }
    }
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            if (token) {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("category", oneCategory);

                // dodajemy zdjęcia do formData
                for (let i = 0; i < images.length; i++) {
                    formData.append("images", images[i]);
                }

                const response = await axios.post(
                    "http://localhost:5000/api/products/addProduct",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setSuccess(true);
            }
        } catch (err) {
            setError(err);
        }
    };


    useEffect(() => {
        handleCat()
    },[])

    return (
        <div className={"flex flex-col text-center items-center bg-[var(--color-secondary)] h-screen "}>
            <p className={"text-7xl text-[var(--color-accent)] font-bold py-10"}>Add new product</p>
            <form className={"grid grid-rows-2 gap-3 "}>
                <div className={"grid grid-cols-2 gap-2 "}>
                    <label className={"font-bold text-xl text-[var(--color-accent)]"}>Product name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type={"text"} className={"h-10 bg-[var(--color-accent)] rounded-sm border-2 border-[var(--color-primary)] text-[var(--color-primary)]"} />
                </div>
                <div className={"grid grid-cols-2 gap-2 "}>
                    <label className={"font-bold text-xl text-[var(--color-accent)]"}>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={" bg-[var(--color-accent)] rounded-sm border-2 border-[var(--color-primary)] text-[var(--color-primary)]"}></textarea>
                </div>
                <div className={"grid grid-cols-2 gap-2 "}>
                    <label className={"font-bold text-xl text-[var(--color-accent)]"}>Price:</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type={"number"} className={"bg-[var(--color-accent)] rounded-sm border-2 border-[var(--color-primary)] text-[var(--color-primary)]"}/>
                </div>
                <div className={"grid grid-cols-2 gap-2 place-items-center "}>
                    <label className={"font-bold text-xl text-[var(--color-accent)]"}>Images:</label>
                    <label className={"bg-[var(--color-accent)] rounded-sm border-2 border-[var(--color-primary)] text-[var(--color-primary)] w-30 cursor-pointer"}>
                        Click to add photos
                        <input
                            onChange={(e) => {
                                setImages(e.target.files);
                            }}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                        />

                    </label>
                </div>
                <div className={"grid grid-cols-2 gap-2 place-items-center "}>
                    <label className={"font-bold text-xl text-[var(--color-accent)]"}>Category: </label>
                    <select value={oneCategory} onChange={(e) => setOneCategory(e.target.value)} className={"bg-[var(--color-accent)] rounded-sm border-2 border-[var(--color-primary)] text-[var(--color-primary)] w-30 cursor-pointer"}>
                        <option>Choose category</option>
                        {cat.map(a => (
                            <option key={a._id} value={a._id}>{a.name}</option>
                        ))}
                    </select>
                </div>
            </form>
            <button onClick={handleAddProduct} className={"flex justify-center my-10  items-center bg-[var(--color-accent)] rounded-sm border-2 border-[var(--color-primary)] text-[var(--color-primary)] w-30 cursor-pointer"}>
                Add
            </button>
            {success && (<p className={"text-[var(--color-shadow)] text-xl"}>Product added</p>)}
        </div>
    )
}
export default AddProductPage;