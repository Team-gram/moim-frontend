<template>
  <div class="ChatBackground">
    <PreviousChat></PreviousChat>
    <PresentChat></PresentChat>
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
    margin-bottom : 50px;
  }
</style>