import React, { useState } from "react";
import mapboxgl from 'mapbox-gl';
import subways from './data/subways.json';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jMjM3NSIsImEiOiJjazJ3MnRuMXkwOHdyM25xd3V2aWp6ZWduIn0.DLl2wPIb3rDT72TZ0V7z5w';

class RenderMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -73.9,
            lat: 40.7,
            zoom:8
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container : this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        map.on('load', () => {
            map.addSource('subways', {
                'type': 'geojson',
                'data': subways
            })
            map.addLayer({
                'id': 'subways',
                'type': 'circle',
                'source': 'subways',
                'paint': {
                    'circle-color' : 'black',
                    'circle-opacity': 0.2
                }
            })
        })

        map.on('click','subways', (obj) => {
            const coordinates = obj.features[0].geometry.coordinates.slice();
            const description = obj.features[0].properties.Stop_Name;
            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            
        })
        map.on('mouseenter', 'subways', () => {
            map.getCanvas().style.cursor = 'pointer';
        })
        map.on('mouseleave', 'subways', () => {
            map.getCanvas().style.cursor = '';
        })
        
    }
    render() {
    return (
        <div>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
    )
    }
}

export default RenderMap;