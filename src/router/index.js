import { createRouter, createWebHashHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import ForgetPassword from "../components/ForgetPassword.vue";
import JobApplication from "../components/JobApplication.vue";
import DashboardPage from "../components/DashboardPage.vue";
import CreateUser from "../components/CreateUser.vue";
import ResetPassword from "../components/ResetPassword.vue";
import ApplicantList from "../components/ApplicantList.vue";
import UserList from "../components/UserList.vue";
import ActivityLogs from "../components/ActivityLogs.vue";
import ChatBot from "../components/ChatBot.vue"
const routes = [
  {
    path: "/",
    name: "LoginForm",
    component: LoginForm,
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/JobApplication",
    name: "JobApplication",
    component: JobApplication,
  },
  {
    path: "/DashboardPage",
    name: "DashboardPage",
    component: DashboardPage,
  },
  {
    path: "/CreateUser",
    name: "CreateUser",
    component: CreateUser,
  },
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/ApplicantList",
    name: "ApplicantList",
    component: ApplicantList,
  },
  {
    path: "/UserList",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/ActivityLogs",
    name: "ActivityLogs",
    component: ActivityLogs,
  },
  {
    path:"/ChatBot",
    name:"ChatBot",
    component:ChatBot,

  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
