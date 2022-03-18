import "./App.css"
import NavBar from './components/navbar';
import HomePage from './pages/home'
import Explore from './pages/explore'
import Map from './pages/map'
import Essays from './pages/essays'
import Narration from './pages/narration'
import {Route, Routes} from "react-router-dom";
import axios from 'axios';

function App() {
  return (<>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path="/essays" element={<Essays/>}/>
        <Route path="/narration" element={<Narration/>}/>
      </Routes>
      </>
  );
}

export default App;