import React, { useState } from "react";
import Header from "../components/Header";
import OpenDeals from "../components/OpenDeals";
import { useData } from "../App";

const Home = () => {
  const { navbarRect } = useData();
  const [offsetTop, setOffsetTop] = useState(0);

  return (
    <>
      <Header
        style={{ height: `calc(100vh - ${navbarRect.height}px)` }}
        openDealsCoords={offsetTop}
      />
      <OpenDeals setOffsetTop={setOffsetTop} />
    </>
  );
};

export default Home;
