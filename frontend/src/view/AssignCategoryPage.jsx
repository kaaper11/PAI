import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api";


const AssignCategoryPage = () => {
    const token = sessionStorage.getItem("token");
    const [mods, setMods] = useState([]);
    const [category, setCategory] = useState([]);
    const [catId, setCatId] = useState("");
    const [modId, setModId] = useState("");
    const [success, setSuccess] = useState(false);


    const handleMod = async () => {
        try {
            if (token) {
                const response = await api.get("http://localhost:5000/api/admin/modName", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }, {})
                setMods(response.data);

            }
        }catch {
            console.log("Error creating Moderator Page");
        }
    }

    const handleCat = async () => {
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

    const handleAssign = async () => {
        try{
            if(token){
                setSuccess(true);
                const response = await api.put('/cat/assignCategory', {
                    catId,
                    modId
                },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        console.log(success);
        handleMod();
        handleCat();
    },[])


    return (
        <div className={"flex flex-col  items-center bg-gray-300 h-screen py-20  text-center gap-10"}>
            <p className={"text-white font-bold text-6xl"}>Assign category to moderators</p>
            <div className={"flex justify-center items-center flex-row gap-5"}>
                <select value={modId} onChange={(e) => setModId(e.target.value)} className="w-50 border-2 border-[var(--color-primary)] bg-[var(--color-accent)] text-[var(--color-primary)] rounded-sm h-10"  >
                    <option value="">Select a Moderator</option>
                    {mods.map((mod) => (
                            <option value={mod._id} key={mod._id}>{mod.firstName}</option>
                    ))}
                </select>

                <select value={catId} onChange={(e) => setCatId(e.target.value)} className={"w-50 border-2 border-blue-300 bg-white text-blue-300 rounded-sm h-10"}>
                    <option value="">Select a Category</option>
                    {category
                        .filter(cat => cat.parentId == null)
                        .map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={handleAssign} className={"flex justify-center items-center border-2 border-[var(--color-primary)] rounded-sm h-10 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-sm h-10 w-60 cursor-pointer"} >
                Add category to moderator
            </button>
            {success && (<p className={"text-[var(--color-shadow)]"}>Category assign.</p>)}

        </div>
    )
}

export default AssignCategoryPage;