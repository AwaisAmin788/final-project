// const socketOptions = {
//     transports: ["websocket"],
//     autoConnect: true,
//     reconnection: true,
//     reconnectionAttempts: 3,
//     timeout: 5000,
//   };
  
//   const socket = io(process.env.VUE_APP_BASE_URL, socketOptions);
  
//   let message = ref("");
  
//   const sendMessage = () => {
//     socket.emit("chat message", message.value);
//     userStore.pushChat({
//       message: message.value,
//       user: "loggedIn",
//       createdAt: new Date(),
//     });
//     message.value = "";
//   };
//   socket.on("chat message", (res) => {
//     console.log("Recived message from server", res);
//     userStore.pushChat({
//       message: res.message,
//       user: res.user,
//       createdAt: new Date(),
//     });
//   }); 