import React from 'react';
var Loader = require('react-loader');
const options = {
    lines: 13,
    length: 8,
    width: 3,
    radius: 15,
    scale: 1.00,
    corners: 1,
    color: '#0055FF',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 40,
    zIndex: 2e9,
    shadow: false,
    hwaccel: false,
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '200px'
};
const UDLoader = () => {
    return (
        <Loader loaded={false} options={options} className="spinner" />
    )
}

export default UDLoader;