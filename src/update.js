import React, { useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
export default function Update({ setUpopen, singledata, updateda, getvalue }) {
  // const[open, setOpen]=useState(!false)

  const [field, setField] = useState({
    name: updateda.name,
    type: updateda.type,
    price: updateda.price,
    offer: updateda.offer,
    stocks: updateda.stocks,
    img: updateda.img,
  });

  const updateddata = async (id) => {
    console.log(id._id, "shdjj");
    console.log(field);
    try {
      await axios.patch(`http://localhost:5000/upadte/${id._id} `, field);
        console.log("Successfuly Updated");
        getvalue()
    } catch (error) {
      console.log("updated fail");
      console.log(error);
    }
  };

  console.log(updateda);

  return (
    <div>
      <Modal
        centered
        open={true}
        width={1000}
        footer={null}
        onOk={() => setUpopen(false)}
        onCancel={() => setUpopen(false)}
      >
        <div>
          <h2 className="font-[800] text-[20px]">Update</h2>
        </div>
        <form className="grid grid-cols-2 gap-x-5 pt-5">
          <div className=" gap-y-5">
            <div className="flex justify-between my-3">
              <label className="font-bold text-[14.5px]">
                Name of the Product
              </label>
              <input
                name="name"
                value={field.name}
                onChange={(e) => {
                  setField({ ...field, [e.target.name]: e.target.value });
                }}
                type="text"
                className="border border-gray-300 w-[240px] px-[10px]  py-1"
              />
            </div>
            <div className="flex justify-between my-3">
              <label className="font-bold text-[14.5px]">Product Type</label>
              <input
                type="text"
                value={field.type}
                name="type"
                onChange={(e) => {
                  setField({ ...field, [e.target.name]: e.target.value });
                }}
                className="border border-gray-300 w-[240px] px-[10px]  py-1"
              />
            </div>
            <div className="flex justify-between my-3">
              <label className="font-bold text-[14.5px]">Price</label>
              <input
                type="number"
                className="border border-gray-300 w-[240px] px-[10px]  py-1"
                name="price"
                value={field.price}
                onChange={(e) => {
                  setField({ ...field, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-between my-3">
              <label className="font-bold text-[14.5px]">
                Number of Stocks
              </label>
              <input
                type="number"
                className="border border-gray-300 w-[240px] px-[10px] py-1"
                name="stocks"
                value={field.stocks}
                onChange={(e) => {
                  setField({ ...field, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="relative">
            <div className="flex  my-3 gap-[12%] ml-3 ">
              <label className="font-bold text-[14.5px] pt-1">Offer</label>
              <input
                type="text"
                className="border border-gray-300 w-[330px] px-[10px]  py-1"
                name="offer"
                value={field.offer}
                onChange={(e) => {
                  setField({ ...field, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-row justify-around my-3">
              <label className="font-bold text-[14.5px] pt-2">Image Url</label>
              <input
                type="text"
                className="border border-gray-300 w-[330px] h-[35px] mr-5"
                name="img"
                value={field.img}
                onChange={(e) => {
                  setField({ ...field, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="pl-[23%]">
              <p className="w-[90%]"></p>
            </div>
            <div className="flex gap-x-5 absolute bottom-0 ml-[260px]">
              <input
                onClick={() => setUpopen(false)}
                type="button"
                value="Cancel"
                className="border border-gray-300 px-4 py-1 rounded-md text-[16px] cursor-pointer"
              />
              <input
                type="button"
                value="Update"
                onClick={() => {
                  updateddata(updateda);
                }}
                className="bg-blue-500 px-4 py-1 rounded-md text-[16px] text-white cursor-pointer"
              />
            </div>
          </div>
          <div></div>
        </form>
      </Modal>
    </div>
  );
}
