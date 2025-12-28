import { BiLoader } from "react-icons/bi";

const Loader = ({ text }: { text: string }) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-md h-20 p-5 bg-blue-600/60 rounded-2xl flex items-center animate-pulse ">
        <div className="">
          <BiLoader size={40} color="white" />
        </div>
        <p className="text-xl capitalize">{text}</p>
      </div>
    </div>
  );
};

export default Loader;
