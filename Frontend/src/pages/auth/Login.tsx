import React, { useEffect, useState, type FormEventHandler } from "react";
import toast from "react-hot-toast";
import { BiLoaderCircle } from "react-icons/bi";
import { Button } from "../../components/ui/button";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function formHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  async function submitData(e) {
    if (!formData.email || !formData.password) {
      toast.error("Please enter complete details");
      return;
    }
    setProcessing(true);

    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve();
    //   });
    // });
  }
  return (
    <div className="w-screen h-screen relative bg-linear-40 from-[#11226e] via-[#050a26] to-[#020205] flex justify-center items-center">
      <div className="h-full w-full absolute bg-[#0e1c58]/5" />

      <div className="w-md p-5 border border-blue-800 backdrop-blur-2xl bg-blue-400/20 rounded-2xl flex flex-col shadow-2xl shadow-blue-400">
        <p className="text-white text-center text-2xl">Please Login</p>

        <form
          action=""
          className="grid grid-cols-2 gap-5 mt-10"
          onSubmit={submitData}
        >
          <div className="grid grid-cols-8 col-span-2">
            <label
              htmlFor="email"
              className="col-span-3 text-2xl text-white capitalize"
            >
              email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={formHandler}
              className="pl-2 p-2 bg-blue-800 w-full col-span-5 rounded-xl focus:outline-0 text-white"
            />
          </div>
          <div className="grid grid-cols-8 col-span-2">
            <label
              htmlFor="password"
              className="col-span-3 text-2xl text-white capitalize"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={formHandler}
              className="pl-2 p-2 bg-blue-800 w-full col-span-5 rounded-xl focus:outline-0 text-white"
            />

            <Button className="w-20">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
