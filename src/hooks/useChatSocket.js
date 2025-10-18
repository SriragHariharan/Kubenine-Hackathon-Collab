// // useChatSocket.js
// import { useEffect, useRef, useState, useCallback } from 'react';

// const SOCKET_URL = 'ws://localhost:3000/websocket';

// export default function useChatSocket(authToken=localStorage.getItem(constants?.AUTH_TOKEN), roomId='GENERAL') {
//   const socketRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const messageIdRef = useRef(1);

//   // Function to generate unique IDs
//   const generateId = useCallback(() => `msg_${messageIdRef.current++}_${Date.now()}`, []);

//   // Login with token
//   const loginWithToken = useCallback(() => {
//     if (!socketRef.current || !authToken) return;

//     const loginId = generateId();
//     socketRef.current.send(JSON.stringify({
//       msg: 'method',
//       method: 'login',
//       params: [{ resume: authToken }],
//       id: loginId
//     }));
    
//     console.log('🔐 Logging in with token...');
//   }, [authToken, generateId]);

//   // Subscribe to room messages
//   const subscribeToRoom = useCallback(() => {
//     if (!socketRef.current || !roomId) return;

//     const subId = generateId();
//     socketRef.current.send(JSON.stringify({
//       msg: 'sub',
//       name: 'stream-room-messages',
//       params: [roomId, false],
//       id: subId
//     }));
    
//     console.log(`📡 Subscribed to room: ${roomId}`);
//   }, [roomId, generateId]);

//   // Send message function
//   const sendMessage = useCallback((messageText) => {
//     if (!socketRef.current || !isConnected || !roomId) {
//       console.error('Cannot send message: Not connected or missing roomId');
//       return;
//     }

//     const messageId = generateId();
//     socketRef.current.send(JSON.stringify({
//       msg: 'method',
//       method: 'sendMessage',
//       params: [{
//         _id: Date.now().toString(),
//         rid: roomId,
//         msg: messageText
//       }],
//       id: messageId
//     }));

//     console.log('📤 Sent message:', messageText);
//   }, [isConnected, roomId, generateId]);

//   useEffect(() => {
//     if (socketRef.current) return; // Prevent duplicate sockets

//     const socket = new WebSocket(SOCKET_URL);
//     socketRef.current = socket;

//     socket.onopen = () => {
//       console.log('✅ WebSocket connected');
//       setIsConnected(true);

//       // Send connect message
//       socket.send(JSON.stringify({
//         msg: 'connect',
//         version: '1',
//         support: ['1'],
//       }));

//       // Login and subscribe after a short delay to ensure connection is ready
//       setTimeout(() => {
//         if (authToken) {
//           loginWithToken();
//         }
//         if (roomId) {
//           subscribeToRoom();
//         }
//       }, 100);
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('📩 Received:', data);

//       // Handle ping-pong
//       if (data.msg === 'ping') {
//         socket.send(JSON.stringify({ msg: 'pong' }));
//         return;
//       }

//       // Handle new messages from subscriptions
//       if (data.msg === 'changed' && data.collection === 'stream-room-messages') {
//         const newMessage = data.fields.args[0];
//         console.log('💬 New message:', newMessage);
//         setMessages(prev => [...prev, newMessage]);
//       }

//       // Handle login response
//       if (data.msg === 'result' && data.id?.includes('msg_') && data.id?.includes('login')) {
//         if (data.error) {
//           console.error('❌ Login failed:', data.error);
//         } else {
//           console.log('✅ Login successful:', data.result);
//           // Auto-subscribe to room after successful login
//           if (roomId) {
//             subscribeToRoom();
//           }
//         }
//       }

//       // Handle subscription response
//       if (data.msg === 'ready' && data.subs) {
//         console.log('✅ Subscriptions ready:', data.subs);
//       }
//     };

//     socket.onerror = (err) => {
//       console.error('❌ WebSocket error:', err);
//       setIsConnected(false);
//     };

//     socket.onclose = () => {
//       console.warn('🔌 WebSocket closed');
//       setIsConnected(false);
//     };

//     return () => {
//       console.log('♻️ Closing socket...');
//       socket.close();
//       socketRef.current = null;
//     };
//   }, [authToken, roomId, loginWithToken, subscribeToRoom]);

//   // Re-subscribe when roomId changes
//   useEffect(() => {
//     if (isConnected && roomId) {
//       subscribeToRoom();
//     }
//   }, [isConnected, roomId, subscribeToRoom]);

//   // Re-login when authToken changes
//   useEffect(() => {
//     if (isConnected && authToken) {
//       loginWithToken();
//     }
//   }, [isConnected, authToken, loginWithToken]);

//   return {
//     isConnected,
//     messages,
//     sendMessage,
//     socket: socketRef.current
//   };
// }