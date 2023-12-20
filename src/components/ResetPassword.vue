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
                Enter your new password to reset your password.
              </p>
              <div class="q-mt-md">
                <q-card
                  class="password-reset-card q-pa-md"
                  style="
                    max-width: 400px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  "
                >
                  <q-form @submit.prevent="resetPassword">
                    <q-input
                      v-model="newPassword"
                      outlined
                      placeholder="New Password"
                      type="password"
                      dense
                      class="password-input"
                      :rules="[passwordRule]"
                    />
                    <q-input
                      v-model="confirmPassword"
                      outlined
                      placeholder="Confirm Password"
                      type="password"
                      dense
                      class="confirm-password-input"
                      :rules="[confirmPasswordRule]"
                    />
                    <q-btn
                      class="q-mt-md"
                      color="primary"
                      label="Reset Password"
                      type="submit"
                      :loading="resettingPassword"
                      :disable="!validPassword || !validConfirmPassword"
                      @click="CallAPI"
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
      newPassword: "",
      confirmPassword: "",
      resettingPassword: false,
      passwordRule: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
      ],
      confirmPasswordRule: [
        (v) => !!v || "Please confirm your password",
        (v) => v === this.newPassword || "Passwords do not match",
      ],
    };
  },
  computed: {
    validPassword() {
      return this.passwordRule.every((rule) => rule(this.newPassword) === true);
    },
    validConfirmPassword() {
      return this.confirmPasswordRule.every(
        (rule) => rule(this.confirmPassword) === true
      );
    },
  },
  methods: {
    async resetPassword() {
      if (this.validPassword && this.validConfirmPassword) {
        this.resettingPassword = true;
        try {
          await this.simulateAPI("http://192.168.11.172:3000/user/setPassword/:email");
          this.newPassword = "";
          this.confirmPassword = "";
          this.resettingPassword = false;
          this.$q.notify({
            color: "positive",
            position: "top",
            message: "Password reset successfully!",
          });
        } catch (error) {
          console.error("Error:", error);
          this.resettingPassword = false;
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Failed to reset password. Please try again.",
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
.password-input,
.confirm-password-input {
  width: 100%;
}
.password-reset-card {
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* Updated styles to center the card */
  margin: 0 auto; /* Centers the card horizontally */
}
.logo-text {
  margin-left: 10px; /* Adjust spacing between logo and text */
  font-size: 25px; /* Adjust font size as needed */
  font-weight: bold; /* Optionally, adjust font weight */
  color: white; /* Text color */
  /* Add any other necessary styles for the logo text */
}
.joblogo {
  width: 100px; /* Increase or decrease the width as needed */
  height: 70px;
}
.navbar {
  height: 70px;
}
</style>
