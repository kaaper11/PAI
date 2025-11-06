import React, {useEffect, useState} from "react";
import api from "../api";



const AddCategoryPage = () => {
    const token = sessionStorage.getItem("token");
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [adults, setAdults] = useState("");
    const [underCategory, setUnderCategory] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleCategories = async () => {
        try{
            if(token){
                const response = await api.get('/cat/nameCategory', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setCategory(response.data);
            }

        }catch(err){
            console.log(err);
        }
    }

    const handelAddCategory = async (e) => {
        e.preventDefault();

        const payload = { name };

        if (adults) {
            payload.parentId = adults;
        }

        try{
            if(token){
                const response = await api.post('/cat/category', payload,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
            setSuccess(true);

        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {
        handleCategories();
    },[]);


    return (
        <div className={"flex flex-col justify-center items-center bg-gray-300"}>
            <p className={"text-white text-7xl font-bold text-center"} >Add category to database</p>
            <form className={"py-10 flex flex-col justify-center items-center gap-5"} onSubmit={handelAddCategory}>
                <input className={"border-2 bg-white border-blue-300 rounded-sm h-8 w-70 px-3 text-blue-300"}
                    value={name} onChange={(e) => setName(e.target.value)} placeholder={"Category name"}/>
                <div className={"flex flex-row justify-center items-center gap-5"}>
                    <input type={"checkbox"} checked={underCategory} onChange={(e) => setUnderCategory(e.target.checked)}/>
                    <select className={"cursor-pointer border-2 border-blue-300 bg-white rounded-sm text-blue-300"} disabled={!underCategory} value={adults} onChange={(e) => setAdults(e.target.value)}>
                        <option>Select adult category</option>
                        {category.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button className={"cursor-pointer border-2 rounded-sm h-8 w-30 bg-white border-blue-300 hover:bg-blue-300 text-blue-300 hover:text-white text-md"}>
                    Add Category
                </button>
                {success && (<p className={"font-bold text-green-700 text-xl"}>Category added</p>)}
            </form>

        </div>
    )
}

export default AddCategoryPage;