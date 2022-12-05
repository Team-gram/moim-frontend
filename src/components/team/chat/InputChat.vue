<template>
  <div class="inputchat" style="background-color:white;">
    <input v-model="text" class="inputtext" @keyup.enter="send()">
    <img src="@/assets/send.png" @click="send()" style="width:45px; padding-left:3px;">
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import { chatSet } from '@/services/chat'
export default {
  props:['socket'],
  data(){
    return {
      text : ''
    }
  },
    computed : {
    ...mapGetters("searchStore",{MoimId :'getSelectedMoimId',HostId:"getSelectedMoimHostId"}),
    ...mapGetters("chatStore",{chatList : 'getchatList'}),
  },
  methods : {
     send(){
      const data = {
        id: this.$cookies.get("MoimUserId"),
        moimId: this.MoimId,
        name: "이진기",
        message: this.text,
        createdAt: new Date()
      }
      this.socket.emit("chat", data);
      chatSet(data);
      this.text = "";
    },
  },
}
</script>

<style>
.inputchat{
  display: flex;
  width: 77%;
  height : 45px;
  background : #F8F8FA;
  align-items: center;
  justify-content: center;
}
.inputtext {
  border-radius: 100px;
  height: 37px;
  background-color : white;
  width : 79.5vw;
  padding-left : 10px;
  padding-right : 40px;
  padding-bottom : 5px;
}
</style>