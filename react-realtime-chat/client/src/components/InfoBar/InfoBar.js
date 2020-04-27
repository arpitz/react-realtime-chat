import React from 'react';
import './InfoBar.css';
import * as onlineIcon from '../../images/onlineIcon.png';
import * as closeIcon from '../../images/closeIcon.png';

const InfoBar = () => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            <h3>RoomName</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
    </div>
)

export default InfoBar;