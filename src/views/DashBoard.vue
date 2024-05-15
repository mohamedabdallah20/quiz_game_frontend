<template>
    <div class="leaderboard">
      <h2>Real-Time Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user.rank+1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.max_score }}</td>
            <td>
              <span v-if="user.change < 0" class="arrow up">↑</span>
              <span v-else-if="user.change > 0" class="arrow down">↓</span>
              <span v-else class="arrow stop">-</span>
            </td>
          </tr>
        </tbody>
      </table>
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

    socket.on('score update', (updatedUsers) => {
        if(users.value.length === 0){
            users.value = updatedUsers.map((newUser, index) => ({...newUser, rank: index,change:0}));
        }
        else{
            // Process incoming data to calculate changes
            const newUsers = updatedUsers.map((newUser,index) => {
            const existing = users.value.find(user => user.user_id === newUser.user_id);
            return {
                ...newUser,
                rank: index,
                change: existing ? index - existing.rank : 0
            };
            });
            users.value = newUsers;
        }
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
table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
.arrow.up {
  color: green;
}
.arrow.down {
  color: red;
}
.arrow.stop {
  color: grey;
}
</style>

  