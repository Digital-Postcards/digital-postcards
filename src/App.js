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
  const axios = require("axios");
  const [postcardData, setPostcardData] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/getAll').then((res) => {
        setPostcardData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
    axios
      .get("http://localhost:8000/getTags").then((res) => {
        setTags(res.data);
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