import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import NavBar from  './components/layout/navBar'
import Footer from "./components/layout/footer/Footer";
const App = () => {


  return (
    <UserProvider>
      <NavBar/>
      <Outlet />
      <Footer/>
    </UserProvider>
  );
};

export default App;


