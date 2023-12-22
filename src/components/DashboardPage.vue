<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="header">
      <q-header elevated>
        <q-toolbar class="navbar">
          <q-avatar>
            <img class="joblogo" src="../assets/Myjoblogo.png" alt="Logo" />
          </q-avatar>
          <span class="logo-text">MyJob</span>
          <q-toolbar-title></q-toolbar-title>

          <router-link to="/userprofile" class="profilelink"
            >Profile</router-link
          >
          <button class="logout-button">
            <router-link to="/" class="logoutlink">Logout</router-link>
          </button>
        </q-toolbar>
      </q-header>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      side="left"
      bordered
      :show-if-above="$q.screen.lg"
    >
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
              <!-- our user information form component goes here -->
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
  watch: {
    "$q.screen.width"(val) {
      if (val < this.$q.screen.lg) {
        this.drawerLeft = false;
      } else {
        this.drawerLeft = true;
      }
    },
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
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #3498db;
  color: #fff;
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
}

.status-dropdown {
  min-width: 150px;
  margin-left: 50px;
}

.search-bar {
  flex: 1;
  margin-left: 50px;
}

.sidebar {
  background-color: white;
  padding: 40px;
  margin-left: -80px;
}

.sidebar-link {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
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
  background-color: rgb(236, 9, 9);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  height: 35px;
}
.sidebar-link {
  display: block;
  margin-bottom: 25px;
  text-decoration: underline;
  color: #333;
}
.navbar {
  height: 70px;
}
.logo-text {
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
  color: white;
}
.q-page-container {
  background-color: #f2f3f4;
}
.sidebar-link {
  color: #000;
  text-decoration: none;

  transition: color 0.3s ease-in-out;
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
