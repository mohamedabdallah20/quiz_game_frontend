<template>
  <div class="body">
    <div class="logo">
      <img alt="Hisense Image" src="../assets/Feature-image.png">
    </div>
    <userForm />
    <footerUI />
  </div>

</template>
<script>
import userForm from '../components/UserForm.vue';
import footerUI from '../components/FooterUi.vue';
export default {
  name: 'Home',
  components: {
    userForm,
    footerUI
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
  min-height: 450px;
  margin-top: 0;
  /* width: 1024; */
}
.logo img{
  max-height: 100%;
  max-width: 100%;
}
.body {
  display: grid;
  /* max-height: 100vh; */
  min-height: 100vh; 
  grid-template-rows: auto 1fr auto; /* 1fr for the leaderboard to take up remaining space, 'auto' for the footer */
  grid-template-columns: 100%; /* Ensure it spans the full width */
}
</style>