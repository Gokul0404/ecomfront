import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Captcha from "react-google-recaptcha";
import { toast } from "react-toastify";
import axios from "axios";
import Cookie from 'js-cookie'


//auth

import { signInWithPopup} from 'firebase/auth'
import { auth,provider } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "./redux/reducer";
import Cookies from "js-cookie";
export default function Login() {
  //auth finaly get the values in user......auth final work.......
  // const user = useSelector((state) => state.user.value);
  //auth finaly get the values in user......auth final work.......

  const [captcha, setCaptcha] = useState(null);
  const initialstate = {
    email: "",
    password: "",
  };
  const [form, setform] = useState(initialstate);
console.log(form);
  //authendication login..................................store, reducer,index-provider, myaccount

  // const dispatch = useDispatch();
  
  // const handlelogin = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       dispatch(changeUser(result._tokenResponse));
  //       Cookie.set("email", result._tokenResponse.email, { expires: 7 });
  //       // console.log(result._tokenResponse.email);
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });
  // };


const [value,setValue]=useState('')
  const handlelogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email)
      // localStorage.setItem("email", data.user.email)
      Cookie.set("email", data.user.email);
      Cookie.set("name", data.user.displayName);
      console.log("ewfwfwefwfwfwfwfwf", data);
    
    })
  }

 
  //authendication login...................................

  const cliked = async (e) => {
    e.preventDefault();
    try {

      
      if (!captcha) {
        toast.error("fill the captcha");
      } else {
        // await axios
        //   .post("http://localhost:5000/login", {
        //     form,
        //   })
        await axios
          .post("https://ecomserver.vercel.app/login", {
            form,
          })
          .then((res) => {
            if (res.data == "loginpass") {
              Cookie.set("email", form.email, { expires: 7 });

              toast.success("succesfuly login");
            } else if (res.data == "nouser") {
              toast.error("this email is not rejestered");
            } else if (res.data == "loginfail") {
              toast.error("Invalid Password");
            } else if (res.data == "fail") {
              toast.error("sometimes went wrong");
            }
            setform(initialstate);
          })
          .catch((err) => {
            toast.error("something went wrong data not send");
            console.log(err);
          });
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[26%] h-fit py-5 my-10 bg-gray-100 rounded-lg px-8">
        <form onSubmit={cliked}>
          <section class="text-gray-600 body-font ">
            <div class="container  flex justify-center items-center">
              <div class=" bg-gray-100 rounded-lg  flex flex-col  w-full  md:mt-0">
                <h2 class="text-gray-900 text-[25px] font-[800]  title-font mb-5 text-center">
                  Login
                </h2>

                <div class="relative mb-4">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => {
                      setform({ ...form, [e.target.name]: e.target.value });
                    }}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div class="relative mb-4">
                  <label
                    for="full-name"
                    class="leading-7 text-sm text-gray-600"
                  >
                    password
                  </label>
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={(e) => {
                      setform({ ...form, [e.target.name]: e.target.value });
                    }}
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <Captcha
                    sitekey = "6Le6xCAmAAAAAOwOjawHOZPdJK4MA7Ku9LS7D6pT"
                  // sitekey="6LdQYPMlAAAAADTw20RR9s7Gqots9x_9xzM5ANsR"
                  className="pb-5"
                  onChange={(value) => setCaptcha(value)}
                />
                <input
                  class="text-white bg-indigo-500 border-0 cursor-pointer py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg "
                  type="submit"
                  value="Submit"
                />
              </div>
            </div>
          </section>
        </form>
        <p className="text-center">OR</p>
        <button
          className="bg-green-400 w-[100%] p-2 rounded-[5px] cursor-pointer"
          onClick={handlelogin}
        >
          Google
        </button>
        <p class="text-ms text-gray-500 mt-3">Do you have a account</p>
        <p className=" text-gray-500 mt-3 flex flex-col ">
          <Link to="/forgot" className="hover:text-red-600">
            Forgot Password
          </Link>
          <Link to="/signup" className="hover:text-blue-600">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
}
