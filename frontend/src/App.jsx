// App.jsx
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import NavBar from  './components/layout/navBar'
const App = () => {
  return (
    <UserProvider>
      <NavBar/>
      <Outlet />
    </UserProvider>
  );
};

export default App;


