import "./App.css"
import NavBar from './components/navbar';
import HomePage from './pages/home'
import Explore from './pages/explore'
import Map from './pages/map'
import {Route, Routes} from "react-router-dom";

function App() {
  return (<>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/explore" element={<Explore/>}/>
      </Routes></>
  );
}

export default App;