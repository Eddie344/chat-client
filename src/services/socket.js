import { io } from 'socket.io-client';

const socket = io('localhost:8000', {
  autoConnect: false,
});

socket.on('user connected', (user) => {
  console.log(`User ${user.userName} connected`);
});

export default socket;
