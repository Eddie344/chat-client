<template>
  <div class="bg-gray-50 h-screen flex">
    <div
      class="max-w-lg w-full shadow-md mx-auto bg-gradient-to-r from-emerald-100 to-violet-100 flex flex-col"
    >
      <ul
        class="flex-grow p-4 flex flex-col gap-y-4 overflow-y-auto"
        ref="messagesContainer"
      >
        <li
          v-for="(message, i) in messages"
          :key="i"
          class="py-3 px-4 shadow-sm rounded-xl bg-white max-w-sm self-start"
          :class="[
            message.senderId === socket.id
              ? 'bg-blue-50 self-end'
              : 'bg-white self-start',
          ]"
        >
          <p class="text-sm">
            {{ message.text }}
          </p>
        </li>
      </ul>
      <form
        @submit.prevent="send"
        class="flex items-center bg-gray-100 p-2 gap-x-2"
      >
        <input
          type="text"
          v-model="message"
          class="flex-grow py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
        />
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-400 transition text-white py-2 px-4 rounded-full"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { io } from 'socket.io-client';
import { nextTick, ref } from 'vue';
const socket = io('localhost:8000');

const message = ref('');
const messages = ref([]);
const messagesContainer = ref();

socket.on('connect', () => {
  console.log(`My id: ${socket.id}`);
});

socket.on('user connected', (user) => {
  console.log(`User ${user.userId} connected`);
});

const scrollToBottom = () => {
  nextTick(() => {
    messagesContainer.value?.scroll({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth',
    });
  });
};

socket.on('message', (message) => {
  messages.value.push({
    text: message.text,
    senderId: message.senderId,
  });
  scrollToBottom();
});

const send = () => {
  if (!message.value) return;
  socket.emit('message', {
    text: message.value,
    senderId: socket.id,
  });
  messages.value.push({
    text: message.value,
    senderId: socket.id,
  });

  scrollToBottom();
  message.value = '';
};
</script>
