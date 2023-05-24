import React, { useEffect, useState } from "react";
import { Button, Drawer, List, Spin } from "antd";
import { AiFillDatabase, AiFillFileAdd } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import AdminPage from "./AdminPage";
import axios from "axios";
import { toast } from "react-toastify";
import Update from "./update";
export default function Adminmain() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [upopen, setUpopen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [updateda, setupdate] = useState(); //update

  //filter
  const [records, setRecords] = useState([]);

  



  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  //get val
  const getvalue = async () => {
    try {
      setLoading(true);
      // const alldatas = await axios.get("http://localhost:5000/getval");
      const alldatas = await axios.get("https://ecomserver.vercel.app/getval");
      setDatas(alldatas.data);
      setRecords(alldatas.data);
     
      //  setRecords1(
      //    datas.filter((f) => f.type.toLowerCase().includes("Electronics"))
      //  );
      console.log(alldatas);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // //get single data

  // const singledata = async (id) => {
  //   try {
  //     const onedata = await axios.get(`http://localhost:5000/getonedata/${id}`);
  //     console.log(onedata);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //delete data

  const deleteval = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/deletedata/${id}`); //localhost run path
      await axios.delete(`https://ecomserver.vercel.app/deletedata/${id}`); //vercel run path
      toast.success("Successfuly Deleted");
      getvalue();
    } catch (err) {
      console.log(err);
      toast.error("Product Not Deleted");
    }
  };

  const Filter = (e) => {
    setRecords(
      datas.filter((f) =>
        f.name.toLowerCase().includes(e.target.value.toLowerCase())
       
      )
    );
  };

  //select to delete

  const [ischecked, setIschecked] = useState([]);

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
  
    if (checked) {
      setIschecked([...ischecked, value]);
    } else {
      setIschecked(ischecked.filter((e) => e !== value));
    }
    console.log(ischecked.filter((e) => e !== value) ,"edwedwd");
  };

  const Alldelete = async () => {
  
    try {
     console.log("sffpdnd", ischecked);
      if (ischecked.length > 0) {
           await axios.post("http://localhost:5000/alldeletedata", {
             ischecked,
           });
        getvalue();
        setIschecked([])

           toast.success("successfuly deleted");
      } else {
        toast.error('please select the field')
     }

    
    } catch (error) {
      toast.error("select the products not deleted");
    }
  };




  useEffect(() => {
    getvalue();
    
  }, []);
  return (
    <div className="flex">
      <div className=" bg-white ">
        {/* w-[300px] ...*/}

        <div className="py-5 mx-5 text-[17px]">
          <h2 className=" font-bold  text-[20px]">Dasboard</h2>
          <div className="list-none flex flex-col gap-2 pt-10">
            <li className=" border-[0.5px] border-b-[#a7a3a3] py-2 text-[14px] cursor-pointer">
              Product
            </li>
            <li className=" border-[0.5px] border-b-[#a7a3a3] py-2 text-[14px] cursor-pointer">
              Categories
            </li>
            <li className=" border-[0.5px] border-b-[#a7a3a3] py-2 text-[14px] cursor-pointer">
              Home Products
            </li>
            <li className=" border-[0.5px] border-b-[#a7a3a3] py-2 text-[14px] cursor-pointer">
              Adds
            </li>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] ">
        <div className="px-6 py-5 flex  ">
          <p className="font-bold pt-2 text-[15px] ">
            Total Products: {records.length}
          </p>
          <div className=" ml-[240px] relative">
            {/* ml-[220px] */}
            <input
              type="text"
              className="bg-white rounded-md border !w-[400px] px-[10px] border-[#b6b4b4] focus:!outline-none  py-[5px]"
              placeholder="Search.."
              onChange={Filter}
            />

            <CiSearch className="absolute right-5 top-1 text-[25px] text-[#b6b4b4]" />
          </div>
        
          <div>
            <button className=" mt-[5px]   ml-[250px] leading-4">
              <MdDeleteSweep
                className=" hover:text-red-600 text-[27px] px-[5px] bg-[#cccccc] py-1 rounded-md"
                onClick={Alldelete}
              />
              <span className="text-[10px]">Delete</span>
            </button>
          </div>
          <button type="primary" onClick={showDrawer} className="ml-[20px]">
            <AiFillFileAdd className="text-[35px] hover:text-blue-500" />
            <p className="text-[10px]">Add</p>
          </button>
          <Drawer
            title="Add products"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <AdminPage getvalue={getvalue} />
          </Drawer>
        </div>
        <Spin spinning={loading}>
          <div className="bg-white mx-7  my-5 shadow-2xl flex justify-center py-1">
            <table class=" ">
              <thead>
                <tr>
                  <th class="border border-slate-300 px-[25px] py-5 text-[15px]">
                    S.No
                  </th>
                  <th class="border border-slate-300 px-[25px] py-5 text-[15px]">
                    Check
                  </th>
                  <th class="border border-slate-300 px-[43px] py-5 text-[15px]">
                    Image
                  </th>
                  <th class="border border-slate-300 px-[43px] py-5 text-[15px]">
                    Name
                  </th>
                  <th class="border border-slate-300 px-[43px] py-5 text-[15px]">
                    Type
                  </th>
                  <th class="border border-slate-300 px-[43px] py-5 text-[15px]">
                    Price
                  </th>
                  <th class="border border-slate-300 px-[43px] py-5 text-[15px]">
                    offer
                  </th>
                  <th class="border border-slate-300 px-[43px] py-5 text-[15px]">
                    Stocks
                  </th>
                  <th class="border border-slate-300 px-[90px] py-5 text-[15px]">
                    Action
                  </th>
                </tr>
              </thead>

              {records.length > 0 ? (
                <tbody className="">
                  { records.map((dat, index) => {
                    return (
                      <tr className="" key={index}>
                        <td class="border border-slate-300 text-center py-10 text-[14px]">
                          {index + 1}
                        </td>
                        <td class="border border-slate-300 text-center py-10 text-[14px]">
                          <input
                            type="checkbox"
                            value={dat._id}
                            checked={dat.ischecked}
                            onChange={(e) => handlecheckbox(e)}
                          />
                        </td>

                        <td class="  border-b-2 border-slate-300 flex justify-center !h-[20vh]">
                          <img
                            draggable="false"
                            src={dat.img[0] || `./${dat.img[0]}`}
                            alt="img"
                            // width="120px"
                            height="10px"
                            className="py-1"
                          />
                        </td>
                        <td class="border border-slate-300 text-center text-[14px]">
                          {dat.name}
                        </td>
                        <td class="border border-slate-300 text-center text-[14px]">
                          {dat.type}
                        </td>
                        <td class="border border-slate-300 text-center text-[14px]">
                          {dat.price}
                        </td>
                        <td class="border border-slate-300 text-center text-[14px]">
                          {dat.offer}
                        </td>
                        <td class="border border-slate-300 text-center text-[14px]">
                          {dat.stocks}
                        </td>
                        <td class="border border-slate-300 text-center text-[14px]">
                          <div className="flex  justify-center gap-5">
                            <FiEdit
                              className="text-[40px] border border-gray-300 p-2 rounded-md cursor-pointer hover:text-blue-600"
                              onClick={() => {
                                setUpopen(true);
                                setupdate(dat);
                              }}
                            />

                            <MdDelete
                              className="text-[40px] border border-gray-300 p-2  rounded-md cursor-pointer hover:text-red-600"
                              onClick={() => deleteval(dat._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody className="relative bg-white h-screen">
                  <tr>
                    <td className="text-[50px] left-[350px] top-[200px] font-bold opacity-10 absolute">
                      Products Not Available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            {upopen && (
              <Update
                upopen={upopen}
                updateda={updateda}
                setUpopen={setUpopen}
                getvalue={getvalue}
              />
            )}
            {console.log(datas.length)}
          </div>
        </Spin>
      </div>
    </div>
  );
}
