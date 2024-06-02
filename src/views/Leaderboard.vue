<template>
  <div class="body">
    <!-- <div></div> -->
    <div class="leaderboard">
      <div class="logo">
        <img src="../assets/Leaderboard-text-en.png" alt="">
      </div>
      <div class="leaderboard-inner">
        <div class="leaderboard-text">
          <h6>Leaderboard</h6>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <transition-group name="list" tag="tbody" class="table-group-divider">
              <tr v-for="user in paginatedUsers" :key="user.user_id">
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
          <div class="pagination-controls">
            <button @click="previousPage" :disabled="currentPage === 1">&lt;</button>
            <button @click="nextPage" :disabled="currentPage * entriesPerPage >= users.length">&gt;</button>
          </div>
        </div>
        <div class="leaderboard-text">
          <h6>Leaderboard</h6>
        </div>
      </div>
    </div>
    <FooterUi />
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
import { ref, onMounted, onUnmounted,computed } from 'vue';
import FooterUi from "@/components/FooterUi.vue";

const users = ref([]);

const currentPage = ref(1);
const entriesPerPage = ref(9);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * entriesPerPage.value;
  const end = start + entriesPerPage.value;
  return users.value.slice(start, end);
});
function nextPage() {
  if (currentPage.value * entriesPerPage.value < users.value.length) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
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
                change: existing ? index - existing.rank : -1
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
  min-height: 100%; /* Ensure the .body covers at least the full height of the viewport */
  grid-template-rows: 1fr auto; /* 1fr for the leaderboard to take up remaining space, 'auto' for the footer */
  grid-template-columns: 100%; /* Ensure it spans the full width */
}
.logo img{
  max-height: 100%;
  max-width: 100%;
  margin-top: 0;
  /* width: 100%; */
}
.leaderboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-top:auto ; */
  align-items: center; /*Center the table vertically*/
  min-height: 100vh; /* Minimum height of 100% of the viewport height */
  background: url('../assets/Leaderboard.jpg') no-repeat center center;
  background-size: cover; /* Cover the entire area of the element */
}
.leaderboard-inner{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  /* gap: 10%; */
}
.leaderboard-text{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
}
.leaderboard-text h6{
  transform: rotate(-90deg);
  white-space: nowrap;
  display: block;
  color: white;
  font-size: 3rem;  
}
/* table{
  margin-top: 200px;
} */
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
  max-width:50vw;
  min-width: 30vw;
  min-height: 100%;
  /* max-height: 60vh; */
  border-radius: 10px;
  overflow-y: auto;
}
.table{
  /* border: none; */
  border-radius: 50px;
}
.diff-color{
  background-color: #00a9a5 !important;
  text-align: left !important;
}
.table > :not(caption) > * > *{
  /* text-align: center; */
  font-weight: 900;
  font-size: 1.5rem;
  opacity: 0.8;
  text-transform: uppercase;
  background-color: #add7d7;

}
/* Transition styles for moving items */
.list-enter-active, .list-leave-active {
  transition: transform 0.5s ease;
}
.list-enter-from,.list-leave-to {
  /* opacity: 0; */
  transform: translateY(400px);
}
.list-move {
  transition: transform 0.5s ease; 
}
.list-move {
  will-change: transform, opacity;
}

/* Pagination controls */
.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10%;
}

.pagination-controls button {
  padding: 5px 10px;
  margin: 0 0px;
  background-color: #00a9a5;
  color: black;
  border: none;
  border-radius: 5px;
}

.pagination-controls button:disabled {
  background-color: #ccc;
}
/* boarder top */
.table-group-divider{
  border-top: none;
}
/* mobile media screens */
@media screen and (max-width: 768px) {
  .table-responsive{
    margin-top: 20px;
    max-width:90%;
    min-width: 70%;
  }
  .table > :not(caption) > * > *{
    /* text-align: center; */
    font-weight: 900;
    font-size: 1rem;
  }
  .list-enter-active, .list-leave-active {
    transition: none;
  }
  .list-enter-from, .list-leave-to {
    opacity: 0;
    transform: none;
  }
  .list-move {
    transition: none; 
  }
  .leaderboard-text{
    display: none;
  }
}
</style>
