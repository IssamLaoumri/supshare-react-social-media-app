import './App.css'
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoggedInRoute from "@/routes/LoggedInRoute.jsx";
import NotLoggedInRoute from "@/routes/NotLoggedInRoute.jsx";

function App() {

  return (
      <Router>
        <Routes>
            <Route element={<LoggedInRoute />}>
                <Route path="/" element={<Home/>}/>
            </Route>
            <Route element={<NotLoggedInRoute />}>
                <Route path="/login" element={<Login/>} exact/>
            </Route>
        </Routes>
      </Router>
  )
}

export default App
