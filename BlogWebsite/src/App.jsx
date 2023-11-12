import {useEffect, useState} from "react";
import "./App.css";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./store/authSlice";
import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //!
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (dispatch) {
          dispatch(logout({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{Outlet}</main>
        <Footer />
      </div>
    </div>
  ) : null;
  //here checking if loading is false then show this otherwise do that part
}

export default App;
