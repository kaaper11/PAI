import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    //backend

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", {
                email,
                password,
                firstName,
                lastName,
                phoneNumber
            })
            navigate("/");
        }catch(error){
            setError(error.response?.data?.message);
        }
    }

    //frontend
    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const [focus3, setFocus3] = useState(false);
    const [focus4, setFocus4] = useState(false);
    const [focus5, setFocus5] = useState(false);

    const navigate = useNavigate();

    const changeFocus = () => setFocus(!focus);
    const changeFocus2 = () => setFocus2(!focus2);
    const changeFocus3 = () => setFocus3(!focus3);
    const changeFocus4 = () => setFocus4(!focus4);
    const changeFocus5 = () => setFocus5(!focus5);

    return (
        <div className="flex  min-h-screen justify-center items-center">

            <img className={"relative w-full h-screen"} src={"./public/background.jpg"} alt="background.jpg" />
            <div className={"absolute  flex justify-center w-full pt-0 md:pt-1"}>
                <div className={"grid grid-cols-[60%_40%] w-full max-w-6xl mx-auto shadow-0 md:shadow-2xl"}>
                    <div className={"hidden md:flex justify-between bg-white  p-10 "}>
                        <div className={"grid grid-rows-3"}>
                            <div className={"h-45 flex items-center "}>
                                <img src={"./public/vite.svg"} alt="Vite" />
                            </div>
                            <div>
                                <p className="text-6xl text-blue-300">
                                    Hello my dear on <br/>
                                    <p className={"font-bold"}>PAI APP!</p>
                                </p>
                            </div>
                            <div>
                                <p className={"text-2xl text-blue-300 "}>
                                   Lorem Ipsum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-center bg-blue-300 w-screen min-h-[100dvh]  pt-25 md:min-h-0 md:w-full md:h-full md:py-0"}>
                        <form onSubmit={handleRegister}>
                            <div className={"flex justify-center items-center"}>
                                <div className={"flex flex-col pt-0  md:pt-30 gap-3 "}>
                                    <div className={"flex relative "}>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} onFocus={changeFocus} onBlur={changeFocus} type={"email"} required  className={"px-7 border border-3 rounded-sm border-white h-15 w-80 bg-blue-300 text-white focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-white font-bold"}>Email</label>
                                        <div className={focus ? "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-white" : "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-r-0 border-white"}></div>

                                    </div>
                                    <div className={"flex relative"}>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} onFocus={changeFocus2} onBlur={changeFocus2} type={"password"} required  className={"px-7 border border-3 rounded-sm border-white h-15 w-80 bg-blue-300 text-white focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-white font-bold"}>Password</label>
                                        <div className={focus2 ? "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-white" : "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-r-0 border-white"}></div>

                                    </div>
                                    <div className={"flex relative"}>
                                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={changeFocus3} onBlur={changeFocus3} type={"text"} required  className={"px-7 border border-3 rounded-sm border-white h-15 w-80 bg-blue-300 text-white focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-white font-bold"}>First Name</label>
                                        <div className={focus3 ? "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-white" : "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-r-0 border-white"}></div>
                                    </div>
                                    <div className={"flex relative"}>
                                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={changeFocus4} onBlur={changeFocus4} type={"text"} required  className={"px-7 border border-3 rounded-sm border-white h-15 w-80 bg-blue-300 text-white focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-white font-bold"}>Last Name</label>
                                        <div className={focus4 ? "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-white" : "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-r-0 border-white"}></div>
                                    </div>
                                    <div className={"flex relative"}>
                                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onFocus={changeFocus5} onBlur={changeFocus5} required type={"number"}  className={"px-7 border border-3 rounded-sm border-white h-15 w-80 bg-blue-300 text-white focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-white font-bold"}>Phone number</label>
                                        <div className={focus5 ? "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-white" : "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-r-0 border-white"}></div>
                                    </div>
                                    <div  className={"flex items-center justify-center gap-3 py-5"}>
                                        <button type={"submit"} className={"h-10 w-30 bg-white rounded-sm text-blue-300 hover:cursor-pointer font-bold hover:bg-blue-300 hover:border-3 hover:border-white hover:text-white"}>Sign up</button>
                                    </div>

                                    <div className={"flex justify-center items-center h-0"}>
                                        {error && <p className={"text-red-400 font-bold"} >{(error)}</p>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage;