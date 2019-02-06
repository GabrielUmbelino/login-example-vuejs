<template>
  <b-container class="home">
    <b-row class="p-3">
      <b-col xs="12" sm="10" offset-sm="1" lg="8" offset-lg="2" xl="4" offset-xl="4">
        <b-alert show variant="success">Hi you were successfully logged in.</b-alert>
      </b-col>
    </b-row>
    <div class="overlay"></div>
  </b-container>
</template>

<script>
export default {
  name: "home"
};
</script>
