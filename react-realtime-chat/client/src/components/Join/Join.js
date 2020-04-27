import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css'

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className='heading'>Join</h1>
                    <div><input type="text" placeholder="" onChange={(e) => setName(e.target.value)} className="joinInput" /></div>
                    <div><input type="text" placeholder="" onChange={(e) => setRoom(e.target.value)} className="joinInput mt-20" /></div>
                    <Link to={`/chat?name=${ name}&room=${ room }`} onClick={ e => (!name || !room) ? e.preventDefault() : null }>
                        <button type="submit" className="button mt-20">Sign In</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Join;