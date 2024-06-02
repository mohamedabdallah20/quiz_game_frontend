<template>
    <div class="body">
        <div v-if="!loggedIn" class="container">
            <div class="row mt-3">
                <div class="col-12">
                    <label for="UserName" class="form-label">User Name:*</label>
                    <input id="UserName" v-model="username" type="text" class="form-control" required placeholder="Enter your User Name">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <label for="Password" class="form-label">Password:*</label>
                    <input id="Password" v-model="password" type="password" class="form-control" required placeholder="Enter your Password">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-3">
                    <button type="submit" @click="login" class="btn btn-primary">Login</button>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');
const loggedIn = ref(false);
const users = ref([]);

onMounted(async() => {
    if(process.env.VUE_APP_USERNAME===sessionStorage.getItem('username') && process.env.VUE_APP_PASSWORD===sessionStorage.getItem('password')){
        loggedIn.value = true;
        await fetchUsers();
    }
})
const login = async () => {
    if(process.env.VUE_APP_USERNAME===username.value && process.env.VUE_APP_PASSWORD===password.value){
        loggedIn.value = true;
        sessionStorage.setItem('username', username.value);
        sessionStorage.setItem('password', username.value);
        await fetchUsers();
    }else{
        alert("Invalid Credentials");
    }
};
const fetchUsers = async()=>{
    try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/users`)
        if(response.data.success){
            users.value = response.data.users;
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
}
.container{
    width: 40vw !important;
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
</style>