import {React } from 'react';
import Login from './components/jsx/Login';
import MainPage from './components/jsx/MainPage'

import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <>
        {(!cookies.username || cookies.username === '') &&
        <Login/>
        }

        {!(!cookies.username || cookies.username === '') &&
        <MainPage/>
        }
    </>
  );
}

export default App;