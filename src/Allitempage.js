import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import Itempage from "./Itempage";
import { toast } from "react-toastify";
import { Divider, Spin } from "antd";
import { Select, Space } from "antd";
import { BiSkipNextCircle } from "react-icons/bi";
import { ImPrevious } from "react-icons/im";
export default function Allitempage() {
  const [data1, setData1] = useState([]);
  const [totalitmes, setTotalitems] = useState(0); //this is product count
  const [selectedoption, setSelectedoption] = useState("All");
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // console.log("6ybt", totalitmes); //this is product count

  //get the all prosuct datas in back end
  const alldatas = async () => {
    try {
      setLoading(true);
      // await axios
      //   .post("http://localhost:5000/alldatas", {
      //     selectedoption,
      //   })
      await axios
        .post("https://ecomserver.vercel.app/alldatas", {
          selectedoption,
        })
        .then((res) => {
          if (res.data == "fail") {
            toast.error("something went wrong");
            console.log(res.data);
          } else {
            const all = res.data;
            setData1(all.allproducts);
            setTotalitems(all.totalitmes); //this is product count
          }
        });
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };








  //get the  click next page to show the next products

  const pageChangeSubmit = async () => {
    try {
      setLoading(true);
      // await axios
      //   .post("http://localhost:5000/pageChange", {
      //     selectedoption,
      //     pageNum,
      //   })
      await axios
        .post("https://ecomserver.vercel.app/pageChange", {
          selectedoption,
          pageNum,
        })
        .then((res) => {
          setData1(res.data);
        });
    } catch (error) {
      toast.error("Datas not get to DB");
    } finally {
      setLoading(false);
    }
  };

  const handlechange = (value) => {
    setSelectedoption(value);
  };

  useEffect(() => {
    alldatas();
  }, [selectedoption]);

  //pagenumber click to change next product
  const prev = () => {
    setPageNum(pageNum - 1);
  };
  const next = () => {
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    pageChangeSubmit();
  }, [pageNum]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex   bg-white shadow-md  w-[60vw] items-center justify-center py-2 mt-4 ">
          <h1 className="font-bold">Search by Categories :</h1>
          <Space wrap className="flex pl-5">
            <Select
              defaultValue="lucy"
              style={{ width: 220 }}
              value={selectedoption}
              onChange={handlechange}
              options={[
                { value: "All", label: "All" },

                { value: "Electronics", label: "Electronics" },
                { value: "Fashion", label: "Fashion" },
                { value: "Sports", label: "Sports" },
                { value: "Kitchen", label: "Kitchen" },
                { value: "Toys", label: "Toys" },
              ]}
            />
          </Space>
          <h1 className="font-bold  pl-5">Total Products: {totalitmes}</h1>
        </div>
      </div>
      <Spin spinning={loading}>
        <section className="text-gray-300">
          <div className="container px-5 py-12 mx-auto">
            <div className="!flex !flex-wrap m-4">
              {data1.map((i) => (
                <div className="lg:w-1/4 md:1/2 p-2 scale-[90%] my-4 w-full  rounded-lg shadow-md">
                  <Itempage
                    id={i._id}
                    name={i.name}
                    type={i.type}
                    price={i.price}
                    stocks={i.stocks}
                    img={i.img}
                    allRatings={i.allRatings}
                    reviews={i.reviews}
                    offer={i.offer}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="flex justify-center mb-10 items-center">
          <button
            disabled={pageNum <= 1 ? true : false}
            onClick={prev}
            className="text-white bg-indigo-500 border-0  py-1 px-6 focus:outline-none font-bold flex"
          >
            <ImPrevious className="text-[14px] mr-1 mt-[4.5px]" /> Prev
          </button>
          <p className="px-3 font-bold">
            Page : {pageNum}/{Math.ceil(totalitmes / 12)}
          </p>
          <button
            disabled={pageNum >= Math.ceil(totalitmes / 12) ? true : false }
            onClick={next}
            className="text-white bg-indigo-500 border-0  py-1 font-bold px-6 focus:outline-none  flex"
          >
            Next <BiSkipNextCircle className="text-[17px] ml-1 mt-[3.5px]" />
          </button>
        </div>
      </Spin>
    </>
  );
}
