<template>
  <q-layout>
    <q-page-container>
      <q-header class="header">
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
      </q-header>

      <q-page>
        <q-table
          :rows="pagedData"
          :columns="columns"
          row-key="id"
          :rows-per-page-options="[10]"
        >
          <template v-slot:body-cell-id="props">
            {{ props.row.id }}
          </template>
          <template v-slot:body-cell-name="props">
            {{ props.row.name }}
          </template>
          <template v-slot:body-cell-email="props">
            {{ props.row.email }}
          </template>
          <template v-slot:body-cell-activity="props">
            {{ props.row.activity }}
          </template>
          <template v-slot:body-cell-time="props">
            {{ props.row.time }}
          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      logsData: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: "id",
          sortable: true,
        },
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          required: true,
          label: "Email",
          align: "left",
          field: "email",
          sortable: true,
        },
        {
          name: "activity",
          required: true,
          label: "Activity",
          align: "left",
          field: "activity",
          sortable: true,
        },
        {
          name: "time",
          required: true,
          label: "Time",
          align: "left",
          field: "time",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    pagedData() {
      const { page, rowsPerPage } = this.pagination;
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      return this.logsData.slice(startIndex, endIndex);
    },
  },
  //life cycle hooks
  mounted() {
    fetch("http://192.168.11.172:3000/get-applicants")
      .then((response) => response.json())
      .then((data) => {
        this.logsData = data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>

<style>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Arial", sans-serif;
}

.custom-table th {
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  font-weight: bold;
}

.custom-table td {
  padding: 10px;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table tbody tr:hover {
  background-color: #e2e2e2;
  cursor: pointer;
}
.navbar {
  height: 70px;
  margin-top: 0px;
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
.q-table {
  margin-top: 100px;
}
.logoutlink {
  text-decoration: none;
  color: white;
}
.profilelink {
  color: white;
  font: bold;
  margin-right: 20px;
  text-decoration: none;
  font-size: 16px;
}
</style>
