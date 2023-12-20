<template>
  <q-layout>
    <q-page-container class="userlist">
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

      <h5><b>Users List</b></h5>

      <q-table
        :rows="applicants"
        :columns="columns"
        row-key="applicantId"
        :pagination="true"
        :rows-per-page-options="[10]"
      >
        <!-- Slot for Action column -->
        <template v-slot:body-cell-action="{ row }">
          <q-td :props="props">
            <q-btn @click="viewApplicant(row)" color="primary" label="View" />
          </q-td>
        </template>
        <!-- Slot for CV column -->
        <template v-slot:body-cell-cv="{ row }">
          <q-td :props="props">
            <q-btn
              @click="downloadCV(row)"
              color="primary"
              label="Download CV"
            />
          </q-td>
        </template>
      </q-table>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      applicants: [],
      columns: [
        {
          name: "applicantId",
          required: true,
          label: "Applicant ID",
          align: "left",
          field: "applicantId",
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "left",
          field: "email",
        },
        {
          name: "age",
          required: true,
          label: "Age",
          align: "left",
          field: "age",
        },
        {
          name: "status",
          required: true,
          label: "Status",
          align: "left",
          field: "status",
        },
        {
          name: "action",
          required: true,
          label: "Action",
          align: "left",
          field: "action",
        },
        { name: "cv", required: true, label: "CV", align: "left", field: "cv" },
      ],
    };
  },
  mounted() {
    this.fetchApplicants();
  },
  methods: {
    async fetchApplicants() {
      try {
        const response = await fetch("User list API");
        const data = await response.json();
        this.applicants = data.applicants;
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    },
    viewApplicant(applicant) {
      console.log("View Applicant:", applicant);
      // Logic to view applicant details
    },
    downloadCV(applicant) {
      console.log("Download CV of Applicant:", applicant);
      // Logic to download applicant's CV
    },
  },
};
</script>
<style>
.applicant-table {
  width: 100%;
  font-family: "Arial", sans-serif;
  border-collapse: collapse;
}

th {
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
}

td {
  padding: 10px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #e5e5e5;
}

.q-btn {
  margin: 4px;
}
.applist {
  margin-top: 50px;
  margin-left: 240px;
  width: 100%;
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
.logout-button {
  /* Add your preferred button styles here */
  background-color: rgb(236, 9, 9);
  color: white; /* to make the text readable on the red background */
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
</style>