<template>
  <q-layout>
    <q-page-container class="userlist">
      <q-header elevated>
        <q-toolbar class="navbar">
          <q-avatar>
            <img class="joblogo" src="../assets/Myjoblogo.png" alt="Logo" />
          </q-avatar>
          <span class="logo-text">MyJob</span>
          <q-toolbar-title></q-toolbar-title>

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
        <template v-slot:body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="id" :props="props">
              {{ applicants.indexOf(props.row) + 1 }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.firstName }} {{ props.row.lastName }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="status" :props="props">
              {{ props.row.isVerified ? "Verified" : "Not Verified" }}
            </q-td>
            <q-td key="action" :props="props">
              <q-btn @click="viewApplicant(row)" color="primary" label="View" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      applicants: [],
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: "id",
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
      ],
    };
  },
  mounted() {
    this.fetchApplicants();
  },
  methods: {
    async fetchApplicants() {
      try {
        await axios
          .get(
            "http://192.168.11.172:3000/api/get-all-users",

            {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("token")
                )}`,
              },
            }
          )
          .then((response) => {
            this.applicants = response?.data?.users;
            console.log(response);
          });
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    },
    viewApplicant(applicant) {
      console.log("View Applicant:", applicant);
    },
    downloadCV(applicant) {
      console.log("Download CV of Applicant:", applicant);
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
</style>