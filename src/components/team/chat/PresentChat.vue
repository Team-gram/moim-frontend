<template>
  <div class="Next">
    <div v-for="(newchat,index) in newchatList" :key="index">
      <div v-if="newchat.id==id" class="myMessage">
        <div v-if="newchat.createdAt != ''" class="mycreatedAt">
          {{ newchat.createdAt.substr(2,8)}} {{ newchat.createdAt.substr(11,5)}}
        </div>
        <div v-if="newchat.message != ''" class="myContent">
          {{ newchat.message }}
        </div>
        <img  v-if="newchat.id==HostId" src="@/assets/Host.png" class="hostImg">
      </div>
      <div v-else class="opponentMessage">
        <img  v-if="newchat.id==HostId" src="@/assets/Host.png" class="hostImg">
        <div class="opponentData">
          <div class="opponentName">{{newchat.name}}</div>
          <div v-if="newchat.message != ''" class="opponentContent">
            {{ newchat.message }}
          </div>
        </div>
        <div v-if="newchat.createdAt != ''" class="opponentcreatedAt">
          {{ newchat.createdAt.substr(2,8)}} {{ newchat.createdAt.substr(11,5)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default{
  data(){
    return{
      id : -1,
    };
  },
  methods(){
    
  },
  computed:{
    ...mapGetters("chatStore",{newchatList : 'getnewchatList'}),
    ...mapGetters("searchStore",{HostId:"getSelectedMoimHostId"}),
    ...mapGetters("",{userinfo:"getUserData"}),
  },
  created(){
    this.id = this.$cookies.get("MoimUserId");
  },
  watch:{
    newchatList(){
      this.$nextTick(() => {
        const schroll = document.getElementById("chatscroll");
        schroll.scrollTop = schroll.scrollHeight - schroll.clientHeight;
      })
    }
  },
}
</script>