import React from "react";
import styled from "styled-components";
import { media } from "../breakpoints";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-basis: calc(50% - 1em);
  border-radius: 5px;
  height: 400px;
  box-shadow: 0px 4px 4px 0px #00000026;
  ${media.sm`
    flex-basis: 100%;
      height: 350px;
  `}
  img {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 5px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
  padding: 0.7em;
  justify-content: flex-end;
  z-index: 1;
  color: #fff;
  h3 {
    font-family: Merriweather;
    font-size: 20px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

const Details = styled.div`
  display: flex;
  ${media.sm`
    flex-direction: column;
    gap: .7em;
  `}
`;

const Column = styled.div`
  flex-basis: calc(100% / 3);
  text-align: left;
  p {
    font-family: Lato;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0px;
  }
  ${media.sm`
    flex-basis: unset;
  `}
`;

const DealCard = ({
  title,
  price,
  ticketprice: tiketPrice,
  yieldpercent: yieldPercent,
  soldpercent: soldPercent,
  daysleft: daysLeft,
  imgurl: imgUrl,
}) => {
  return (
    <Wrapper>
      <img src={imgUrl} alt={title} />
      <Content>
        <h3>{title}</h3>
        <Details>
          <Column>
            <p>{price} Dhs</p>
            <p>Tiket - {tiketPrice} Dhs</p>
          </Column>
          <Column>
            <p>Yield {yieldPercent} %</p>
            <p>Days left {daysLeft}</p>
          </Column>
          <Column>
            <p>Sold {soldPercent} %</p>
          </Column>
        </Details>
      </Content>
    </Wrapper>
  );
};

export default DealCard;
