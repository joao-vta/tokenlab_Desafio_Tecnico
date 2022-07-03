import React, {useState} from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";

import EventForm from './EventForm';
import MonthDay from './MonthDay';

import '../css/MainPage.css'

function MainPage() {

    const [currState, setState] = useState({
      "year" : (new Date()).getFullYear(),
      "month" : (new Date()).getMonth(),
      "popup" : false,
      "pulledDateEvents" : false,
      "events" : []
    });

    const [cookies, setCookie] = useCookies();
    const monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"];

     async function setPopup(val) {
      setState({
        ...currState,
        "popup" : val
      });
    }

    async function changeMonth(ch) {
      let newMonth = (currState.month+ch) % 12;
      if (newMonth < 0) {
        newMonth += 12
      }

      setState({
        ...currState,
        "month" : newMonth,
        "pulledDateEvents" : false
      });
    }
    
    async function changeYear(ch) {
      setState({
        ...currState,
        "year" : currState.year + ch,
        "pulledDateEvents" : false
      });
    }

    async function logout() {
      setCookie("username", "");
      setCookie("userID", "");
      window.location.reload();
    }

    async function getCurrentEvents() {
      let currDate = new Date(currState.year, currState.month, 0);

      var endDate;
      if (currState.month !== 11) 
        endDate = new Date(currState.year, currState.month+1, 0);
      else
        endDate = new Date(currState.year+1, 0, 0);

      let response = await axios.post("http://localhost:5300/event/user/range/" + cookies.userID, {
        inicio : currDate.getTime(),
        fim : endDate.getTime()
      });

      setState({
        ...currState,
        'events' : response.data,
        "pulledDateEvents" : true
      });
    }

    if (!currState.pulledDateEvents) {
      getCurrentEvents();
    }

    let currDate = new Date(currState.year, currState.month, 0);
    return (
<>
<nav class='navbar navbar-expand-lg navbar-light bg-light' >
  <a class="navbar-brand username">{cookies.username}</a>
  <button type="button"  onClick={() => {logout()}} id="logoutButton"
  class="btn btn-secondary pull-left">Logout</button>
</nav>

{currState.popup &&
<EventForm close={() => {setPopup(false)}}/>}

{currState.popup &&
<div id="blackScreen"></div>}

<div id="mainTitleDiv">
    <h2 id="mainTitle">
      {monthNames[currState.month]}
      <div class="btn-group-vertical">
      <button class="btn btn-light btn-sm" onClick={()=>{changeMonth(1)}}>+</button>
      <button class="btn btn-light btn-sm" onClick={()=>{changeMonth(-1)}}>-</button>
      </div>
      &nbsp;
      &nbsp;
      {currState.year}
      <div class="btn-group-vertical">
      <button class="btn btn-light btn-sm" onClick={()=>{changeYear(1)}}>+</button>
      <button class="btn btn-light btn-sm" onClick={()=>{changeYear(-1)}}>-</button>
      </div>
    </h2>
    <button type="button" onClick={() => setPopup(true)}
    class="btn btn-secondary btn-sm">Create Event +</button>
    
</div>

  

<div className='monthDays'>
  {[...Array((currDate.getDay()+1)%7).keys()].map(n => 
      <MonthDay day={n} dummy={true} key={'dummy'+n.toString()}/>
    )}
  {[...Array(currDate.getDate()).keys()].slice(1).map(n => 
    <MonthDay 
      events={currState.events}
      year={currState.year}
      month={currState.month}
      day={n}  
      dummy={false} 
      key={'day'+n.toString()}/>
  )}
</div>
</>
  );
}

export default MainPage;
