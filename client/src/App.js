import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "./components/Navbar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #172234;
`;

function App() {
  const navbarRef = useRef(null);
  const [navbarRect, setNavbarRect] = useState({ height: 0, width: 0 });

  useEffect(() => {
    setNavbarRect(navbarRef.current.getBoundingClientRect());
  }, []);

  return (
    <Wrapper>
      <Navbar ref={navbarRef} />
      <Outlet context={{ navbarRect }} />
    </Wrapper>
  );
}

export default App;

export function useData() {
  return useOutletContext();
}
