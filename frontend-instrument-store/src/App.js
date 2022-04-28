import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart'
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import Orders from "./Component/Orders";
import Keyboard from "./Component/Keyboard";
import Guitar from "./Component/Guitar";
import Drum from "./Component/Drum";
import Harmonium from "./Component/Harmonium"
import MusicBooks from "./Component/MusicBooks"
import Fav from "./Component/Fav"
import Profile from "./Component/Profile"

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/signin' element={< SignIn />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/profile' element={< Profile />}></Route>
          <Route exact path='/orders' element={< Orders />}></Route>
          <Route exact path='/cart' element={< Cart />}></Route>
          <Route exact path='/fav' element={< Fav />}></Route>
          <Route exact path='/keyboard' element={< Keyboard />}></Route>
          <Route exact path='/guitar' element={< Guitar />}></Route>
          <Route exact path='/drum' element={< Drum />}></Route>
          <Route exact path='/harmonium' element={< Harmonium />}></Route>
          <Route exact path='/musicbooks' element={< MusicBooks />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;