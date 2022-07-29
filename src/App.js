import "./App.css"
import NavBar from './components/navbar';
import HomePage from './pages/home'
import Explore from './pages/explore'
import Map from './pages/map'
import Essays from './pages/essays'
import Narration from './pages/narration'
import PostcardPage from './pages/postcardPage'
import Postcards from './pages/postcardsIndex'
import Tradecards from './pages/tradecardsIndex'
import {Route, Routes} from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [postcardData, setPostcardData] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    fetch('/getAll').then(res=>res.json()).then((res) => {
        setPostcardData(res.filter(card=> card!== null));
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
        <Route path="/" element={<HomePage postcardData={postcardData}/>}/>
        <Route path="/map" element={<Map data={postcardData}/>}/>
        <Route path="/explore" element={<Explore postcardData={postcardData} tags={tags}/>} />
        <Route path="/essays" element={<Essays/>}/>
        <Route path="/narration" element={<Narration/>}/>
        {/*  MAKE SURE THAT WHEN THE POSTCARD DETAILS GETS THE POSTCARD INFORMATION, THAT IT WILL SHOW THE CORRECT PHOTOGRAPH CORRESPONDING TO THE ID!!!!!!!!!!!!!!
          Oh and make sure /postcards doesn't automatically crash when clicked....
        */}
        <Route path="/postcards" element={<Postcards postcardData={postcardData} />}/>
        <Route path="/tradecards" element={<Tradecards tradecardData={null} />}/>
        <Route path="/postcardDetails/:type/:id" element={<PostcardPage postcardData={postcardData}/>}/>
      </Routes>
      </div>
  );
}

export default App;