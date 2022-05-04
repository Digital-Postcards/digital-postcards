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

  useEffect(() => {
    axios
      // .get('http://localhost:8000/' + route[props.type])
      .get('http://localhost:8000/getAll')
      .then((res) => {
        setPostcardData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  return (<div>
      <NavBar/>
      <Routes id="overFlowScrolling">
        <Route path="/" element={<HomePage/>}/>
        <Route path="/map" element={<Map data={postcardData}/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/essays" element={<Essays/>}/>
        <Route path="/narration" element={<Narration/>}/>
        <Route path="/postcards" element={<Postcards postcardData={postcardData} />}/>
        <Route path="/tradecards" element={<Tradecards tradecardData={null} />}/>
        <Route path="/postcardDetails/:type/:id" element={<PostcardPage />}/>
      </Routes>
      </div>
  );
}

export default App;