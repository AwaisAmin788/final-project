<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="page-container" style="padding-top: 20px">
      <q-page class="login-page">
        <div class="grid-container">
          <div class="welcome-message">
            <h3>
              <b class="larger-text">Welcome</b>
              <span class="spacer"></span>
              <span class="to" style="color: grey"><b>to</b></span>
              <br />
              <span class="spacer"></span>
              <span class="appName" style="color: #1976d2"
                ><b>MyJob Portal</b></span
              >
            </h3>
          </div>

          <q-card class="login-card">
            <q-card-section>
              <img class="loginlogo" src="../assets/loginImg.png" alt="" />
              <div class="text-h6"><b>Login</b></div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                filled
                v-model="email"
                label="Email"
                outlined
                dense
                type="email"
                @input="validateEmail"
                :error="emailError"
                :before="{ icon: 'email' }"
                :class="{ 'error-field': emailError }"
              />

              <q-input
                filled
                v-model="password"
                label="Password"
                outlined
                dense
                type="password"
                @input="validatePassword"
                :error="passwordError"
                :append="{
                  icon: showPassword ? 'visibility' : 'visibility_off',
                  handler: togglePasswordVisibility,
                }"
                :class="{ 'error-field': passwordError }"
              />
              <div class="q-mt-md">
                <q-btn
                  color="primary"
                  label="Login"
                  @click="attemptLogin"
                  class="q-px-md"
                  :disable="loginDisabled"
                />
              </div>
              <div class="q-mt-md text-caption">
                <router-link to="/ForgetPassword">Forgot Password?</router-link>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
      showPassword: false,
    };
  },
  methods: {
    validateEmail() {
      this.emailError = !/^\S+@\S+\.\S+$/.test(this.email)
        ? "Invalid email format"
        : null;
    },
    validatePassword() {
      this.passwordError =
        this.password.length < 8
          ? "Password must be at least 8 characters"
          : null;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async attemptLogin() {
      this.validateEmail();
      this.validatePassword();

      if (!this.emailError && !this.passwordError) {
        try {
          const response = await axios.post(
            "http://192.168.11.172:3000/api/logIn",
            {
              email: this.email,
              password: this.password,
            }
          );

          // Assuming the API returns a token upon successful login
          const { token } = response.data.data;

          // Store the token in local storage
          localStorage.setItem("token", JSON.stringify(token));

          // After successful login, navigate programmatically
          router.push("/DashboardPage");
        } catch (error) {
          // Handle login error (e.g., display an error message)
          console.error("Login failed:", error.message);
        }
      }
    },
  },
  computed: {
    loginDisabled() {
      return (
        this.emailError || this.passwordError || !this.email || !this.password
      );
    },
  },
};
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 600px;
  max-width: 90%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
}

.error-field {
  border-color: #ff0000;
}
.page-container {
  padding-left: 0px !important;
}
.login-card[data-v-8dac4566] {
  width: 350px;
  max-width: 90;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.loginlogo {
  width: 100px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.welcome-message {
  animation: fadeIn 1s ease forwards;
}

.welcome-drawer {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  width: 250px;
}
.logo-text {
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
.joblogo {
  width: 100px;
  height: 70px;
}
.title {
  width: 60px;
  margin-top: 110px;
  margin-left: 30px;
}
.navbar {
  height: 70px;
}
.text-h6 {
  color: grey;
}
.loginlink {
  font-size: 17px;
  color: white;
  margin-right: 20px;
  text-decoration: none;
  font-size: 18px;
}
.spacer {
  margin-right: 10px;
}
.larger-text {
  font-size: 55px;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  justify-items: center;
  text-align: center;
  padding: 0 20px;
}

h3 {
  font-size: 3vw;
}

@media screen and (max-width: 768px) {
  h3 {
    font-size: 5vw;
  }
}
</style>
