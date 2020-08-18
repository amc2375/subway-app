import React, { useState } from "react"
import {Label, Radio} from '@rebass/forms'
import {Box, Card, Button} from 'rebass'
import styled from 'styled-components'

import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import subways_with_tracts from './data/subways_with_tracts.json'
import census_metadata from './data/census_metadata.json'

const StyledHalves = styled.div `
    display:flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: space-around;
    width:100%;
`
const StyledButtons = styled.div`
    width: 20%;
    display:flex;
    flex-direction: column;

`
const StyledBarChart = styled.div`
    width: 75%;
`


function RenderBarChart(props) {

    const [barVar, setBarVar] = useState('DP03_0062E');
    const [legendVar, setLegendVar] = useState('Median Household Income')
    const [data, setData] = useState(subways_with_tracts.sort((a,b) => b[barVar] - a[barVar]));
    const [station, setStation] = useState()

    const boroughColors = [
        {
            borough: "Bk", color: "#003049"
        },
        {
            borough: "M", color: "#d62828"
        },
        {
            borough: "Q", color: "#f77f00"
        },
        {
            borough: "Bx", color: "#fcbf49"
        },
        {
            borough: "SI", color: "#eae2b7"
        }
    ]   

    const handleRadioClick = (event) => {
        setBarVar(event.target.id);
        setLegendVar(event.target.value)
        const _barVar = event.target.id;
        //const _legendVar = event.target.value;
        setData(data.sort((a,b) => b[_barVar] - a[_barVar]))
    }

    const handleBarClick = (data, index) => {
        setStation(data.gtfs_id);
        props.setLineStation(data.gtfs_id);
    }
    //console.log(subways_with_tracts);
    const buttonColors = ['#d62828', '#f77f00', '#fcbf49','#eae2b7', '#d62828', '#f77f00', '#fcbf49','#eae2b7', '#d62828', '#f77f00', '#fcbf49','#eae2b7']
    const RadioItems = ({data}) => 
        (data.map((obj,index) => 
     
                    <Button
                        sx = {{
                            backgroundColor:'#d62828' //buttonColors[index]
                        }}
                        variant = 'primary'
                        name = 'variable'
                        id = {obj.key}
                        value = {obj.variable_name}
                        onClick = {(event) => handleRadioClick(event)}
                        margin = {1}
                        
                    >

                    {/* <Button
                        >Something random
                    </Button> */}
                    {obj.variable_name}
                    </Button>
            

        ))

      const CustomToolTip = ({ active, payload, label}) => {
          if(active) {
              return (
                  <div className = "custom-tooltip">
                      <p className = "label">{`${label} : ${payload.value}`}</p>
                      <p className = "desc">I am confused by this help</p>
                  </div>
              )
          }
          return null;
      }
    return (
        <div>
            <StyledHalves>

                <StyledBarChart>
                <h3 style = {{marginBottom:5, marginLeft: 10}}>{legendVar}</h3>
             <ResponsiveContainer width = '100%' height = {350}>
                <BarChart
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 0,
                    }}
                    barCategoryGap = {0}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Stop_Name" tick = {false}/>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey = {barVar} name = {legendVar} barGap = {0} 
                        onClick = {handleBarClick}>
                            {data.map((entry) =>
                                <Cell fill = {entry.color} />
                            )}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
                <body style = {{textAlign: "center", marginBottom: 50}}>
                    <text style={{backgroundColor: "#d62828", padding:5, borderRadius :10, color:"white"}}>Manhattan</text>
                    <text style={{backgroundColor: "#003049", padding:5, borderRadius :10, color:"white"}}>Brooklyn</text>
                    <text style={{backgroundColor: "#fcbf49", padding:5, borderRadius :10}}>The Bronx</text>
                    <text style={{backgroundColor: "#f77f00", padding:5, borderRadius :10}}>Queens</text>
                </body>
                </StyledBarChart>

                <StyledButtons>
                <RadioItems data = {census_metadata} />
                </StyledButtons>
                
                </StyledHalves> 
                </div>

    );
}

export default RenderBarChart;

