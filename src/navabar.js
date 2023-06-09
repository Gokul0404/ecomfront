import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { cleardata } from "./redexcart/Slice";
export default function Home() {

  const dispatch=useDispatch()
  const ids = Cookies.get("ids");
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [pic, setPic] = useState(false);
  const cookieval = Cookies.get("email");
const navigate=useNavigate()
  const logout = () => {
    Cookies.remove("email");
    Cookies.remove("ids");
    Cookies.remove("name");
    localStorage.removeItem("cartitem");
    dispatch(cleardata());
    navigate('/login')
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="  px-10 sm:px-6 ">
          <div className="relative flex h-16 items-center ">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start  ">
              <div className="flex flex-shrink-0 items-center ">
                <img
                  className="block h-8 w-auto lg:hidden cursor-pointer"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <Link to="/">
                  <img
                    className="hidden h-8 w-auto lg:block cursor-pointer"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    <Link to="/login"> Dashboard</Link>
                  </a>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                    <Link to="/food"> Products</Link>
                  </p>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Cart
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
              <button
                type="button"
                className="rounded-full bg-gray-800 p-1 flex text-gray-400 "
              >
                <span className="sr-only ">View notifications</span>
                <Link to="/cart" className="relative">
                  <IoCartOutline className="text-[25px] mr-10 hover:text-white" />
                  <p className="absolute bg-red-600 rounded-full w-5 text-[12px] top-[-8px] left-4 text-white">
                    {/* {cart.cartItems.length} */}

                    {
                      cart.cartItems.filter((data) => {
                        return data.iduser === ids;
                      }).length
                    }
                  </p>
                </Link>
                <svg
                  className="h-6 w-6 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div
                className="relative ml-3 "
                onMouseLeave={() => setPic(false)}
              >
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      onClick={() => setPic(!pic)}
                      className="h-8 w-8 rounded-full"
                      src="https://w7.pngwing.com/pngs/358/473/png-transparent-computer-icons-user-profile-person-child-heroes-public-relations.png"
                      alt="ed4rf"
                    />
                  </button>
                </div>
                <div
                  className={` ${
                    pic ? " block " : "hidden"
                  } absolute  right-6 z-10  w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>

                  {cookieval != undefined ? (
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-2"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  ) : (
                    <p
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-2"
                    >
                      <Link to="/login">Account/Login</Link>
                    </p>
                  )}
                </div>
                <div className="sm:hidden hidden" id="mobile-menu">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    <a
                      href="#"
                      className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                      <Link to="/soona"> Team</Link>
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-green-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                      Users
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden " id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Users
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
