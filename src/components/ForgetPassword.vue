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
          <router-link to="/JobApplication" class="loginlink text-white"
            >Login</router-link
          >
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
        // Call your API here with this.email
        try {
          // Simulating API call with a timeout
          await this.simulateAPI();
          this.email = "";
          this.resettingPassword = false;
          this.$q.notify({
            color: "positive",
            position: "top",
            message: "Password reset email sent successfully!",
          });
        } catch (error) {
          console.error("Error:", error);
          this.resettingPassword = false;
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Failed to send reset email. Please try again.",
          });
        }
      }
    },
    simulateAPI() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000); // Simulated API call delay
      });
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

  /* Updated styles to center the card */
  margin: 0 auto; /* Centers the card horizontally */
}

.email-input {
  width: 100%;
}

.navbar {
  height: 70px;
}

.joblogo {
  width: 100px; /* Increase or decrease the width as needed */
  height: 70px;
}

.logo-text {
  margin-left: 10px; /* Adjust spacing between logo and text */
  font-size: 25px; /* Adjust font size as needed */
  font-weight: bold; /* Optionally, adjust font weight */
  color: white; /* Text color */
  /* Add any other necessary styles for the logo text */
}

/* Responsive Styles */
@media screen and (max-width: 576px) {
  .logo-text {
    font-size: 20px; /* Modify font size for smaller screens */
  }
}
</style>
