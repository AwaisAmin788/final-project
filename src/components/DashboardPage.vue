
<template>
  <q-layout view="hHh lpR fFf">
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
          <router-link to="/userprofile" class="profilelink"
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

    <q-drawer show-if-above v-model="drawerLeft" side="left" bordered>
      <div class="sidebar">
        <router-link to="/UserList" class="sidebar-link">UserList</router-link>
        <router-link to="/ActivityLogs" class="sidebar-link"
          >Activity Logs</router-link
        >
        <router-link to="/JobApplication" class="sidebar-link"
          >Job Application</router-link
        >
        <router-link to="" class="sidebar-link">Applicants list</router-link>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="dashboard">
        <div class="flex-container">
          <div class="content col-8">
            <router-view></router-view>
          </div>

          <div class="col-4">
            <div class="flex justify-between align-center">
              <div>
                <q-btn
                  @click="goToCreateUser"
                  label="Create User"
                  class="create-user-btn"
                />
              </div>
              <div>
                <q-select
                  v-model="selectedStatus"
                  :options="statusOptions"
                  label="Status"
                  class="status-dropdown"
                ></q-select>
              </div>
              <div class="flex flex-1">
                <q-input
                  v-model="searchText"
                  label="Search User"
                  class="search-bar"
                />
              </div>
            </div>
            <ApplicantList />
            <ChatBot />

            <q-dialog v-model="userPopup" persistent>
              <!-- Your user information form component goes here -->
              <!-- You'll create this later -->
            </q-dialog>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import ApplicantList from "@/components/ApplicantList.vue";
import ChatBot from "@/components/ChatBot.vue";
export default {
  components: {
    ApplicantList,
    ChatBot,
  },
  data() {
    return {
      drawerLeft: true,
      userPopup: false,
      selectedStatus: null,
      statusOptions: ["Pending", "Accepted", "Rejected"],
      searchText: "",
    };
  },
  methods: {
    goToCreateUser() {
      console.log("sjdjds");
      this.$router.push({ name: "CreateUser" });
    },
  },
};
</script>

<style scoped>
.dashboard {
  height: calc(100vh - 64px); /* Adjust based on your header's height */
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #3498db;
  color: #fff;
  /* Add other header styles as needed */
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  margin-top: 65px;
}

.create-user-btn {
  background-color: #27ae60;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  /* Add other button styles as needed */
}

.status-dropdown {
  min-width: 150px;
  margin-left: 50px;
  /* Add dropdown styles */
}

.search-bar {
  flex: 1;
  margin-left: 50px;
  /* Add search bar styles */
}

.sidebar {
  background-color: white;
  padding: 40px;
  margin-left: -80px;

  /* Add sidebar styles */
}

.sidebar-link {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;

  /* Add sidebar link styles */
}
.sidebar {
  margin-top: 50px;
}
.profilelink {
  color: white;
  font: bold;
  margin-right: 20px;
  text-decoration: none;
  font-size: 16px;
}

.logout-button {
  /* Add your preferred button styles here */
  background-color: rgb(236, 9, 9);
  color: white; /* to make the text readable on the red background */
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  height: 35px;
}
.sidebar-link {
  display: block;
  margin-bottom: 25px;
  text-decoration: underline; /* Add underline to the sidebar links */
  color: #333;
  /* Add sidebar link styles */
}
.navbar {
  height: 70px;
}
.logo-text {
  margin-left: 10px; /* Adjust spacing between logo and text */
  font-size: 25px; /* Adjust font size as needed */
  font-weight: bold; /* Optionally, adjust font weight */
  color: white; /* Text color */
  /* Add any other necessary styles for the logo text */
}
.q-page-container {
  background-color: #f2f3f4;
}
.sidebar-link {
  /* Your default styles for the links */
  color: #000; /* Change the color as needed */
  text-decoration: none; /* Remove underline */

  /* Transition for smooth effect (optional but recommended) */
  transition: color 0.3s ease-in-out; /* Adjust timing as needed */
}

/* Hover effect */
.sidebar-link:hover {
  color: #00f; /* Change color on hover */
  /* You can add more styles here for the hover effect */
}
.sidebar-link {
  display: block;
  padding: 10px 15px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #fff; /* Text color */
  background-color: #3498db; /* Button background color */
  border: 2px solid #2980b9; /* Border color */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

.sidebar-link:hover {
  background-color: #2980b9; /* Darker background on hover */
  border-color: #2471a3; /* Darker border on hover */
}
.logoutlink {
  text-decoration: none;
  color: white;
}
</style>
