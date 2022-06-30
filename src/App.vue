<template>
  <div class="bg-gray-50 h-screen w-full">
    <UserSettings v-if="!userName" @submit="setName" />
    <ChatRoom :user-name="userName" v-else />
  </div>
</template>

<script setup>
import socket from '@/services/socket';
import ChatRoom from '@/components/ChatRoom.vue';
import UserSettings from '@/components/UserSettings.vue';
import { ref } from 'vue';

const userName = ref('');
const setName = (config) => {
  userName.value = config.name;
  socket.auth = { userName: userName.value };
  socket.connect();
};
</script>
