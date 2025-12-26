import React from "react";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-xl rounded-xl p-5 bg-linear from-cyan-500 to-cyan-800 border border-cyan-300 flex justify-center items-center">
        Loading
        <SyncRoundedIcon className="animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
