<template>
  <q-layout>
    <q-page-container class="applist">
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
              {{ props.row.userName }}
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="age" :props="props">
              {{props.row.age}}
            </q-td>
            <q-td key="status" :props="props">
              {{props.row.status}}
            </q-td>
            <q-td key="action" :props="props">
              <q-btn @click="viewApplicant(row)" color="primary" label="View" />
              
            </q-td>
            <q-td key="cv" :props="props">
              <q-btn
                @click="downloadCV(row)"
                color="primary"
                label="Download CV"
              />
              
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
        await axios
          .get("http://192.168.11.172:3000/api/get-applicants")
          .then((response) => {
            this.applicants = response?.data?.data?.data;
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
.q-table {
  margin-top: 2px;
  height: 2px;
  align-items: center;
}
.applist {
  margin-top: 50px;
  margin-left: 240px;
  width: 100%;
}

.q-table {
  margin-top: 2px;
  height: 2px;
}

.q-table th {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
}

.q-table thead {
  z-index: 1;
}
.q-table th {
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
}
</style>