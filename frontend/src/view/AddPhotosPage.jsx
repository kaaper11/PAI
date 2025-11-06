import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../api";

const AddPhotosPage = () => {

    const [photo, setPhoto] = useState(null);
    const token = sessionStorage.getItem("token");
    const [success, setSuccess] = useState("");


    const handleSave = async () => {
        try{
            if(token){
            const response = await api.post("http://localhost:5000/api/photos/addphoto", {
                path: photo
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                setSuccess("Photos added!")
        }
        }catch(err){
            console.log(err);
        }
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    }

    return(
        <div className={"relative flex flex-col  items-center bg-gray-300 "}>
            <p className={"text-6xl font-bold text-white py-10"}>Add photos</p>
            <label className={"cursor-pointer bg-white hover:bg-blue-300 hover:text-white border-2 border-blue-300 text-blue-300 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"}>
                Add photo
                <input type={"file"} accept={"image/*"} onChange={handlePhoto} className={"hidden "}/>
            </label>
            {photo && <img src={photo} alt="photo" className="mt-5 max-w-sm border-2 border-white rounded-lg" />}
            <button onClick={handleSave} className={"mt-5 cursor-pointer bg-white hover:bg-blue-300 hover:text-white border-2 border-blue-300 text-blue-300 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"}>
                Save
            </button>
            {success && <p className={"text-green-700 font-bold text-xl"}>{success}</p>}
        </div>
    )
}
export default AddPhotosPage;
