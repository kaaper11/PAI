import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";



const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(0);
    const [one, setOne] = useState(1);
    const [two, setTwo] = useState(2);
    const [three, setThree] = useState(3);
    const query = new URLSearchParams(location.search).get("id");
    const token = sessionStorage.getItem("token");

    const handleProduct = async () => {
        try{
            if(token){
                const response = await axios.get(`http://localhost:5000/api/products/oneproduct?id=${encodeURIComponent(query)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(query)
                setProduct(response.data);
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        handleProduct();
    },[])


    if (!product) {
        return <p>Loading product...</p>;
    }

    const handleChange1 = () => {
        setCount(one)
        setOne(count)
    }
    const handleChange2 = () => {
        setCount(two)
        setTwo(count)
    }
    const handleChange3 = () => {
        setCount(three)
        setThree(count)
    }

    return(
        <div className={"flex items-center"}>
            <div className={"flex flex-col md:grid grid-cols-2  w-400 py-10 md:mx-60"}>
                    <div className={"grid grid-rows-2 gap-3"} >
                        <img className={"w-full aspect-[4/3] object-cover rounded-md"} src={`http://localhost:5000/uploads/${product.images[count]}`} alt="product"/>
                        <div className={"grid grid-cols-3 gap-2 "} >
                            {product.images?.length > 1 ?
                                <img onClick={handleChange1} className={"h-35 rounded-md cursor-pointer "} src={`http://localhost:5000/uploads/${product.images[one]}`} alt="product"/>: null}
                            {product.images?.length > 2 ?
                                <img onClick={handleChange2} className={"h-35 rounded-md cursor-pointer "} src={`http://localhost:5000/uploads/${product.images[two]}`} alt="product"/>: null}
                            {product.images?.length > 4 ?
                                <img onClick={handleChange3} className={"h-35 rounded-md cursor-pointer "} src={`http://localhost:5000/uploads/${product.images[three]}`} alt="product"/>: null}
                        </div>
                    </div>
                <div className={"grid grid-rows-[150px_150px_150px] gap-2 "} >
                    <p className={"text-4xl text-blue-300 font-bold text-center md:py-10"}>{product.name}</p>
                    <p>{product.price}</p>
                    <p>{product.category}</p>
                </div>
            </div>

        </div>
    )
}

export default ProductPage;