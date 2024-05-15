<template>
  <div class="body">
    <div class="leaderboard">
      <div class="table-responsive">
        <table class="table table-striped">
          <!-- <thead class="table-dark">
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col"></th>
            </tr>
          </thead> -->
          <transition-group name="list" tag="tbody" class="table-group-divider">
            <tr v-for="user in users" :key="user.user_id">
              <td class="diff-color" scope="row">{{ user.rank+1 }}</td>
              <td>{{ user.username }}</td>
              <td class="diff-color" >{{ user.max_score }}</td>
              <td>
                <span v-if="user.change < 0" class="arrow up">↑</span>
                <span v-else-if="user.change > 0" class="arrow down">↓</span>
                <span v-else class="arrow stop">-</span>
              </td>
            </tr>
          </transition-group>
        </table>
      </div>
    </div>
    <FooterUi />
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
import { ref, onMounted, onUnmounted } from 'vue';
import FooterUi from "@/components/FooterUi.vue";

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

<style scoped>
.body {
  display: grid;
  grid-template-rows: 1fr auto; /* 1fr for the leaderboard to take up remaining space, 'auto' for the footer */
  min-height: 100vh; /* Ensure the .body covers at least the full height of the viewport */
  grid-template-columns: 100%; /* Ensure it spans the full width */
}
.leaderboard {
  display: flex;
  justify-content: center;
  /* margin-top:auto ; */
  /* align-items: center; Center the table vertically */
  min-height: 80vh; /* Minimum height of 100% of the viewport height */
  background: url('../assets/Feature-image.png') no-repeat center center;
  background-size: cover; /* Cover the entire area of the element */
}
table{
  margin-top: 200px;
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
.table-responsive{
  max-width:60%;
  min-width: 40%;
  min-height: 50vh;
  max-height: 60vh;
}
.diff-color{
  background-color: #00a9a5;
}
td{
  opacity: 0.8;
}
/* Transition styles for moving items */
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
