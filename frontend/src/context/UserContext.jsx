import { createContext } from "react";
import useAuth from "../hook/useAuth";
import Report from "../hook/Report";
import Suggestion from "../hook/Suggestion";
const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, register, logout, login, loading } = useAuth();
  const {search,report,CardSearch,CreateReport} = Report();
  const {createSuggestion } = Suggestion();

  return (
    <Context.Provider value={{ authenticated, register, logout, login, loading,search,report,CardSearch,CreateReport,createSuggestion}}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };





