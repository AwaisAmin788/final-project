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
        const response = await fetch(
          "http://192.168.11.172:3000/api/get-applicants"
        );
        const data = await response.json();
        this.applicants = data.applicants;
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