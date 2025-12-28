import React from "react";

const Login = () => {
  return (
    <div className="w-screen h-screen relative bg-linear-40 from-[#11226e] via-[#050a26] to-[#020205] flex justify-center items-center">
      <div className="h-full w-full absolute bg-[#0e1c58]/5" />
      <div className="w-md p-5 border border-blue-800 backdrop-blur-2xl bg-blue-400/20 rounded-2xl flex flex-col shadow-2xl shadow-blue-400">
        <p className="text-white text-center text-2xl">Please Login</p>

        <form action="" className="grid grid-cols-2  gap-5 mt-10">
          <div className="grid grid-cols-8 col-span-2">
            <label
              htmlFor=""
              className="col-span-3 text-2xl text-white capitalize"
            >
              email
            </label>
            <input
              type="text"
              name=""
              id=""
              className="pl-2 p-2 bg-blue-800 w-full col-span-5 rounded-xl focus:outline-0 text-white"
            />
          </div>
          <div className="grid grid-cols-8 col-span-2">
            <label
              htmlFor=""
              className="col-span-3 text-2xl text-white capitalize"
            >
              Password
            </label>
            <input
              type="text"
              name=""
              id=""
              className="pl-2 p-2 bg-blue-800 w-full col-span-5 rounded-xl focus:outline-0 text-white"
            />
          </div>

          <button className="bg-linear-30 from-blue-600 via-blue-700 to-blue-900 border border-blue-500 shadow-2xs shadow-blue-400 px-5 py-2 rounded-2xl text-2xl text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
