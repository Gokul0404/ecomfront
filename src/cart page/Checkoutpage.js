import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form, Input, InputNumber, message, Select, Steps, theme } from "antd";
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import { BsCurrencyRupee } from "react-icons/bs";
import { BiChevronsRight } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Stripecheck from 'react-stripe-checkout'
import { toast } from 'react-toastify';

export default function Checkoutpage() {





   
 const cart = useSelector((state) => state.cart);

 const [current, setCurrent] = useState(0);
const [a, setA] = useState("");
const [address, setAdd] = useState("");
const values = (e) => {
  console.log("add", e);
    setA(e);
    Cookies.set("add", JSON.stringify(e))
  };
  

  //stripe payment
  // const MakePayment = (token) => {

  //   const body = {
  // token
  //   }
  //   const headers = {
  //     "Content-Type":"application/json"
  //   }

  //   return fetch("http://localhost:5000", {body});
  // }


  const MakePayment = async (token) => { 
    try {
     const tokenValue=token 
      const value = await axios.post("http://localhost:5000/payment", { tokenValue });
toast.success("payment sent")
    } catch (error) {
      console.log("not work payment actions");
      console.log(token);
      console.log(error);
    }
  }
  

   console.log("done", address);
const steps = [
  {
    title: "Customer Information",
    content: [
      <div className="bg-gray-200 mt-5 flex justify-center h-[88vh]">
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={values}
          className="py-10 font-bold w-[700px] "
        >
          <div className="flex justify-center gap-x-5">
            <Form.Item
              name="fname"
              label="FirstName"
              style={{ width: "300px" }}
              rules={[{ required: true, message: "enter the name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lname"
              label="LastName"
              style={{ width: "300px" }}
              rules={[{ required: true, message: "enter the name" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex justify-center gap-x-5">
            <Form.Item
              name="email"
              label="Email"
              style={{ width: "300px" }}
              rules={[
                { type: "email", message: "enter valid  email" },
                { required: true, message: "enter  email" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Mobile Number"
              rules={[
                {
                  type: "number",
                },

                {
                  required: true,
                  message: "enter Number",
                },
                {
                  pattern: /^[\d]{10,10}$/,
                  message: "Value should be less than 10 character",
                },
              ]}
            >
              <InputNumber style={{ width: "300px" }} />
            </Form.Item>
          </div>
          <div className="flex justify-center items-center">
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                style={{ width: "620px" }}
              >
                <Option value="India">India</Option>
                <Option value="China">China</Option>
                <Option value="America">America</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="flex justify-center gap-x-5">
            <Form.Item
              name="state"
              label="Select a State"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                style={{ width: "300px" }}
              >
                <Option value="Tamilnadu">Tamilnadu</Option>
                <Option value="Andhra Pradesh">Andhra Pradesh</Option>
                <Option value="Kerala">Kerala</Option>
                <Option value="Assam">Assam</Option>
                <Option value="Telangana">Telangana</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="Zip"
              label="Zip code"
              style={{ width: "300px" }}
              rules={[{ required: true, message: "enter the Zip code" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="flex justify-center items-center">
            <Form.Item
              name="address"
              label="Shipping Address"
              rules={[{ required: true }]}
            >
              <TextArea style={{ width: "620px" }} />
            </Form.Item>
          </div>
          <Form.Item className="flex justify-center items-center">
            <Button className="bg-[#acacac] text-white" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>,
    ],
  },
  {
    title: "Shipping & Payment",
    content: [
      <div>
        <div className="mt-[60px]">
          <div className="mt-5">
            <h3 className="font-bold">Customer Information</h3>
            <p className="mt-5">
              {" "}
              {address.fname} {address.lname}
            </p>
            <p>{address.email}</p>
            <p>{address.phone}</p>
            <h3 className="font-bold mt-5">Shipping Address</h3>
            <p>
              {address.address}, {address.state}, {address.country},{" "}
              {address.Zip}.
            </p>
          </div>

          <div className="mt-5">
            <h3 className="font-bold">Payment </h3>
            <p className="font-bold flex">
              Total Ammount:
              <BsCurrencyRupee className="mt-[3px] text-[18px] ml-3" />
              {cart.cartTotalaAmount + 150}.00
            </p>
            <Stripecheck
              name="Buy Product"
              amount={(cart.cartTotalaAmount + 150) * 100}
              currency="INR"
              stripeKey="pk_test_51NBWkKSFxkJ4Upf7uAEiUz8gp1cuYeFzEiBnTepGJd93T93OkffnhJTn83IlK3mnJqDDiZRy3sbUWSdGsTKJJ0pD00ej4UfZWx"
             token={MakePayment}
    
            >
              <button className="bg-blue-600 px-2 py-[5px] text-white font-bold rounded-2xl my-10">
                Continue To Pay
              </button>
            </Stripecheck>
          </div>
        </div>
      </div>,
    ],
  },
  {
    title: "Order Confirmation",
    content: "Last-content",
  },
];



    const next = () => {
        if (a) {
          setCurrent(current + 1)
          setAdd(JSON.parse(Cookies.get("add")));
           
        } else {
          // toast.error('Fill the field')
            setCurrent(current + 1);
        }
      // setCurrent(current + 1) 
        
  
 
 };

 const prev = () => {
   setCurrent(current - 1);
 };

 const items = steps.map((item) => ( { key: item.title, title: item.title }));


  return (
    <>
      <div className="flex ">
        <div className="flex  mt-10 ml-10 basis-4/6">
          <div className="w-[95%]">
            <Steps current={current} items={items} />

            <div>{steps[current].content}</div>

            <div className="relative py-10">
              <div className="flex absolute right-0 top-5">
                {current < steps.length - 1 && (
                  <Button
                    onClick={() => next()}
                    className="bg-[#b4b4b4] text-white flex font-bold hover:!text-white"
                  >
                    Next <BiChevronsRight className="mt-[3px] text-[18px]" />
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
                {current > 0 && (
                  <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-11 ">
            <div className="flex justify-between">
              <h2 className="text-[18px] font-bold ml-6">Your Orders</h2>
              <h2 className="text-[13px] text-[#8a8a8a] font-semibold mr-5">
                {" "}
                <Link to='/cart' >Edit Cart</Link>
              </h2>
            </div>

            <div className="w-[400px] shadow-lg mb-5">
              {cart.cartItems?.map((d,index) => {
                return (
                  <div key={index} className="flex border-[0.01px] border-b-[#ccc9c9] ">
                    <span className='scale-[80%]'>
                   
                      <img
                        src={d.img[0]}
                        className="w-[130px] py-5 "
                        draggable="false"
                      />
                    </span>
                    <div className="mt-10 text-[#afafaf] font-semibold">
                      <p>Product Name: {d.name}</p>
                      <h3>Cartquantity: {d.cartQuantity}</h3>
                      <h3 className=" flex">
                        <BsCurrencyRupee className="mt-1" />
                        Price: {d.off ? d.off : d.price}.00
                      </h3>
                    </div>
                  </div>
                );
              })}
              <div className="py-10 px-5">
                <h3 className="flex font-bold">
                  Product Ammount:{" "}
                  <BsCurrencyRupee className="mt-[5.5px] ml-[88px]" />
                  {cart.cartTotalaAmount}.00
                </h3>
                <h3 className="flex font-bold">
                  Shipping Ammount:{" "}
                  <BsCurrencyRupee className="mt-[5.5px] ml-20" />
                  150.00
                </h3>
                <h3 className="flex font-bold mt-3">
                  Order Total:{" "}
                  <BsCurrencyRupee className="mt-[5.5px] ml-[143px]" />
                  {cart.cartTotalaAmount + 150}.00
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
