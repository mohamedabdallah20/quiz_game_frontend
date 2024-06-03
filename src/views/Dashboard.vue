<template>
    <div class="body">
        <div v-if="!loggedIn" class="container">
            <div class="row mt-3">
                <div class="col-12">
                    <label for="UserName" class="form-label">User Name:*</label>
                    <input id="UserName" v-model="username" type="text" class="form-control" required
                        placeholder="Enter your User Name">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <label for="Password" class="form-label">Password:*</label>
                    <input id="Password" v-model="password" type="password" class="form-control" required
                        placeholder="Enter your Password">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-3">
                    <button type="submit" @click="login" class="btn btn-primary">Login</button>
                </div>
            </div>
        </div>
        <div v-else class="container">
            <button class="btn btn-primary">
                <export-excel :data="users" name="users.xls" :fields="fields" >
                    Download Data
                </export-excel>
            </button>
            <div class="row mt-3">
                <div class="col-12">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th class="diff-color" scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th class="diff-color" scope="col">Mobile</th>
                                    <th scope="col">City</th>
                                    <th class="diff-color" scope="col">Max Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in paginatedUsers" :key="user.user_id">
                                    <th scope="row">{{ user.index }}</th>
                                    <td class="diff-color">{{ user.username }}</td>
                                    <td>{{ user.email }}</td>
                                    <td class="diff-color">{{ user.mobile }}</td>
                                    <td>{{ user.city }}</td>
                                    <td class="diff-color">{{ user.max_score }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="pagination-controls">
                <button @click="previousPage" :disabled="currentPage === 1">&lt;</button>
                <button class="currentPage">{{currentPage}}</button>
                <button @click="nextPage" :disabled="currentPage * entriesPerPage >= users.length">&gt;</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted,computed} from 'vue';
import axios from 'axios';

const fields = {
    '#': 'index',
    name: 'username',
    Email: 'email',
    Mobile: 'mobile',
    City: 'city',
    'max score': 'max_score'
}

const username = ref('');
const password = ref('');
const loggedIn = ref(false);
const users = ref([]);

const currentPage = ref(1);
const entriesPerPage = ref(50);

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

onMounted(async() => {
    if(process.env.VUE_APP_USERNAME===localStorage.getItem('username') && process.env.VUE_APP_PASSWORD===localStorage.getItem('password')){
        loggedIn.value = true;
        await fetchUsers();
    }
})
const login = async () => {
    if(process.env.VUE_APP_USERNAME===username.value && process.env.VUE_APP_PASSWORD===password.value){
        loggedIn.value = true;
        localStorage.setItem('username', username.value);
        localStorage.setItem('password', password.value);
        await fetchUsers();
    }else{
        alert("Invalid Credentials");
    }
};
const fetchUsers = async()=>{
    try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/users`)
        if(response.data.success){
            users.value = response.data.users.map((user,index) => ({index:index+1,...user,}));
        }else{
            alert("Something went wrong");
        }
    }catch (error) {
        console.error("Failed to fetch users:", error);
    }
}
</script>
<style scoped>
.body {
    position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
}
.container{
    width: 40vw !important;
}
@media screen and (max-width: 768px){
    .container{
    width: 100vw !important;
}   
}
button{
    background-color: #00a9a5 !important;
    border-radius: 0.8rem  !important;
    /* width: 10vw; */
    color: #fff !important;
    font-weight:100;
    letter-spacing: 1px;
    border-color: #00a9a5 !important;
}
.form-control{
    border-radius: 10px;
    
    border: 1.7px solid #00a9a5;
}
.form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #c9cacc;
    opacity: 1; /* Firefox */
}

.form-control:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #c9cacc;
}

.form-control::-ms-input-placeholder { /* Microsoft Edge */
    color: #c9cacc;
}
label{
    color: #c9cacc;
}
.form-check-label{
    /* font-size: 0.65rem; */
    color: black;
}
.form-check-input{
    border-color: #00a9a5;
}
.pagination-controls {
  display: flex;
  justify-content: space-around;
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
  background-color: #ccc !important;
}
.diff-color{
  background-color: #00a9a5 !important;
  text-align: left !important;
}
.table-responsive {
    max-height: 50vh;
    overflow-y: auto;
}
.table-responsive thead {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
}
.currentPage{
    background-color: #00a9a5 !important;
    color: white !important;
    border-radius: 5px !important;
    padding: 5px 10px !important;
    border: none !important;
    font-size: 0.8rem !important;

}
.table > :not(caption) > * > *{
  /* text-align: center; */
  /* font-weight: 900;
  font-size: 1.5rem; */
  opacity: 0.8;
  /* text-transform: uppercase; */
  background-color: #add7d7;

}
</style>