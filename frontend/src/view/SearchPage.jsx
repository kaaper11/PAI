import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
    const token = sessionStorage.getItem("token");
    const query = new URLSearchParams(location.search).get("name");
    const [other, setOther] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    const handleData = async () => {
        try{
            if(token){
                const response = await axios.get(`http://localhost:5000/api/products/searchproduct?name=${encodeURIComponent(query)}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setProducts(response.data);
            }
        }catch(err){
            console.log(err);
        }
    }
    const handleGo = (id) => {
        navigate(`/ProductPage?id=${encodeURIComponent(id)}`);
    }

    useEffect(() => {
        handleData();
    },[])



    return (

        <div className={"bg-gray-300 h-screen"}>
            <div  className={"grid grid-cols-1 md:grid-rows-2 lg:grid-cols-3 gap-4 md:mx-50 py-10"}>
                {products.map((product) => (
                    <div onClick={() => handleGo(product._id)}  className={"flex flex-col items-center bg-white shadow-2xl rounded-md cursor-pointer"}>
                        <img src={`http://localhost:5000/uploads/${product.images[0]}`} className={'h-75 w-90 pt-5'} alt={product.name} />
                        <p className={"text-xl font-bold text-blue-300 py-2 px-5"}>{product.name}</p>
                        <p className={"text-blue-300 px-5 line-clamp-2 pb-1"}>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchPage;