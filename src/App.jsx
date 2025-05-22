import './App.css'
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoggedInRoute from "@/routes/LoggedInRoute.jsx";
import NotLoggedInRoute from "@/routes/NotLoggedInRoute.jsx";
import {ToastProvider} from "@/contexts/ToastContext.jsx";
import Toast from "@/components/common/Toast/Toast.jsx";
import Reset from "@/pages/Reset.jsx";

function App() {

  return (
      <ToastProvider>
          <Router>
            <Routes>
                <Route element={<LoggedInRoute />}>
                    <Route path="/" element={<Home/>}/>
                </Route>
                <Route element={<NotLoggedInRoute />}>
                    <Route path="/login" element={<Login/>} exact/>
                </Route>
                <Route path="/reset-password" element={<Reset />} />
            </Routes>
          </Router>
          <Toast />
      </ToastProvider>
  )
}

export default App
