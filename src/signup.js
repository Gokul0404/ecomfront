import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Captcha from 'react-google-recaptcha'
import axios from 'axios'
import { toast } from "react-toastify";
import Cookie from 'js-cookie';
export default function Signup() {
  
  const [captcha, setCaptcha] = useState(null)
  // const navigate = useNavigate()
  const initialstate = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [form, setForm] = useState(initialstate);


  const submit = async (e) => {
    e.preventDefault(false);
  
 
    
    {
      try {
        if (form.password < 6) {
          toast.error("password should be more than 6 char");
        } else if (form.password != form.cpassword) {
          toast.error("password donot match");
        } else if (!captcha) {
          toast.error("fill the capcha");
        } else {
          // await axios.post("http://localhost:5000/sign", {
          //   form,
         
          //   })
          await axios
            .post("https://ecomserver.vercel.app/sign", {
              form,
            })
            .then((res) => {
              if (res.data == "exist") {
                toast.error("email already exist");
              } else if ((res.data = "noexist")) {
                Cookie.set("email", form.email, { expires: 7 });
                toast.success("Successfuly rejesterd");
                setForm(initialstate);
              }
            });
          console.log("send data");
        }
      } catch (error) {
        console.log("not send data ", form);
      }
    }

   
}





  return (
    <div>
      <form  onSubmit={submit}>
        <section class="text-gray-600 body-font">
          <div class="container px-5 py-24  flex justify-center items-center">
            <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  w-full mt-10 md:mt-0">
              <h2 class="text-gray-900 text-[25px] font-[800]  title-font mb-5 text-center">
                SignUp
              </h2>
              <div class="relative mb-4">
                <label for="name" class="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]:e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
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
                    setForm({...form,[e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Confirm password
                </label>
                <input
                  required
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={form.cpassword}
                  onChange={(e) => {
                    setForm({...form,[e.target.name]:e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <Captcha
                sitekey="6LdQYPMlAAAAADTw20RR9s7Gqots9x_9xzM5ANsR"
                className="pb-5"
                onChange={(value) => { setCaptcha(value) }}
              />
              <input
                class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer"
                type="submit"
                value="Submit"
                
              />

              <p class="text-ms text-gray-500 mt-3">Already have a account</p>
              <p className=" text-gray-500 mt-3">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
