import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import './Chat.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;
const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => null);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <>
            <div className="outerContainer">
                <div className="container">
                    {/* Header */}
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name} />
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
                <TextContainer users={users}/>
            </div>
        </>
    )
}

export default Chat;