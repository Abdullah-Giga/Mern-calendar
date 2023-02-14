import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRoutes from './protectedRoute';
import PublicRoutes from './publicRoute';
import Header from '../Components/Header/header';
import Home from "../Pages/HomePage/home";
import SignUp from "../Pages/SignUp/signUp";
import SignIn from "../Pages/SignIn/signIn";
import Dashboard from '../Pages/Dashboard/Dashboard';
import Calendar from '../Pages/calendar/calendar';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
      <Routes>
        <Route element= {<PrivateRoutes/>}>
        <Route  path = "/Dashboard" element = {<Dashboard/>}/>
        <Route  path = "/Calendar" element = {<Calendar/>}/>
        </Route>
        <Route element= {<PublicRoutes/>}>
        <Route  path = "/SignUp" element = {<SignUp/>}/>
        <Route  path = "/SignIn" element = {<SignIn/>}/>
        <Route  path = "/" element = {<Home/>}/>
        </Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
