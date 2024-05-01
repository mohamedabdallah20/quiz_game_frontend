<template>
    <div class="logo">
    <img alt="Vue logo" src="../assets/dicelogo.webp" width="200" height="200">
  </div>
  <userForm/>
  
</template>
<script>
import userForm from '../components/UserForm.vue';
export default {
  name: 'Home',
  components: {
    userForm
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
.logo{
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>