import PopUp from "../components/popup";
import ExploreTradecardEntry from "../components/ExploreTradecardEntry";
import dummyArray from "../data/dummyTradecardData.json";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../components/loading";
import "../styles/index.css";

export default function TradecardsIndex(props) {
  const [data, setData] = useState(dummyArray);
  const [pointer, setPointer] = useState(0);

  function fetchData(){
    setPointer(pointer + 4);
    setData(props.tradecardData.slice(0, pointer));
  };

  if (props.show) {
    return (
      <div className="home">
        <PopUp setShow={props.setShow} id="popupComponent" />
      </div>
    );
  } else {
    return (
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={data.length < props.tradecardData.length ? true : false}
        loader={<Loading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data.map((card) => {
          return <ExploreTradecardEntry card={card} />;
        })}
      </InfiniteScroll>
    );
  }
}
