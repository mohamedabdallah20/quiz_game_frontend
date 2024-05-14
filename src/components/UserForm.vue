<template>
    <div class="container mt-5 body">
        <form @submit.prevent="handleSubmit" class="row g-3">
            <div class="row">
                <div class="col-md-6">
                    <label for="name" class="form-label">Name:<span class="asteric"
                            style="vertical-align: bottom;">*</span></label>
                    <input id="name" v-model="form.name" type="text" class="form-control" placeholder="Enter your name"
                        required>
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email:<span class="asteric"
                            style="vertical-align: bottom;">*</span></label>
                    <input id="email" v-model="form.email" type="email" class="form-control"
                        placeholder="Enter your email" required>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-md-6">
                    <label for="mobile" class="form-label">Mobile Number:<span class="asteric"
                            style="vertical-align: bottom;">*</span></label>
                    <input id="mobile" v-model="form.mobile" type="text" class="form-control"
                        placeholder="Enter your Mobile" required>
                </div>
                <div class="col-md-6">
                    <label for="city" class="form-label">City:<span class="asteric"
                            style="vertical-align: bottom;">*</span></label>
                    <input id="city" v-model="form.city" type="text" class="form-control" placeholder="Enter your City"
                        required>
                </div>
            </div>
            <div class="col-12 text-center mt-3">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
            <hr>
            <div class="mb-5">
                <h3 class="ms-5">Terms and conditions :</h3>
                <ul>
                    <li>Participation in the game is open to all individuals aged 18 and above.</li>
                    <li>By participating in the game, participants agree to abide by these terms and conditions.</li>
                    <li>The game will require participants to register their details including name, phone number, and
                        email address, and Location.</li>
                    <li>The participant with the highest number of correct answers within the given time will have the
                        option to be selected for the challenge.</li>
                    <li>If there is a tie between participants,, a random draw will be conducted to determine the
                        winner.</li>
                    <li>The winner will be notified via the contact information provided during registration, if the
                        winner didn’t reply back confirming in two
                        consecutive days, they will be directly eliminated.</li>
                    <li>The prize is non-transferable and cannot be exchanged for cash or any other alternatives.</li>
                    <li>Participants can participate from anywhere as long as they can attend the event on the 8th of
                        June in Riyadh on his/her own expense.</li>
                    <div class="form-check mt-3">
                        <input type="checkbox" class="form-check-input" id="terms" required>
                        <label for="terms" class="form-check-label">I have read and agree to the terms of participation in
                            the draw as clarified on this page.</label>
                    </div>
                </ul>
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive,ref } from 'vue';
import {  useRouter } from 'vue-router'

const router = useRouter()


const form = reactive({
    name: '',
    email: '',
    mobile:'',
    city:''
});

const userId = ref(null);

async function handleSubmit() {
    // Handle form submission
    try {
        const res =  await axios.post(`${process.env.VUE_APP_BACKEND_URL}/users`, form)
        // console.log(res.data.userId)
        userId.value = res.data.userId;
        router.push({ name: 'Quiz', params: { userId: userId.value } });  
    } catch (error) {
        console.error(error);
    }
}
</script>

<style scoped>
.asteric{
    color: #00a9a5;
    line-height: 0.6rem; 
    vertical-align: top;
    font-size: 2rem;
    margin-left: 0.4vw;
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
button{
    background-color: #00a9a5 !important;
    border-radius: 0.8rem  !important;
    /* width: 10vw; */
    color: #fff !important;
    font-weight:100;
    letter-spacing: 1px;
    border-color: #00a9a5 !important;
}
h3{
   color: #00a9a5;
}
ul{
    list-style-type: none;
}

li{
    color: #000;
    padding-top: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 0.9em;
}
li:before{
    color: #00a9a5;
    font-size: 1.7em;
    margin-top: -.1rem;
    content: '•';
    display: flex;
    justify-content: flex-end;
    flex: 0 0 .6em;
    line-height: .7em;
    padding-right: .4em;
}
.row{
  margin-left:0 ;
}
</style>