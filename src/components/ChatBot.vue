<template>
  <div>
    <div class="chatbot-icon" @click="toggleChat" v-if="!showChat">
      <img src="../assets/chatbot.png" alt="Chatbot Icon" />
    </div>

    <div v-if="showChat" class="chat-window">
      <div class="chat-header">
        <span>Hello!</span>
        <button @click="toggleChat">Close</button>
      </div>
      <div class="chat-content">
        <p>Hello!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const showChat = ref(false);

    const toggleChat = () => {
      showChat.value = !showChat.value;
    };

    return {
      showChat,
      toggleChat,
    };
  },
};
</script>

<style scoped>
.chatbot-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ebf7ec;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.chatbot-icon img {
  width: 40px;
  height: 40px;
}

.chat-window {
  position: fixed;
  bottom: 90px; 
  right: 20px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.chat-header {
  background-color: #f0f0f0;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-content {
  padding: 20px;
}
</style>
