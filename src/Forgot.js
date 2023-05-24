import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Captcha from "react-google-recaptcha";
import { toast } from "react-toastify";
import axios from "axios";
import cookie from 'js-cookie'
import { VscChromeClose } from "react-icons/vsc";
import LoadingBar from "react-top-loading-bar";

export default function Login() {


  const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [captcha, setCaptcha] = useState(null);
    
  const [otp, setOtp] = useState('');
  const [otpvalue, setOtpvalue] = useState('');
  const [popup, setPopup] = useState(false)
  const[loadprogress, setLoadprogress]=useState(0)
const digits='0123456789'

    


  const cliked = async (e) => {
    setLoadprogress(20)
    e.preventDefault();
    try {
      if (!captcha) {
        toast.error("fill the captcha");
      } else {
          
          
          //OTP generate
         //-----------------------start----------------// 
          let OTP = '';
          for (let i = 0; i < 6; i++){
              OTP+=digits[Math.floor(Math.random()*10)]
          }
          
        setOtp(OTP)
        setLoadprogress(50)
          //------end----------------//




        await axios
          .post("http://localhost:5000/sendemail", {
            email,
            OTP
          })
        // await axios
        //   .post("https://ecomserver.vercel.app/sendemail", {
        //     email,
        //     OTP,
        //   })
          .then((res) => {
            if (res.data == "pass") {
              console.log(email);
              toast.success("succes");
              setPopup(true);
            } else if (res.data == "notexist") {
              toast.error("user not found! please sign up");
            } else if (res.data == "fail") {
              toast.error("something went wrong");
            }
          })
          .catch((e) => {
            toast.error("something went wrong");
          });
        setLoadprogress(70)
      }
    } catch (e) {
        toast.error("something went wrong");
      console.log(e);
    }
    setLoadprogress(100)
    }

  
  
  const otpCheck = () => {
    if (otp != otpvalue) {
      toast.error(' Invalid Code')
    } else {
      cookie.set('resetEmail', email)
      navigate('/rpass') //resetpassword
    }
  }
  


  
  return (
    <div>
      <LoadingBar
        color="red"
        loadprogress={loadprogress}
        onLoaderFinished={() => setLoadprogress(0)}
      />
      {popup && (
        <div className="z-20 fixed top-0 left-0 right-0 bottom-0  bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-xl relative">
         <VscChromeClose className="absolute right-5 hover:text-red-600 cursor-pointer" onClick={(e)=>setPopup(false)}/>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Enter Code</h2>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                maxLength="6"
                value={otpvalue}
                onChange={(e) => setOtpvalue(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 w-full text-center text-lg font-semibold"
              />
            </div>
            <p className="text-md mt-4">
              Enter the 6-digit code sent to your Email.
            </p>
            <button
              onClick={otpCheck}
              className="mt-3 cursor-pointer text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <form onSubmit={cliked}>
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24  flex justify-center items-center">
            <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0">
              <h2 class="text-gray-900 text-[25px] font-[800]  title-font mb-5 text-center">
                Forgot Password
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <Captcha
                sitekey="6LdQYPMlAAAAADTw20RR9s7Gqots9x_9xzM5ANsR"
                className="pb-5"
                onChange={(value) => setCaptcha(value)}
              />
              <input
                class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer "
                type="submit"
                value="Submit"
              />

              <p className=" text-gray-500 mt-3 flex flex-col ">
                <Link to="/Login" className="hover:text-blue-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
