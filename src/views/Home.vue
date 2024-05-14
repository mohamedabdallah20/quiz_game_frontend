<template>
  <div class="logo">
    <img alt="Hisense Image" src="../assets/Feature-image.png">
  </div>
  <div class="body">
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
  height: 800px;
  width: 1024;
}
.logo img{
  height: 100%;
  /* width: 100%; */
}
.body{
  min-height: 50vh;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
}
</style>