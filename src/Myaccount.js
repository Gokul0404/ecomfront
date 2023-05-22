import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase/firebase';
// import { useSelector } from 'react-redux';



export default function Myaccount() {

  
// const user=useSelector((state)=>state.user.value)

  const cookieval = Cookie.get('email')
  const cookieval1 = Cookie.get('name')

  
 
  const [name, setname] = useState('')
  
  const logout = () => {
  Cookie.remove("email")
  Cookie.remove("name");
}

  
  
  const submit = async (e) => {
   
    try {
      // await axios
      //   .post("http://localhost:5000/myaccount", {
      //     cookieval
      //   })
      await axios
        .post("https://ecomserver.vercel.app/myaccount", {
          cookieval,
        })
        .then((res) => {
          setname(res.data);
          console.log(res);
        })
        .catch((e) => {
          // toast.error("not find name")
        });
    } catch (error) {
      toast.error('something went wrong!')
    }
  }
  useEffect(() => {
    submit();
  });

  // console.log(user.fullName)
  
  return (
    <div>
      <section className="text-gray-600 grid place-items-center my-6">
        <h1 className="sm:text-4xl text-3xl mb-4 font-medium text-gray-950">
          Hello {cookieval1 !== undefined ?  cookieval1  :  name }
        </h1>

        <p className="mb-8">Your Email ID:{cookieval}</p>
        <div className="p-4 w-full flex flex-wrap gap-x-5 justify-center">
          <Link
            to="/order"
            className="cursor-pointer w-[15%] m04 hover:shadow-lg border-2 text-center"
          >
            <FontAwesomeIcon icon={faBox} className="text-[50px] pt-2" />

            <h2 className="title-font font-medium text-lg lg:text-xl p-2 text-gray-900">
              Your Orders
            </h2>
          </Link>

          <Link
            to="/order"
            className="cursor-pointer w-[15%] m04 hover:shadow-lg border-2 text-center"
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-[50px] pt-2"
            />

            <h2 className="title-font font-medium text-lg lg:text-xl p-2 text-gray-900">
              Your Cart
            </h2>
          </Link>
        </div>

        <button
          onClick={logout}
          className="ml-4 text-gray-300 border-0 bg-gray-500 px-5 py-1 rounded-2xl hover:shadow-lg"
        >
          Log Out
        </button>
      </section>
    </div>
  );
}
