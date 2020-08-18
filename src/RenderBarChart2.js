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
  Legend
} from "recharts";

import subways_with_tracts from './data/subways_with_tracts.json'
import census_metadata from './data/census_metadata.json'
import ntas_with_census from './data/ntas_with_census.json'
import nta_census_metadata from './data/nta_census_metadata.json'

const StyledHalves = styled.div `
  flex: 0 0 100%;
  max-height: 50%;
  min-height: 50%;
  max-width: 100%;
  border: 1px solid red;
  padding: .5em;
  overflow: hidden;
`

function RenderBarChart(props) {

    const [barVar, setBarVar] = useState('SE_A00001_001_y'); //this is just total population
    const [data, setData] = useState(ntas_with_census);
    const [station, setStation] = useState()
    const [nta, setNta] = useState()

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
        setBarVar(event.target.value);
        const _barVar = event.target.value;
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
                            backgroundColor: buttonColors[index]
                        }}
                        variant = 'primary'
                        name = 'variable'
                        id = {obj.key}
                        value = {obj.key}
                        onClick = {(event) => handleRadioClick(event)} 
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
                <RadioItems data = {nta_census_metadata} />
            </StyledHalves>
            <StyledHalves>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >    
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Stop_Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey = {barVar} onClick = {handleBarClick}>
                        {data.map((entry) =>
                            <Cell fill = {entry.color} />
                        )}
                    </Bar>
                </BarChart>
                </StyledHalves>
                </div>

    );
}

export default RenderBarChart;

