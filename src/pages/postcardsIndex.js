import PopUp from "../components/popup";
import "../styles/index.css";
import React, { useState, useEffect } from "react";
import ExplorePostcardEntry from "../components/explorePostcardEntry";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../components/loading';
import dummyArray from '../data/dummyPostcardData.json';

export default function PostcardsIndex(props) {
  const [data, setData] = useState(dummyArray);
  const [pointer, setPointer] = useState(0);

  function fetchData(){
    setPointer(pointer + 3);
    setData(props.postcardData.slice(0, pointer));
  };

  if (props.show) {
    return (
      <div className="home">
        <PopUp setShow={props.setShow} id="popupComponent" />
      </div>
    );
  } else {
    return (
      <>
        <div>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={data.length < props.postcardData.length ? true : false}
            loader={<Loading/>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((card) => {
              return <ExplorePostcardEntry card={card} />;
            })}
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
