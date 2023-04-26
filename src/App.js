import "./App.css"
import NavBar from './components/navbar';
import HomePage from './pages/home'
import Explore from './pages/explore'
import PostcardPage from './pages/postcardPage'
import TradecardPage from './pages/tradecardPage'
import Postcards from './pages/postcardsIndex'
import Tradecards from './pages/tradecardsIndex'
import About from './pages/about'
import Map from './pages/map'
import {Route, Routes} from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [postcardData, setPostcardData] = useState(null);
  const [tradecardData, setTradecardData] = useState(null);
  const [verticalPostcardsCarousel, setVerticalPostcardsCarousel] = useState(null);
  const [horizontalPostcardsCarousel, setHorizontalPostcardsCarousel] = useState(null);
  const [verticalTradecardsCarousel, setVerticalTradecardsCarousel] = useState(null);
  const [horizontalTradecardsCarousel, setHorizontalTradecardsCarousel] = useState(null);
  const [tags, setTags] = useState(null);
  const [show, setShow] = useState(true);

  {/* FOR HOSTING: Add {host-name}/{server-folder}/{endpoint} */}
  useEffect(() => {
    fetch('/node/getAll').then(res=>res.json()).then((res) => {
        setPostcardData(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/node/getAll2').then(res=>res.json()).then((res) => {
        setTradecardData(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/node/getVerticalCarousel').then(res=>res.json()).then((res) => {
        setVerticalPostcardsCarousel(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/node/getHorizontalPostcardCarousel').then(res=>res.json()).then((res) => {
        setHorizontalPostcardsCarousel(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/node/getHorizontalTradecardCarousel').then(res=>res.json()).then((res) => {
      setHorizontalTradecardsCarousel(res.filter(card=> card!== null));
    })
    .catch((Error) => {
      console.log(Error);
    });
    fetch("/node/getTags").then(res=>res.json()).then((res) => {
        setTags(res);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (<div>
      <NavBar/>
      <Routes id="overFlowScrolling">
        <Route path="/" element={<HomePage show={show} setShow={setShow} verticalPostcardsCarousel={verticalPostcardsCarousel} horizontalPostcardsCarousel={horizontalPostcardsCarousel} verticalTradecardsCarousel = {verticalTradecardsCarousel} horizontalTradecardsCarousel = {horizontalTradecardsCarousel}/>}/>
        <Route path="/map" element={<Map show={show} setShow={setShow} postcardData={postcardData} tradecardData={tradecardData}/>}/>
        <Route path="/explore" element={<Explore show={show} setShow={setShow} postcardData={postcardData} tradecardData={tradecardData} tags={tags}/>} />
        <Route path="/postcards" element={<Postcards show={show} setShow={setShow} postcardData={postcardData} />}/>
        <Route path="/tradecards" element={<Tradecards show={show} setShow={setShow} tradecardData={tradecardData} />}/>
        <Route path="/postcardDetails/:type/:id" element={<PostcardPage show={show} setShow={setShow} postcardData={postcardData}/>}/>
        <Route path="/tradecardDetails/:type/:id" element={<TradecardPage show={show} setShow={setShow} tradecardData={tradecardData}/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      </div>
  );
}

export default App;