import React from "react";
import { hourglass } from "ldrs";


type props = {
  isLoading: boolean;
};

hourglass.register();

function Loader({ isLoading }: props) {
  return (
    <div aria-live="polite" aria-busy={isLoading} className="text-pink-600">
      <l-hourglass
        size="40"
        bg-opacity="0.1"
        speed="1.75"
        color={"#DB2777"}
      ></l-hourglass>
    </div>
  );
}

export default Loader;
