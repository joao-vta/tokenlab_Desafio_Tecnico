import React, {useState} from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";

const EventForm = props => {
    const [cookies, setCookie] = useCookies();

    async function createEvent() {
        let form = document.getElementById('eventForm');

        let startTime = Date.parse(form.startDate.value);
        let endTime = Date.parse(form.endDate.value);
        let description = form.descricao.value;

        let response = await axios.post('http://localhost:5300/event/create', {
            "userID" : cookies.userID,
            "inicio" : startTime,
            "fim" : endTime,
            "descricao" : description
        }).catch((error) => {
            console.log(error);
        });

        props.close();
    }

    return (
<div class="eventFormDiv">
    <div class="row">
    <h2 id="eventTitle"> Novo Evento</h2> <button type="button"  onClick={() => {props.close()}}
  class="btn btn-secondary">X</button></div>
    <form class="eventForm" id="eventForm">

        <div class="form-group">
            <label>Data de inicio</label><br/>
            <input type="datetime-local" id="startDate"/>    
        </div>

        <div class="form-group">
            <label>Data de Fim</label><br/>
            <input type="datetime-local" id="endDate"/>    
        </div>

        <div class="form-group">
            <input class="form-control form-control-lg" id="descricao" 
            type="text" placeholder="Descricao" />
        </div>

        <a class="btn btn-primary" onClick={() => createEvent()}
        >Submit</a>
    </form>
</div>
  );
}

export default EventForm;
