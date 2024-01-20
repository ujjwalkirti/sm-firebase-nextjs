import React from "react";

type props = {
  isLoading: boolean;
};

function Loader({ isLoading }: props) {
  React.useEffect(() => {
    async function getLoader() {
      const { hourglass } = await import("ldrs");
      hourglass.register();
    }
    getLoader();
  }, []);
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
