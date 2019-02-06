<template>
  <b-container>
    <b-row>
      <b-col xs="12" sm="10" offset-sm="1" lg="8" offset-lg="2" xl="4" offset-xl="4">
        <login-form @loginEvent="login"></login-form>
      </b-col>
    </b-row>
    <div class="overlay"></div>
  </b-container>
</template>

<script>
import LoginForm from "@/components/login/LoginForm";
export default {
  components: {
    LoginForm
  },
  methods: {
    login() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

