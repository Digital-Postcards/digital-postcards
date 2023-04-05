import "./App.css"
import NavBar from './components/navbar';
import HomePage from './pages/home'
import Explore from './pages/explore'
import Essays from './pages/essays'
import Narration from './pages/narration'
import PostcardPage from './pages/postcardPage'
import TradecardPage from './pages/tradecardPage'
import Postcards from './pages/postcardsIndex'
import Tradecards from './pages/tradecardsIndex'
import About from './pages/about'
import NewMap from './pages/newMap'
import Map from './pages/map'
import {Route, Routes} from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";


// HERE is the beginning of the code, react router sends postcardData from the server
// as props into the home.js
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
    fetch('/getAll').then(res=>res.json()).then((res) => {
        setPostcardData(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/getAll2').then(res=>res.json()).then((res) => {
        setTradecardData(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/getVerticalCarousel').then(res=>res.json()).then((res) => {
        setVerticalPostcardsCarousel(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/getHorizontalPostcardCarousel').then(res=>res.json()).then((res) => {
        setHorizontalPostcardsCarousel(res.filter(card=> card!== null));
      })
      .catch((Error) => {
        console.log(Error);
      });
    fetch('/getHorizontalTradecardCarousel').then(res=>res.json()).then((res) => {
      setHorizontalTradecardsCarousel(res.filter(card=> card!== null));
    })
    .catch((Error) => {
      console.log(Error);
    });
    fetch("/getTags").then(res=>res.json()).then((res) => {
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
        {/*<Route path="/map" element={<Map show={show} setShow={setShow} data={postcardData}/>}/>*/}
        <Route path="/map" element={<NewMap data = {postcardData}/>}/>
        <Route path="/explore" element={<Explore show={show} setShow={setShow} postcardData={postcardData} tradecardData={tradecardData} tags={tags}/>} />
        <Route path="/essays" element={<Essays/>}/>
        <Route path="/narration" element={<Narration/>}/>
        {/*  MAKE SURE THAT WHEN THE POSTCARD DETAILS GETS THE POSTCARD INFORMATION, THAT IT WILL SHOW THE CORRECT PHOTOGRAPH CORRESPONDING TO THE ID!!!!!!!!!!!!!!
          Oh and make sure /postcards doesn't automatically crash when clicked....
        */}
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