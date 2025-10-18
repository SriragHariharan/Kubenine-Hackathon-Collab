// useChatSocket.js
import { useEffect, useRef } from 'react';

const SOCKET_URL = 'ws://localhost:3000/websocket';

export default function useChatSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) return; // Prevent duplicate sockets

    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('✅ WebSocket connected');

      // Send connect message
      socket.send(JSON.stringify({
        msg: 'connect',
        version: '1',
        support: ['1'],
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📩 Message:', data);

      if (data.msg === 'ping') {
        socket.send(JSON.stringify({ msg: 'pong' }));
      }
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    socket.onclose = () => {
      console.warn('🔌 WebSocket closed');
    };

    return () => {
      console.log('♻️ Closing socket...');
      socket.close();
    };
  }, []);
}
