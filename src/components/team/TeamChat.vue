<template>
  <div class="ChatBackground">
    <PreviousChat></PreviousChat>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <button type="button" @click="send()" @keyup.enter="send()" class="send_btn">send</button>
  </div>
</template>


<script>
import { io } from "socket.io-client";
import { chatSet } from '@/services/chat'
import PreviousChat from "@/components/team/chat/PreviousChat.vue"
export default {
  components:{
    PreviousChat,
  },
  data() {
    return {
      chatList:null,
      text:"",
      moimid:-1,
      socket:null,
    };
  },
  methods: {
    send(){
      const data = {
        id: this.$cookies.get("MoimUserId"),
        moimId: this.moimid,
        name: "이진기",
        message: this.text,
        createdAt: new Date()
      }
      this.socket.emit("chat", data);
      console.log(data);
      chatSet(data);
    },
  },
  created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    this.socket = io("http://ec2-54-180-16-76.ap-northeast-2.compute.amazonaws.com:3000",{
      cors: { origin: "*"}
    });
    this.socket.on("chat", (data) => {
      // const li = document.createElement("li");
      // li.innerText = `${data.name} : ${data.message}`;
      // console.log(data);
      // this.chatList.appendChild(li);
      console.log(data.name,data.message);  
    });
    
    var moiminfo = Object();
    moiminfo = this.$store.getters["searchStore/getSearchData"];
    console.log(moiminfo);
  },
  mounted(){
    const chatList = document.getElementById('content');
    this.chatList = chatList;
  },
  destroyed(){
    this.socket.off('chat');
    this.socket.off('disconnect');
  }
};
</script>
<style>
.ChatBackground{
    margin-left : 16px;
    margin-right : 16px;
    margin-bottom : 50px;
  }
</style>