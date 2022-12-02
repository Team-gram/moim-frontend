<template>
  <div>
    <div class="ChatBackground" id="chatscroll" style="overflow: auto; height:400px">
      <PreviousChat></PreviousChat>
      <PresentChat></PresentChat>
    </div>
    <InputChat :socket="socket"></InputChat>
  </div>
</template>


<script>
import { io } from "socket.io-client";
import PreviousChat from "@/components/team/chat/PreviousChat.vue"
import InputChat from "@/components/team/chat/InputChat.vue"
import PresentChat from "@/components/team/chat/PresentChat.vue"
import { mapGetters,mapMutations } from "vuex";
export default {
  components:{
    PreviousChat,
    PresentChat,
    InputChat,
  },
  data() {
    return {
      socket:null,
    };
  },
  methods:{
    ...mapMutations("chatStore",{pushnewchat : 'pushnewchat'}),
  },
  computed:{
    ...mapGetters("searchStore",{MoimId :'getSelectedMoimId'}),
  },
  created() {
    this.socket = io("http://ec2-54-180-16-76.ap-northeast-2.compute.amazonaws.com:3000",{
      cors: { origin: "*"}
    });
    this.socket.on("chat", (data) => {
      if(data.moimId==this.MoimId){
        this.pushnewchat(data);
      }
    });
    
  },
  mounted(){
    const schroll = document.getElementById("chatscroll");
    schroll.scrollTop = schroll.scrollHeight;
  },
  destroyed(){
    this.socket.off('chat');
  }
};
</script>
<style>
.ChatBackground{
  margin-left : 16px;
  margin-right : 16px;
  margin-bottom : 10px;
}
.ChatBackground::-webkit-scrollbar {
  width: 5px;
}
.ChatBackground::-webkit-scrollbar-track {
  background-color: transparent;
}
.ChatBackground::-webkit-scrollbar-thumb {
  border-radius: 3px;
  height: 50%;
  background-color: gray;
}
.ChatBackground::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}
</style>