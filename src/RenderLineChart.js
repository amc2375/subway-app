import React, { useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, Label} from "recharts";
import {Switch} from "@rebass/forms"
import station_id_key from "./data/station_id_key.json";
import turnstile_daily from './data/turnstile_daily.json';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import styled from 'styled-components';

const StyledUpperMatter = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width:100%;
  align-items: center;
  height: 5%;
`
const StyledSelect = styled.div`

`


function RenderLineChart(props) {
  const selectedGTFS = props.gtfs;
  
  const nameResult = turnstile_daily.find(({gtfs}) => gtfs === selectedGTFS);
  //const selectedStationName = nameResult.station_lines
  // var selectedStationName = ""
  // if ((nameResult.station_lines)) {
  //   selectedStationName = nameResult.station_lines
  // }
  //const selectedStationName = station_id_key.find(element => element.gtfs == selectedGTFS)['station_lines']
  
  //const result = inventory.find( ({ name }) => name === 'cherries' );

 // console.log(result) // { name: 'cherries', quantity: 5 }


  //create options for select using station_id_key
  const SelectItems = ({data}) => 
    (data.map(obj => 
      <option value = {obj.gtfs}>{obj.station_lines}</option>
      ))

  /* testing with daily data */
  // const dailyController = {true: "ent", false:"ext"}
  // const [key, setKey] = useState(true)
  // const handleClickDaily = (event) => setKey(!key);

  const dataController = {true: "ent", false: "ent_pct_dif"}
  const [key, setKey] = useState(true)
  const handleClickData = (event) => setKey(!key);
  const clickRaw = (event) => setKey

  const [selection, setSelection] = useState(props.gtfs)
  const [y, setY] = useState([turnstile_daily.filter(function (obj) {
    return obj.gtfs === selectedGTFS;
    })])
  
  //version of y that just depends on the props 'gtfs'... depends if we're using the drop down at all
  const y2 = turnstile_daily.filter(function (obj) {
    return obj.gtfs === selectedGTFS;
  })

//handle change in the drop down menu
  const handleSelectChange = (event) => {
    const _selection = event.target.value;
    setSelection(_selection);
    const filteredArray = turnstile_daily.filter(function (obj) {
      return obj.gtfs === _selection;
    });
    setY(filteredArray);
    props.setLineStation(event.target.value)
  }
  // const handleBarSelect = (props.gtfs) => {
  //   const _selection = props.gtfs;
  //   setSelection(_selection);
  //   const filteredArray = turnstile_daily.filter(function (obj) {
  //     return obj.gtfs === _selection;
  //   });
  //   setY(filteredArray);
  // }

  //console.log(selectedGTFS)
  //console.log(selection)
  //console.log(turnstile_daily)

  return (

   
    <div>
      {/* <button onClick={(event) => handleClickData(event)}>Change to pct dif</button> */}
      {/* <Switch id = "test" value = "test"/> */}
     
      <StyledUpperMatter> 
        <StyledSelect>
        <select 
          onChange = {(event) => handleSelectChange(event)} 
          value = {selection}
          >
            <option value="" selected disabled>Choose a station</option>
            <SelectItems data = {station_id_key} />
        </select>
        </StyledSelect>
        <h3>Subway Turnstile Entries by Day</h3>
        </StyledUpperMatter>
      
        <LineChart
          width = {800}
          height = {360}
          data={y2}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          label={{ value: 'Turnstile Entries',position: 'insideTopRight' }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Line type="monotone" dataKey={dataController[key]} 
            stroke="#003049" strokeWidth = {2.5} dot ={false} name = "Entries" />
          <XAxis dataKey="date_time" height = {20}/>
          <YAxis width = {95} 
            >
                <Label value= 'Turnstile Entries' angle= {-90} position= 'insideLeft' offset={6 }
                 style={{ textAnchor: 'middle', fill:'grey' }}/>
          </YAxis>
          <Tooltip />
        </LineChart>
    

    </div>
  );
}

export default RenderLineChart;
