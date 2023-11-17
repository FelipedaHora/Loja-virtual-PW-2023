import React, { useEffect, useState } from 'react';
import * as Stomp from 'webstomp-client';

const WebSocketComponent = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const connectWebSocket = () => {
            const socket = new WebSocket('ws://localhost:3000/websocket-endpoint');
            const stomp = Stomp.over(socket);

            stomp.connect({}, () => {
                setStompClient(stomp);
                console.log('Connected to WebSocket');

                stomp.subscribe('/topic/messages', (response) => {
                    const newMessage = JSON.parse(response.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            });
        };

        connectWebSocket();

        return () => {
            if (stompClient) {
                stompClient.disconnect();
                console.log('Disconnected from WebSocket');
            }
        };
    }, [stompClient]);

    const handleSendMessage = () => {
        if (stompClient && newMessage.trim() !== '') {
            stompClient.send('/app/chat', {}, JSON.stringify({ content: newMessage }));
            setNewMessage('');
        }
    };

    return (
        <div>
            <h1>Music Store Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message.content}</div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Enviar Mensagem</button>
            </div>
        </div>
    );
};

export default WebSocketComponent;
