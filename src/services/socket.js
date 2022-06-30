import { io } from 'socket.io-client';
const url = import.meta.env.VITE_API_URL || 'localhost:8000';

const socket = io(url, {
  autoConnect: false,
});

socket.on('user connected', (user) => {
  console.log(`User ${user.userName} connected`);
});

export default socket;
