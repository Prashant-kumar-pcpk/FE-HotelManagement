import {useState} from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Gallery from "./pages/Gallery";
import Vlog from "./pages/Vlog";
import Contact from "./pages/Contact";

function App() {

  // state variable
  const[screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSetScreen = (newScreen, data = null) => {
    setScreen(newScreen);
    if (data) {
      if (newScreen === "hotelDetails") {
        setSelectedHotel(data);
      } else if (newScreen === "booking") {
        setBookingDetails(data);
      }
    }
  };

  return (
    <>
    {screen === "landing" && (
      <Landing setScreen={handleSetScreen} />
    )}

    {screen === "login" && (
      <Login setScreen={handleSetScreen} setUser={setUser} />
    )}

    {screen === "register" && (
      <Register setScreen={handleSetScreen}  />
    )}

    {screen === "home" && (
      <Home setScreen={handleSetScreen} user={user} />
    )}

    {screen === "hotelDetails" && selectedHotel && (
      <HotelDetails setScreen={handleSetScreen} selectedHotel={selectedHotel} />
    )}

    {screen === "booking" && bookingDetails && (
      <Booking setScreen={handleSetScreen} bookingDetails={bookingDetails} />
    )}

    {screen === "about" && (
      <About setScreen={handleSetScreen} />
    )}

    {screen === "rooms" && (
      <Rooms setScreen={handleSetScreen} />
    )}

    {screen === "gallery" && (
      <Gallery setScreen={handleSetScreen} />
    )}

    {screen === "vlog" && (
      <Vlog setScreen={handleSetScreen} />
    )}

    {screen === "contact" && (
      <Contact setScreen={handleSetScreen} />
    )}

    </>
  )
}
export default App;
