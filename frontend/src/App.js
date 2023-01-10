import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import "./Pages/calendar/calendar.css"
import Header from './Components/Header/header';
import Home from "./Pages/HomePage/home";
import SignUp from "./Pages/SignUp/signUp";
import SignIn from "./Pages/SignIn/signIn";
import MyTasks from './Pages/MyTasks/myTasks';
import Calendar from './Pages/calendar/calendar';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
      <Routes>
        <Route  path = "/" element = {<Home/>}/>
        <Route  path = "/SignUp" element = {<SignUp/>}/>
        <Route  path = "/SignIn" element = {<SignIn/>}/>
        <Route  path = "/MyTasks" element = {<MyTasks/>}/>
        <Route  path = "/Calendar" element = {<Calendar/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
