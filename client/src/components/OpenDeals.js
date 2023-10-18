import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import header from "../assets/header.png";
import DealCard from "./DealCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../store/slice/deals";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4em 4em 1em;
  background: #f2f2f2;
  h2 {
    font-family: Merriweather;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0px;
    text-align: left;
    color: #b29f7e;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  padding-top: 2em;
`;

const dummyDeal = {
  title: "The Marina Torch",
  price: "6 500 000",
  tiketPrice: "60 000",
  yieldPercent: "9.25",
  soldPercent: "75",
  daysLeft: "150",
  imgUrl: header,
};

const OpenDeals = ({ setOffsetTop }) => {
  const openDealsRef = useRef(null);

  useEffect(() => {
    setOffsetTop(openDealsRef.current.offsetTop);
  }, []);

  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  return (
    <Wrapper ref={openDealsRef}>
      <h2>Open Deals</h2>
      <Content>
        {deals.loading
          ? "Is Loading"
          : deals.data &&
            deals.data.data.map((deal, idx) => (
              <DealCard {...deal} key={idx} />
            ))}
      </Content>
    </Wrapper>
  );
};

export default OpenDeals;
