<template>
  <b-card tag="article">
    <div slot="header" class="text-left">
      <h1>Log in to our site</h1>
      <p>Enter username or password to log on</p>
    </div>

    <b-form>
      <b-form-group>
        <b-form-input type="email" v-model="form.username" placeholder="USERNAME"></b-form-input>
        <b-form-invalid-feedback v-for="error in usernameErrors" :key="error">{{error}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group>
        <b-form-input type="password" v-model="form.password" placeholder="PASSWORD"></b-form-input>
        <b-form-invalid-feedback v-for="error in passwordErrors" :key="error">{{error}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-invalid-feedback v-for="error in formErrors" :key="error">{{error}}</b-form-invalid-feedback>
      <b-button @click.prevent="onSubmit" variant="info">Sign in</b-button>
    </b-form>
  </b-card>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  name: "LoginForm",
  data() {
    return {
      loggedIn: false,
      form: {
        username: "",
        password: ""
      },
      formErrors: []
    };
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      this.formErrors = [];
      axios
        .post("/verifyPassword?key=AIzaSyAh-m6zyRVNIg-VaVULyq6CkBao_ipZkY8", {
          email: this.form.username,
          password: this.form.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          this.$store.dispatch("login", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          this.$emit("loginEvent");
        })
        .catch(() => {
          this.formErrors.push("Incorrect username or password.");
        });
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      !this.$v.form.username.required && errors.push("Username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  validations: {
    form: {
      username: { required },
      password: { required }
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 27rem;
  margin: auto;
  margin-top: 14rem;
  border-radius: 0;
  border: none;
  .card-header {
    background-color: #405f89;
    color: #fff;
    border-radius: 0;
    padding: 1.25rem 1.25rem;
    border: none;
    text-align: left;
    h1 {
      font-size: 1rem;
      font-weight: normal;
      margin-bottom: 0.4rem;
    }

    p {
      margin-bottom: 0;
      font-size: 0.8rem;
      font-weight: 300;
    }
  }
  .card-header:before {
    content: "";
    background-image: url("../../assets/padlock.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    padding: 20px 18px;
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .card-body {
    background-color: #516496;
    .invalid-feedback {
      display: block;
    }
    form {
      input.form-control {
        font-size: 0.7rem;
      }
      .btn-info {
        width: 100%;
      }
      .btn-info:focus,
      .btn-info.focus {
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    }
  }
}
</style>
