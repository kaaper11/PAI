import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";



const LoginPage = () => {
    //backend
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password,
            })
            if(response.data.token){
                sessionStorage.setItem("token", response.data.token);
                navigate("/MainPage");
            }

        }catch(err){
            setError(err.response?.data?.message);
        }
    }



    //frontend
    const [focus, setFocus] = useState(false);
    const [focus2, setFocus2] = useState(false);
    const navigate = useNavigate();

    const changeFocus = () => setFocus(!focus);
    const changeFocus2 = () => setFocus2(!focus2);

    const toRegister = () => {navigate("/RegisterPage")};


    return (

        <div className="flex bg-white min-h-screen justify-center items-center">
            <script src="https://accounts.google.com/gsi/client" async defer></script>

            <img className={"relative w-full h-screen"} src={"./public/background.jpg"} alt="background.jpg" />
            <div className={"absolute flex justify-center w-full pt-0 md:pt-1"}>
                <div className={"grid grid-cols-[60%_40%] w-full max-w-6xl mx-auto shadow-0 md:shadow-2xl"}>
                    <div className={"hidden md:flex justify-between bg-blue-300  p-10 "}>
                        <div className={"grid grid-rows-3"}>
                            <div className={"h-45 flex items-center "}>
                                <img src={"./public/vite.svg"} alt="Vite" />
                            </div>
                            <div>
                                <p className="text-6xl text-white">
                                    Hello my dear on <br/>
                                    <p className={"font-bold"}>PAI APP!</p>
                                </p>
                            </div>
                            <div>
                                <p className={"text-2xl text-white "}>
                                    Lorem Ipsum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-center bg-white w-screen h-screen py-30 md:w-full md:h-full md:py-0"}>
                        <form>
                            <div className={"flex justify-center items-center"}>
                                <div className={"flex flex-col pt-20  md:pt-40  gap-3 "}>
                                    <div className={"flex relative "}>
                                        <input required value={email} onChange={(e) => setEmail(e.target.value)}
                                               type={"email"} onFocus={changeFocus} onBlur={changeFocus}
                                               className={"px-7 border border-3 rounded-sm border-blue-300 h-15 w-80 bg-white text-blue-300 focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-blue-300 font-bold"}>Email</label>
                                        <div
                                            className={focus ? "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-blue-300" : "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-r-0 border-blue-300"}></div>
                                    </div>
                                    <div className={"flex relative"}>
                                        <input required value={password} onChange={(e) => setPassword(e.target.value)}
                                               type={"password"} onFocus={changeFocus2} onBlur={changeFocus2}
                                               className={"px-7 border border-3 rounded-sm border-blue-300 h-15 w-80 bg-white text-blue-300 focus:outline-none focus:shadow-md"}/>
                                        <label className={"absolute px-7.5 text-blue-300 font-bold"}>Password</label>
                                        <div
                                            className={focus2 ? "absolute bg-blue-300 h-15 w-5 rounded-l-sm border-3 border-blue-300" : "absolute bg-white h-15 w-5 rounded-l-sm border-3 border-r-0 border-blue-300"}></div>
                                    </div>
                                    <div className={"flex items-center justify-center gap-3 py-10"}>
                                        <button type={"button"} onClick={handleLogin}
                                                className={"h-10 w-30 bg-blue-300 rounded-sm text-white hover:cursor-pointer font-bold hover:bg-white hover:border-3 hover:border-blue-300 hover:text-blue-300"}>Login
                                        </button>
                                        <button onClick={toRegister}
                                                className={"h-10 w-30 border-3 border-blue-300 text-blue-300 font-bold hover:cursor-pointer rounded-sm hover:bg-linear-50 from-blue-300 to-blue-500 hover:text-white hover:border-0"}>Sign
                                            up
                                        </button>
                                    </div>
                                    <div className={"flex justify-center items-center gap-3"}>
                                        <button
                                            className={"border-3 border-blue-300 h-[50px] rounded-4xl w-[50px] hover:cursor-pointer "}
                                            onClick={() => window.location.href = "http://localhost:5000/api/google"}>
                                            <img src={"./public/google.png"} alt="google"/>
                                        </button>
                                        <button
                                            className={"border-3 border-blue-300 h-[50px] rounded-4xl w-[50px] hover:cursor-pointer flex items-center justify-center "}>
                                            <img className={"h-[25px] w-[25px]"} src={"./public/fb.png"}
                                                 alt="facebook"/>
                                        </button>
                                    </div>
                                    <div className={"flex justify-center items-center h-0"}>
                                        {error && <p className={"text-red-400 font-bold"}>{(error)}</p>}
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

export default LoginPage;