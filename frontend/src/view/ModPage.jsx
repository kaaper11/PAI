import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ModPage = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate("/AddProductPage");
    }
    return (
        <div className={"flex justify-center items-center bg-gray-300 h-screen"}>
            <div className={"flex flex-col justify-center items-center gap-2 "}>
                <p className={"font-bold text-7xl text-white py-5 text-center"} >Welcome in modarate panel</p>
                <div onClick={handleAddProduct}  className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Add new product</p>
                </div>
                <div className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Change carousel settings</p>
                </div>
                <div  className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Add category</p>
                </div>
                <div  className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Assign categories</p>
                </div>
            </div>
        </div>
    )
}

export default ModPage;