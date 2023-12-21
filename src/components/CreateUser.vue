<template>
  <q-layout>
    <q-page-container>
      <q-header class="header">
        <q-header elevated>
          <q-toolbar class="navbar">
            <!-- Logo and Logo Name on the left side -->
            <q-avatar>
              <img class="joblogo" src="../assets/Myjoblogo.png" alt="Logo" />
            </q-avatar>
            <span class="logo-text">MyJob</span>
            <q-toolbar-title></q-toolbar-title>

            <!-- Login option on the right side -->
            <router-link to="/JobApplication" class="profilelink"
              >Profile</router-link
            >

            <button class="logout-button">
              <router-link to="/" class="logoutlink">Logout</router-link>
            </button>
          </q-toolbar>
        </q-header>

        <!-- Your header content goes here -->
        <!-- Example: Logo, Title, etc. -->
      </q-header>
      <q-page>
        <q-container class="q-pa-md">
          <q-form @submit="createUser" class="q-gutter-md">
            <q-card>
              <br />
              <h5><b>Create User</b></h5>

              <q-card-section class="q-pa-md">
                <q-input
                  outlined
                  v-model="user.firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                  required
                />
              </q-card-section>
              <q-card-section class="q-pa-md">
                <q-input
                  outlined
                  v-model="user.lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                  required
                />
              </q-card-section>
              <q-card-section class="q-pa-md">
                <q-input
                  outlined
                  v-model="user.email"
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  required
                />
              </q-card-section>

              <q-card-actions align="center" class="q-mt-lg">
                <q-btn
                  color="primary"
                  type="submit"
                  label="Create User"
                  class="q-px-lg"
                />
              </q-card-actions>
              <ChatBot />
            </q-card>
          </q-form>
        </q-container>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
      },
    };
  },
  methods: {
    async createUser() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://192.168.11.172:3000/api/createUser",
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.user),
          }
        );

        if (response.ok) {
          console.log("User created successfully!");

          this.user = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          };
        } else {
          // Handle error response from the API
          console.error("Error creating user:", response.statusText);
          // Optionally, display an error message to the user
        }
      } catch (error) {
        console.error("Error creating user:", error.message);
        // Handle other errors, such as network issues
        // Optionally, display an error message to the user
      }
    },
  },
};
</script>

<style scoped>
.q-input__control {
  background-color: #f5f5f5;
  border-radius: 5px;
}
.q-card {
  max-width: 400px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.q-card-section {
  display: flex;
  justify-content: center;
}
.q-btn {
  border-radius: 5px;
}
.logo-text {
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
.logout-button {
  background-color: rgb(236, 9, 9);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  height: 35px;
}
.profilelink {
  color: white;
  font: bold;
  margin-right: 20px;
}
.q-card {
  margin-top: 100px;
  max-width: 700px;
}
.navbar {
  height: 70px;
}
</style>
