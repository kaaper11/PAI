import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


const AdminPage = () => {

    const navigate = useNavigate();

    const handlePhotos = () => {
        navigate("/AddPhotosPage");
    }
    const handleCategory = () => {
        navigate("/AddCategoryPage");
    }
    const handleAssign = () => {
        navigate("/AssignCategoryPage");
    }


    return (
        <div className={"flex justify-center items-center bg-gray-300 h-screen"}>
            <div className={"flex flex-col justify-center items-center gap-2 "}>
                <p className={"font-bold text-7xl text-white py-5 text-center"} >Welcome in admin panel</p>
                <div onClick={handlePhotos} className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Add image to database</p>
                </div>
                <div className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Change carousel settings</p>
                </div>
                <div onClick={handleCategory} className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Add category</p>
                </div>
                <div onClick={handleAssign} className={"flex justify-center items-center bg-white w-full rounded-lg h-20 hover:shadow-2xl cursor-pointer"}>
                    <p className={"font-bold text-3xl text-blue-300"}>Assign categories</p>
                </div>
            </div>
        </div>
    )

}
export default AdminPage;