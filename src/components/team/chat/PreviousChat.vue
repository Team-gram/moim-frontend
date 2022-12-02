<template>
  <div>
    <div v-for="(chat,index) in chatList" :key="index">
      <div v-if="chat.userId==id" class="myMessage">
        <div v-if="chat.createdAt != ''" class="mycreatedAt">
          {{ chat.createdAt.substr(2,8)}} {{ chat.createdAt.substr(11,5)}}
        </div>
        <div v-if="chat.content != ''" class="myContent">
          {{ chat.content }}
        </div>
        <img  v-if="chat.userId==HostId" src="@/assets/Host.png" class="hostImg">
      </div>
      <div v-else class="opponentMessage">
        <img  v-if="chat.userId==HostId" src="@/assets/Host.png" class="hostImg">
        <div class="opponentData">
          <!-- <div class="opponentName">{{chat.name}}</div> -->
          <div v-if="chat.content != ''" class="opponentContent">
            {{ chat.content }}
          </div>
        </div>
        <div v-if="chat.createdAt != ''" class="opponentcreatedAt">
          {{ chat.createdAt.substr(2,8)}} {{ chat.createdAt.substr(11,5)}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { chatGet } from '@/services/chat'
import { mapGetters,mapMutations } from "vuex";

export default{
  data(){
    return{
      // chatList: "",
      id: -1,

    };
  },
  async created(){
    this.id = this.$cookies.get("MoimUserId");
    const response = await chatGet(this.MoimId);
    if(response.status==200)
      this.setchatList(response.data);
    else
      this.setchatList("");
  },
  methods:{
    ...mapMutations("chatStore",{setchatList : 'setchatList'}),
    
  },
  computed:{
    // ...mapGetters({UserData : 'getUserData'}),
    ...mapGetters("searchStore",{MoimId :'getSelectedMoimId',HostId:"getSelectedMoimHostId"}),
    ...mapGetters("chatStore",{chatList : 'getchatList'}),
  }
}

</script>

<style>
.myMessage{
  justify-content: flex-end;
  margin-top : 16px;
  align-items : center;
  display : flex;
}
.myContent{
  word-break: break-all;
  word-wrap: normal;
  max-width: 230px;
  padding : 10px 20px;
  font-size : 14px;
  color : white;
  background-color: #00B286;
  border-radius: 8px;
}
.mycreatedAt{
  margin-right : 8px;
  color : #C4C4C4;
  font-size : 12px;
}
.hostImg{
  width : 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
}

.opponentMessage{
  display : flex;
  align-items : center;
  flex-direction: row;
}
.opponentData{
  display : flex;
  align-items:  flex-start;
  flex-direction: column;
}
.opponentName{
  font-size : 12px;
}
.opponentContent{
  word-break: break-all;
  word-wrap: normal;
  max-width: 230px;
  padding : 10px 10px;
  font-size : 14px;
  background-color: #D1EBE580;
  border-radius: 8px;
}
.opponentcreatedAt{
  margin-left : 10px;
  color : #C4C4C4;
  font-size : 12px;
}
</style>
