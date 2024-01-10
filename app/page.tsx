import SplashScreenPage from "@/components/SplashScreenPage";
import React from "react";

const Home = () => {
  const user = null;

  return <>{user ? <div>hello</div> : <SplashScreenPage />}</>;
};

export default Home;
