import React, { useState } from "react";
//import mapboxgl from 'mapbox-gl';
import subways from './data/subways.json';
import ReactMapGL, {Source, Layer, Marker, Popup} from 'react-map-gl';
import styled from 'styled-components';

const StyledButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 8px;
    height: 8px;
`
const StyledImg = styled.img`
    width: 8px;
    height: 8px;
    opacity: 0.5;
`
const StyledMap = styled.div`
    padding-bottom:0
`

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW1jMjM3NSIsImEiOiJjazJ3MnRuMXkwOHdyM25xd3V2aWp6ZWduIn0.DLl2wPIb3rDT72TZ0V7z5w';

function RenderMap2(props) {

    const [viewport, setViewport] = useState({
        width: "45vw",
        height: "45vh",
        latitude: 40.74,
        longitude: -73.9,
        zoom: 9.2
    })

    const [selectedStop, setSelectedStop] = useState(null)

    const handleCircleClick = (event) => {
        console.log("you clicked")
    }
    const subwaysLayer = {
        id: 'subways',
        type: 'circle',
        source: 'subways',
        paint: {
            'circle-color' : 'black',
            'circle-opacity': 0.2
        },
    }
    

    return (
        <StyledMap>
        <ReactMapGL 
            {...viewport}
            onViewportChange = {nextViewport => setViewport(nextViewport)}
            mapboxApiAccessToken = {MAPBOX_TOKEN}
            >
                {subways.features.map(stop => (
                    <Marker 
                        key = {stop.properties.GTFS_Stop_ID}
                        latitude = {stop.properties.GTFS_Latitude}
                        longitude = {stop.properties.GTFS_Longitude}
                        >
                        <StyledButton 
                            //className = "marker-btn"
                            onMouseOver = {(event) => {
                                event.preventDefault();
                                setSelectedStop(stop)
                            }}
                            onMouseOut = {() => {
                                setSelectedStop(null)
                            }}
                            onClick = {(event) => {
                                event.preventDefault();
                                props.setLineStation(stop.properties.GTFS_Stop_ID)
                            }}
                            
                            >
                               <StyledImg src = "./circle.svg" alt = "Circle">
                               </StyledImg> 
                        </StyledButton>
                    </Marker>
                ))}
                {selectedStop ? (
                    <Popup 
                        latitude = {selectedStop.properties.GTFS_Latitude}
                        longitude = {selectedStop.properties.GTFS_Longitude}
                        onClose = {() => {
                            setSelectedStop(null)}}
                        >
                            <div>
                                <h3>{selectedStop.properties.Stop_Name}</h3>
                                <p>Lines: {selectedStop.properties.Daytime_Routes}</p>
                            </div>
                    </Popup> 
                ) : null}


            </ReactMapGL>
            </StyledMap>

    )
}

export default RenderMap2;
