import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import NavBar from  './components/layout/navBar'
import Footer from "./components/layout/footer/Footer";
import FlashMessage from "./components/layout/FlashMessage/FlashMessage";

const App = () => {


  return (
    <UserProvider>
      <NavBar/>
      <FlashMessage/>
      <Outlet />
      <Footer/>
    </UserProvider>
  );
};

export default App;


