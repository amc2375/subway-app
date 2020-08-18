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
`

const StyledMain = styled.div `
  display: flex;
  width: 80%;
  height: 75%;
  max-height: 75%;
  border: 1px solid red;
  
`
const StyledTop = styled.div`
  flex: 0 1 50%;
  max-height: 50%;
  min-width: 100%;
  border: 1px solid red;
  flex-wrap: wrap;
  padding: .5em;
  align-items: flex-start;
`
const StyledBottom = styled.div`
  flex: 0 1 50%;
  max-height: 50%;
  min-width: 100%;
  border: 1px solid red;
  flex-wrap: wrap;
  padding: .5em;
  align-items: flex-start;
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
  
  const [gtfs, setGtfs] = useState("test")

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
        alignItems='center'>
        <Text p={2.5} fontWeight='bold' fontSize = {25}>COVID-19 Subway Ridership</Text>
        <Box mx='auto' />
        <Link variant='nav' href='#!'>
          Profile
        </Link>
      </Flex>
      <StyledBody>
      <StyledMain>
          <StyledLeft>
            <StyledHalves>
              <RenderMap2 setLineStation = {setLineStation}/>
            </StyledHalves>
            <StyledHalves>
              <RenderLineChart gtfs = {gtfs} setLineStation = {setLineStation}/>
            </StyledHalves>
          </StyledLeft>
          <StyledRight>
            <RenderBarChart setLineStation = {setLineStation}/>
          </StyledRight>
        </StyledMain>
        </StyledBody>
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