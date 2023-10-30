import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

  const [user, setLoginUser] = useState({state:false ,token:null, usuario:null, cargo:null, nombre:null})


  return (
    <AuthContext.Provider 
    value={
      {user, setLoginUser}
    }
    >
      {children}
    </AuthContext.Provider>
  )
}

