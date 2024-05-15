<template>
    <div>
      <h1>Live Dashboard</h1>
      <ul>
        <li v-for="user in users" :key="user.user_id">
          User ID: {{ user.user_id }}, Max user: {{ user.max_score }}
        </li>
      </ul>
    </div>
  </template>
<script setup>
import { io } from "socket.io-client";
import { ref, onMounted, onUnmounted } from 'vue';

const users = ref([]);
const socket = io(process.env.VUE_APP_SOCKET_URL,{transports: ['websocket'],upgrade: false});

onMounted(() => {
    connectToSocket();
})
const connectToSocket = () => {
    // Connect to the server; replace 'http://localhost:3000' with your server's URL if different
    socket.emit('score request')

    socket.on('score update', (newUsers) => {
        users.value = newUsers;
    });

    socket.on('connect_error', (error) => {
        console.error("Connection failed:", error);
    });
}
onUnmounted(()=> {
    if (socket) {
       socket.off('score update');
       socket.disconnect();
    }
})
</script>
  
  <style>
  /* Add styles if needed */
  </style>
  