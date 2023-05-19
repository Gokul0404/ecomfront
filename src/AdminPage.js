import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AdminPage({ getvalue }) {  //getvalue adminmain page la irunthu trigger aguthu
  const initicial = {
    name: "",
    type: "",
    price: "",
    offer:"",
    stocks: "",
  };
  const [form, setForm] = useState(initicial);

  const [image, setImage] = useState("");
  const [allimage, setAllimage] = useState([]);

  const imageChange = (e) => {
    setImage(e.target.value);
  };
  const imageSubmit = (e) => {
    if (image == "") {
      toast.error("image url cannot be empty");
    } else if (allimage.length >= 6) {
      toast.error("max 6 images are allowed");
    } else {
      setAllimage([image, ...allimage]);
      setImage("");
    }
  };

  const cliked = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/adminupdate", {
          form,
          allimage,
     })
        .then((res) => {
          if (res.data == "pass") {
            toast.success("succesfuly added");
            setForm(initicial);
            setAllimage([]);
            
            getvalue() //adminmain page la irunthu inga trigger agum
          } else {
            toast.error("sometimes went wrong");
          }
        })
        .catch((err) => {
          toast.error("something went wrong data not send");
          console.log(err);
        });
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  const handleDelete = (index) => {
    const newMessages = [...allimage];

    newMessages.splice(index, 1);

    setAllimage(newMessages);
  };

  return (
    <div className="scale-[90%]">
      <h1 className="text-center font-bold  text-[25px] pb-5">
        {" "}
        Add a product
      </h1>

      <form onSubmit={cliked} className="flex justify-center ">
        <section class="text-gray-600 body-font  ">
          <div class="container  flex justify-center items-center ">
            <div class=" bg-gray-100 rounded-lg  flex flex-col  w-full  md:mt-0 p-5">
              {/* <h2 class="text-gray-900 text-[25px] font-[800]  title-font mb-5 text-center">
                Add a product
              </h2> */}

              <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Name of the Product
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  product Type
                </label>
                <input
                  required
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  Price
                </label>
                <input
                  required
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">
                  offer
                </label>
                <input
                  required
                  type="text"
                  name="offer"
                  value={form.offer}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Number of Stocks
                </label>
                <input
                  required
                  type="number"
                  name="stocks"
                  value={form.stocks}
                  onChange={(e) => {
                    setForm({ ...form, [e.target.name]: e.target.value });
                  }}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div class="relative mb-4">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Image Url
                </label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  onChange={imageChange}
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <input
                class="text-white bg-indigo-500 border-0 py-2 cursor-pointer px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg "
                onClick={imageSubmit}
                value={"Add Image"}
                type="button"
              />
              {/* Submit
              </input> */}

              <br />
              <div className="w-[20vw]">
                {allimage.map((msg, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[21.5vw] flex justify-between py-2"
                    >
                      <p className="!w-[18vw] overflow-hidden">{msg}</p>
                      <button
                        type="button"
                        className=""
                        onClick={() => handleDelete(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="" />
                      </button>

                      <br />
                      <br />
                    </div>
                  );
                })}
              </div>

              <input
                class="text-white bg-indigo-500 cursor-pointer border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg "
                type="submit"
                value={"Submit"}
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
