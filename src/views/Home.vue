<template>
    <div class="logo">
    <img alt="Vue logo" src="../assets/dicelogo.webp" width="200" height="200">
  </div>
  <userForm/>
  <!-- <div v-for="question in questions" :key="question.id">
    <h1>
      {{ question.id }} - {{ question.text }}
    </h1>
    <div v-for="choice in question.choices" :key="choice.choice_id">
      <input type="radio" :name="question.text" :id="choice.choice_id" :value="choice.choice_id">
      <label :for="choice.choice_id">{{choice.choice_text}}</label>
    </div>
  </div> -->
</template>
<script>
import axios from 'axios';
import userForm from '../components/UserForm.vue';
export default {
  name: 'Home',
  components: {
    userForm
  },
  data() {
    return {
      questions: []
    }
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/questions`)
      .then(res => {
        this.questions = res.data.questions;
      })
      .catch(err => {
        console.error("Failed to fetch questions:", err);
        // Handle errors, perhaps setting an error state or displaying a message
      });
  }
}
</script>

<style scoped>
.logo{
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>