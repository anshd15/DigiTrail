import React from "react";
import Navbar from "../components/Navbar";

const SendPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="bg-base-100 text-white h-screen justify-center flex flex-col">
        <div className="flex flex-col justify-center items-center ">
          <div className=" bg-base-300 flex h-max p-4 m-4 mt-[-5px] w-[90vw] rounded-3xl ">
            <div className="flex flex-col w-[50%] items-center border-r-2 p-6">
              <div className="flex items-center p-2 ">
                <span className=" text-xl mb-1 ">Product Name : </span>
                <span className=" text-xl mb-1 ml-2 "> SAMSUNG S22</span>
              </div>
              <div className="flex items-center p-2 ">
                <span className=" text-xl mb-1 ">Token Name : </span>
                <span className=" text-xl mb-1 ml-2 "> SAMSUNG S22</span>
              </div>
              <div className="flex items-center p-2 ">
                <span className=" text-xl mb-1 ">Issuer UserName : </span>
                <span className=" text-xl mb-1 ml-2 "> SAMSUNG S22</span>
              </div>
              <div className="flex justify-center items-center p-2 ">
                <span className=" text-xl mb-1 ">Issuer Address : </span>
                <span className=" text-xl w-[50%] overflow-x-hidden h-[60px] mb-1 ml-2 ">
                  
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem odio minima dolorem ratione molestiae aliquam fugit sed
                  assumenda rem earum nostrum quas, doloribus voluptatibus nihil
                  blanditiis repellendus, culpa tempora alias.
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center w-[50%]  p-2">
              <span className=" text-lg mb-1 ">Enter next trackpoint ID :</span>
              <label className="input input-bordered mt-2 input-sm input-accent ">
                <input
                  type="text"
                  className="grow"
                  placeholder="Click to Enter"
                />
              </label>
              <button className="btn btn-outline bg-slate-800 btn-accent mt-4">
                PRODUCT SEND FORWARD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPage;
