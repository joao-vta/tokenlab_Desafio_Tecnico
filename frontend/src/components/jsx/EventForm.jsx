import React, {useState} from 'react';
import { useCookies } from "react-cookie";
import axios from "axios";

const EventForm = props => {
    const [cookies, setCookie] = useCookies();

    async function deleteEvent(event) {
        let response = await axios.delete('http://localhost:5300/event/delete/' + event._id)
        .catch((error) => {
            console.log(error);
        });

        props.close();
    }

    async function editEvent(event) {
        let form = document.getElementById('eventForm');

        let startTime = Date.parse(form.startDate.value);
        let endTime = Date.parse(form.endDate.value);
        let description = form.descricao.value;

        console.log(event);

        if (!event){
            let response = await axios.post('http://localhost:5300/event/create', {
                "userID" : cookies.userID,
                "inicio" : startTime,
                "fim" : endTime,
                "descricao" : description
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            console.log('sending edit post');
            let response = await axios.put('http://localhost:5300/event/edit/' + event._id, {
                "inicio" : startTime ? startTime : event.startDate,
                "fim" : endTime ? endTime : event.endDate,
                "descricao" : description ? description : event.descricao
            }).catch((error) => {
                console.log(error);
            });
        }

        props.close();
    }

    return (
<div class="eventFormDiv">
    <div class="row">
    <h2 id="eventTitle">
        {props.editEvent ? props.editEvent.descricao.split(' ')[0] : 'Novo Evento'}
    </h2> <button type="button"  onClick={() => {props.close()}}
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

        <div class='row'>

        <a class="btn btn-primary" onClick={() => {editEvent(props.editEvent)}}
        >Submit</a>
        {props.editEvent &&
        <a class="btn btn-danger" onClick={() => {deleteEvent(props.editEvent)}}
        >Delete</a>
        }
        </div>
    </form>
</div>
  );
}

export default EventForm;
