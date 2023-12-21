<template>
  <q-layout>
    <q-page-container>
      <q-header elevated class="bg-primary">
        <q-toolbar class="navbar">
          <!-- Logo and Logo Name on the left side -->
          <q-avatar>
            <img class="joblogo" src="../assets/Myjoblogo.png" alt="Logo" />
          </q-avatar>
          <span class="logo-text text-white">MyJob</span>
          <q-toolbar-title></q-toolbar-title>

          <!-- Login option on the right side -->
          <button class="logout-button">
            <router-link to="/" class="logoutlink">Logout</router-link>
          </button>
          
        </q-toolbar>
      </q-header>
      <q-page>
        <q-container class="q-pa-md">
          <q-row justify="center">
            <q-col class="text-center" cols="12" sm="8" md="6" lg="4">
              <h3 class="text-h5">Reset Password</h3>
              <p class="text-subtitle1">
                Enter your email to reset your password.
              </p>
              <div class="q-mt-md">
                <q-card class="password-reset-card q-pa-md">
                  <q-form @submit.prevent="resetPassword">
                    <q-input
                      v-model="email"
                      outlined
                      placeholder="Enter your email"
                      type="email"
                      dense
                      class="email-input"
                      :rules="[emailRule]"
                    />
                    <q-btn
                      class="q-mt-md"
                      color="primary"
                      label="Reset Password"
                      type="submit"
                      :loading="resettingPassword || validatingEmail"
                      :disable="!validEmail"
                    />
                  </q-form>
                </q-card>
              </div>
            </q-col>
          </q-row>
        </q-container>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: "",
      resettingPassword: false,
      validatingEmail: false,
      emailRule: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
    };
  },
  computed: {
    validEmail() {
      return this.emailRule.every((rule) => rule(this.email) === true);
    },
  },
  methods: {
    async resetPassword() {
      if (this.validEmail) {
        this.resettingPassword = true;
        
        try {
          const response = await axios.post('http://192.168.11.172:3000/api/forget-password', {
            email: this.email,
          });
          
          if (response.data.success) {
            this.email = '';
            this.resettingPassword = false;
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Password reset email sent successfully!',
            });
          } else {
            throw new Error('Password reset failed');
          }
        } catch (error) {
          console.error('Error:', error);
          this.resettingPassword = false;
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Failed to send reset email. Please try again.',
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.bg-primary {
  background-color: #1976d2; /* Set your desired primary color */
}

.password-reset-card {
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; /* Centers the card horizontally */
}

.email-input {
  width: 100%;
}

.navbar {
  height: 70px;
}

.joblogo {
  width: 100px;
  height: 70px;
}

.logo-text {
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}

@media screen and (max-width: 576px) {
  .logo-text {
    font-size: 20px;
  }
}
</style>
