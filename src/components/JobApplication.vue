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

    <div class="job-application">
      <div class="card">
        <h5><b>JOB APPLICATION</b></h5>
        <q-layout>
          <q-page-container>
            <q-page>
              <q-form
                ref="jobForm"
                @submit.prevent="validateAndSubmit"
                class="form"
              >
                <q-input v-model="userName" label="Name" icon="mdi-account" />
                <q-input
                  v-model="email"
                  label="Email"
                  type="email"
                  icon="mdi-email"
                  :rules="[emailRule]"
                  hint="abc@gmail.com"
                />
                <q-select
                  v-model="qualification"
                  label="Qualification"
                  :options="qualificationOptions"
                  icon="mdi-school"
                />
                <q-input
                  v-model="cnic"
                  label="CNIC"
                  icon="mdi-card-account-details"
                  :rules="[cnicRule]"
                  hint="Enter your CNIC number without dashes or spaces (e.g., 1234512345678)"
                />
                <q-input
                  v-model="address"
                  label="Address"
                  icon="mdi-map-marker"
                />
                <q-input
                  v-model="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  icon="mdi-phone"
                  :rules="[phoneRule]"
                  hint="Must be 11 digits"
                />
                <q-input
                  v-model="age"
                  label="Age"
                  type="number"
                  icon="mdi-calendar"
                  :rules="[ageRule]"
                />
                <span><b>Upload your Resume</b></span> <br /><br />
                <q-uploader
                  label="Upload Resume"
                  accept=".pdf,.doc,.docx"
                  @added="onFileAdded"
                  :max-files="1"
                  icon="mdi-upload"
                  class="CVUploader"
                />
                <!-- <q-btn label="Submit" color="primary" class="submit-btn" /> -->
                <q-btn
                  label="Submit"
                  color="primary"
                  class="submit-btn"
                  @click="submitFormAPI"
                />
              </q-form>
            </q-page>
          </q-page-container>
        </q-layout>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      email: "",
      qualification: "",
      cnic: "",
      address: "",
      phoneNumber: "",
      age: "",
      resumeFile: null,
      qualificationOptions: [
        "High School Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate (Ph.D.)",
        "GED (General Educational Development)",
        "Associate Degree",
        "Professional Degree (MD, JD, etc.)",
        "Vocational Training/Certification",
        "Trade School Certification",
      ],
    };
  },
  methods: {
    validateAndSubmit() {
      this.$refs.jobForm.validate().then((success) => {
        if (success) {
          this.submitForm();
        } else {
          console.log("Form validation failed");
        }
      });
    },
    submitForm() {
      const formData = new FormData();
      formData.append("userName", this.userName);
      formData.append("email", this.email);
      formData.append("qualification", this.qualification);
      formData.append("cnic", this.cnic);
      formData.append("address", this.address);
      formData.append("phoneNumber", this.phoneNumber);
      formData.append("age", this.age);
      if (this.resumeFile) {
        formData.append("resume", this.resumeFile);
      }
      // Replace 'YOUR_BACKEND_API_URL' with your actual backend API endpoint
      fetch("http://192.168.11.172:3000/submit-form ", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Handle success response here
          // e.g., show a success message
          console.log("Form submitted successfully");
        })
        .catch((error) => {
          // Handle error scenario
          console.error("There was a problem with form submission:", error);
        });
    },
    submitFormAPI() {
      this.$refs.jobForm.validate().then((success) => {
        if (success) {
          this.submitForm();
        } else {
          console.log("Form validation failed");
        }
      });
    },
    onFileAdded(file) {
      this.resumeFile = file;
    },
  },
  computed: {
    emailRule() {
      return [
        (value) => !!value || "Email is required",
        (value) => /.+@.+\..+/.test(value) || "Invalid email",
      ];
    },
    cnicRule() {
      return [
        (value) => !!value || "CNIC is required",
        (value) =>
          /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/.test(value) || "Invalid CNIC format",
      ];
    },
    phoneRule() {
      return [
        (value) => !!value || "Phone number is required",
        (value) => /^[0-9]{11}$/.test(value) || "Invalid phone number",
      ];
    },
    ageRule() {
      return [
        (value) => !!value || "Age is required",
        (value) => /^[0-9]+$/.test(value) || "Invalid age",
      ];
    },
  },
};
</script>

<style scoped>
.job-application {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  max-width: 700px;
  width: 100%;
  margin: 20px;
}

.form {
  margin-top: 20px;
}

.CVUploader {
  margin-left: auto;
  margin-right: auto;
}

/* Responsive classes for smaller devices */
@media only screen and (max-width: 768px) {
  .card {
    padding: 10px;
  }
}
.submit-btn {
  margin-top: 25px;
}
.navbar {
  height: 70px;
}
.card {
  margin-top: 90px;
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
