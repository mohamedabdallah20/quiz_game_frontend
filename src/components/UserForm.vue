<template>
    <div class="container mt-5">
        <form @submit.prevent="handleSubmit" class="row g-3">
            <div class="col-md-6">
                <label for="name" class="form-label">Name:</label>
                <input id="name" v-model="form.name" type="text" class="form-control" placeholder="Enter your name"
                    required>
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email:</label>
                <input id="email" v-model="form.email" type="email" class="form-control" placeholder="Enter your email"
                    required>
            </div>
            <div class="col-12 text-center">
                <button type="submit" class="btn btn-primary">Next</button>
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
    email: ''
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
/* Additional custom styles (if needed) */
</style>