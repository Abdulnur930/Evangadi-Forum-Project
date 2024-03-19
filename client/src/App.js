import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { createContext, useEffect, useState } from "react";
import axios from "./Utility/axiosConfig";
import AskQuestion from "./pages/AskQuestion";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
export const AppState = createContext();
function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<AskQuestion />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
