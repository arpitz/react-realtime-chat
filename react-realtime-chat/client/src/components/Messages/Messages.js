import React from 'react';
import ScrollToBtm from 'react-scroll-to-bottom';
import './Messages.css';
import Message from './Message/Message';

const Messages = ({ messages, name }) => (
    <ScrollToBtm>
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBtm>
)

export default Messages;