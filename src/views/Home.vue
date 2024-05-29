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
  min-height: 450px;
  max-height: 800px;
  margin-top: 0;
  /* width: 1024; */
}
.logo img{
  height: 100%;
  max-width: 100%;
}
.body {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; /* auto for logo and footer, 1fr for form */
  grid-template-columns: 100%;
}
footerUI {
  width: 100%;
  /* If the footer needs to always stick to the bottom: */
  margin-top: auto !important; /* Pushes the footer to the bottom of the grid */
}
userForm {
  min-height: 0 !important; /* Or another appropriate value based on content */
  max-height: 100% !important; /* Limit height to prevent overflow */
}
</style>