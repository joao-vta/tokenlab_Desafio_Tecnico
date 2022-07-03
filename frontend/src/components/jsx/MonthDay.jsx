import React, {useState} from 'react';

const MonthDay = props => {
    let startDate = new Date(props.year, props.month, props.day, 0, 0, 0, 0);
    let endDate = new Date(props.year, props.month, props.day+1, 0, 0, 0, 0);
    
    let eventsInDay = [];

    if (!props.dummy && props.events){
      props.events.map((event) => {
        let eventDateStart = new Date(event.inicio);
        let eventDateEnd = new Date(event.fim);

        // verifica se o dia contem o evento
        if (eventDateStart > startDate && endDate > eventDateStart) {
          eventsInDay.push(event);

        }// verifica se o evento contem o dia
        else if ((startDate > eventDateStart && eventDateEnd > startDate) ||
                (endDate > eventDateStart && eventDateEnd > endDate) ) {
          eventsInDay.push(event);
        }
      });
    }
    console.log(props.day, eventsInDay);

    return (
<div class={props.dummy ? "monthDay dummyDay" : "monthDay"}>  
  {props.day}

  {eventsInDay.map((val) => 
    <div class='event btn btn-secondary btn-sm'>{val.descricao}</div>
  )}

</div>
  );
}

export default MonthDay;
