<template>
    <div>
      <div style="border: 1px solid black; width: 200px; height: 300px;">
              <ul id="content">

              </ul>
          </div>
          <br/>
    <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
    <button type="button" @click="send()" @keyup.enter="send()" class="send_btn">send</button>
    </div>
</template>


<script>
import { io } from "socket.io-client";
export default {
  data() {
    return {
      chatList:null,
      text:"",
      moimid:0,
      socket:null,
    };
  },
  methods: {
    send(){
      const data = {
        id: this.$cookies.get("MoimUserId"),
        moimId: this.moimId,
        name: "이진기",
        message: this.text,
        createdAt: new Date()
      }
      this.socket.emit("chat", data);
    },
  },
  created() {
    this.socket = io("http://ec2-54-180-16-76.ap-northeast-2.compute.amazonaws.com:3000",{
      cors: { origin: "*"}
    });
    this.socket.on("chat", (data) => {
      const li = document.createElement("li");
      li.innerText = `${data.name} : ${data.message}`;
      console.log(data);
      this.chatList.appendChild(li);
    });
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    var moiminfo = Object();
    moiminfo = this.$store.getters["searchStore/getSearchData"];
    console.log(moiminfo);
  },
  mounted(){
    const chatList = document.getElementById('content');
    this.chatList = chatList;
  }
};
</script>
<style>
#map{
  width:400px;
  height:400px;
}
</style>