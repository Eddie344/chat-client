<template>
  <div class="max-w-lg w-full mx-auto flex flex-col h-full">
    <header class="py-4 px-6 shadow">
      <h1 class="text-lg font-bold">{{ userName }}</h1>
    </header>
    <ul
      class="flex-grow p-4 flex flex-col gap-y-4 overflow-y-auto bg-gradient-to-r from-emerald-100 to-violet-100"
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
        <span
          v-if="message.senderId !== socket.id"
          class="text-sm text-gray-500"
        >
          {{ message.senderName }}
        </span>
        <p>
          {{ message.text }}
        </p>
      </li>
    </ul>
    <form
      @submit.prevent="send"
      class="flex items-center bg-gray-100 p-2 gap-x-2 shadow"
    >
      <UiInput v-model="message" block />
      <UiButton> Send </UiButton>
    </form>
  </div>
</template>

<script setup>
import socket from '@/services/socket';
import { nextTick, ref } from 'vue';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';

const props = defineProps({
  userName: String,
});

const message = ref('');
const messages = ref([]);
const messagesContainer = ref();

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
    senderName: message.senderName,
  });
  scrollToBottom();
});

const send = () => {
  if (!message.value) return;
  const messageData = {
    text: message.value,
    senderId: socket.id,
    senderName: props.userName,
  };
  socket.emit('message', messageData);
  messages.value.push(messageData);

  scrollToBottom();
  message.value = '';
};
</script>
