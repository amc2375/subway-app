import React, {useState} from 'react';
import RenderLineChart from './RenderLineChart.js'
import RenderBarChart from './RenderBarChart.js'
import RenderBarChart2 from './RenderBarChart2.js'
import RenderMap from './RenderMap.js'
import RenderMap2 from './RenderMap2.js'
import {Box, Card, Flex, Text, Link} from 'rebass'
import styled from 'styled-components';
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

const StyledCard = styled(Card)`
    background: 'blue';
    border: 'yellow';
    cursor: pointer;
    width: 700px;
    height: 200px;
`
// const StyledMain = styled.div`
//     display: flex;
//     height: 100vh;
//     flex-wrap: wrap;
//     flex-direction: row;
// `

const StyledBody = styled.div `
  justify-content: center;
  align-items: flex-start;
  display:flex;
  height: 100vh;
`

const StyledMain = styled.div `
  height: 90%;
`
const StyledTop = styled.div`
  height: 45vh;
  display:flex;
  flex-direction: row;
  align-self: flex-end;
  justify-content: space-around;
  width:100%;
`
const StyledBottom = styled.div`
  height: 50%;
  display:flex;
  flex-direction: row;
  align-self: flex-end;
  justify-content: flex-start;
  width:100%;
`

const StyledHalves2 = styled.div `
  flex: 0 0 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  border: 1px solid red;
  padding: .5em;
  overflow: hidden;
`

const StyledRight = styled.div `
  flex: 0 1 50%;
  min-height: 100%;
  max-width: 50%;
  border: 1px solid red;
  flex-wrap: wrap;
  padding: .5em;
  align-items: flex-start;
`
const StyledLeft = styled.div `
  flex: 0 1 50%;
  display: flex;
  height: 100%;
  max-width: 50%;
  flex-wrap: wrap;
  align-items: flex-start;
`
const StyledHalves = styled.div `
  flex: 0 0 100%;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  border: 1px solid red;
  padding: .5em;
  overflow: hidden;
`

function App() {

  const ListItems = ({arr}) => (arr.map(obj => <li>{obj.name}</li>))
  
  const [gtfs, setGtfs] = useState("all_stations")

  const setLineStation = (gtfs_id) => (
    setGtfs(gtfs_id)
  )

console.log(gtfs)
  return (
    <ThemeProvider theme = {theme}>
    <div className="App">
      <Flex
        px={2}
        color='white'
        bg='#003049'
        alignItems='center'
        marginBottom={10}>
        <Text p={2.5} fontWeight='bold' fontSize = {25}>COVID-19 Subway Ridership</Text>
        <Box mx='auto' />
        <Link variant='nav' href='#!'>
          About
        </Link>
      </Flex>
      <StyledMain>
        <StyledTop>
          <RenderMap2 setLineStation = {setLineStation}/>
          <RenderLineChart gtfs = {gtfs} setLineStation = {setLineStation}/>
        </StyledTop> 
        <RenderBarChart setLineStation = {setLineStation}/>   
         </StyledMain>
    </div>
    </ThemeProvider>
  );
}

export default App;


{/* <div className="App">
      <Flex flexWrap = 'wrap' mx = {-2}>
        <Box width = {1} px = {2} py = {2}>
          <RenderMap2 setLineStation = {setLineStation}/>
        </Box>
        <StyledCard>
        <Box width = {1/2} px = {2} py = {2}>
          <RenderLineChart gtfs = {gtfs} setLineStation = {setLineStation}/>
        </Box>
        </StyledCard>
        <Box width = {1/2} px = {2} py = {2}>
          <RenderBarChart setLineStation = {setLineStation}/>
        </Box>
      
      </Flex>
    </div> */}