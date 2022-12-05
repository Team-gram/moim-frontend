<template>
  <div
    align="center"
    style="margin-top: 80px; margin-left: 20px; margin-right: 20px"
  >
    <b-row>
      <b-col>
        <b-row align-h="center">
          <b-col cols="auto" style="padding: 0 5px 0 5px">
            <div id="main-text">
              <b id="main-text-highlight">내 모임</b>
            </div>
          </b-col>
          <b-col
            cols="auto"
            style="padding: 0 5px 0 5px"
            v-if="this.$cookies.get('MoimUserId')"
          >
            <div
              @click="newmoim()"
              id="green-colored-option-button"
              style="
                width: 30px;
                height: 30px;
                border-radius: 100% !important;
                cursor: pointer !important;
                padding: 5px !important;
                margin: 15px 0 15px 0 !important;
              "
            >
              <i
                class="fa-solid fa-plus"
                style="color: white; font-size: 15px; margin: 0; padding: 0"
              ></i>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="this.$cookies.get('MoimUserId')">
      <b-col>
        <div id="list-box">
          <div
            v-for="(list, index) in moimlist"
            :key="index"
            @click="callMoim(index)"
          >
            <div
              v-if="list !== null"
              id="list-item"
              v-show="index < mylist + 4 && index >= mylist"
            >
              <b-row align-v="center">
                <b-col cols="auto">
                  <b-img
                    id="listImage"
                    :src="list.thumbnail"
                    rounded="circle"
                  ></b-img>
                </b-col>
                <b-col>
                  <b-row id="listTitle">
                    <b-col>
                      <div>{{ list["title"] }}</div>
                    </b-col>
                  </b-row>
                  <b-row id="listData">
                    <b-col cols="auto" style="padding: 0 0 0 15px">
                      <b-img
                        id="listIcon"
                        :src="require(`@/assets/person.png`)"
                      ></b-img>
                    </b-col>
                    <b-col cols="auto" style="width: 70px">
                      {{ list["maxMember"] }} 명
                    </b-col>
                    <b-col cols="auto" style="padding: 0 0 0 15px">
                      <b-img
                        id="listIcon"
                        :src="require(`@/assets/location.png`)"
                      ></b-img>
                    </b-col>
                    <b-col
                      cols="auto"
                      style="
                        width: 150px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                      "
                    >
                      {{ list["sido"] }} {{ list["sigungu"] }}
                      {{ list["sidongdo"] }}
                    </b-col>
                    <b-col cols="auto" style="padding: 0 0 0 15px">
                      <b-img
                        id="listIcon"
                        :src="require(`@/assets/mic.png`)"
                      ></b-img>
                    </b-col>
                    <b-col
                      cols="auto"
                      style="
                        width: 220px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                      "
                    >
                      {{ list["content"] }}
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
              <!-- <b-row id="listTitle" align-v="center">
                <b-col cols="auto" style="padding: 0 0 0 15px">
                  <b-img
                    style="width: 40px; height: 36px; border-radius: 45%"
                    :src="require('@/assets/test.jpg')"
                  ></b-img>
                </b-col>
                <b-col cols="auto" style="padding: 0 0 0 15px">
                  <div id="moiminfo" style="font-size: 18px">
                    {{ list["title"] }}
                  </div>
                  <div id="moiminfo">{{ list["content"] }}</div>
                  <div id="moiminfo">
                    {{ list["sido"] }} {{ list["sigungu"] }}
                    {{ list["sidongdo"] }} {{ list["maxMember"] }}명
                  </div>
                </b-col>
              </b-row> -->
            </div>
          </div>
          <div
            id="green-colored-option-button"
            style="width: 150px !important; margin-top: 40px"
          >
            <b-row>
              <b-col>
                <span @click="prevlist()">
                  <i
                    class="fa-solid fa-angle-left"
                    id="recommend-type-change-button"
                  ></i>
                </span>
              </b-col>
              <b-col>
                <div style="width: 10px"></div>
              </b-col>
              <b-col>
                <span @click="nextlist()">
                  <i
                    class="fa-solid fa-angle-right"
                    id="recommend-type-change-button"
                  ></i>
                </span>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row align-h="center" v-else>
      <b-col>
        <div style="margin-top: 30px; margin-bottom: 500px">
          로그인 후 이용 가능한 서비스입니다.
        </div></b-col
      >
    </b-row>
    <b-row style="margin-top: 80px" v-if="this.$cookies.get('MoimUserId')">
      <b-col>
        <b-row align-h="center">
          <b-col cols="auto" style="padding: 0 5px 0 5px">
            <div id="main-text">
              <b id="main-text-highlight">초대메세지</b>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="this.$cookies.get('MoimUserId')">
      <b-col>
        <div id="list-box" v-if="inviteMsgList.length > 0">
          <div v-for="(list, index) in inviteMsgList" :key="index">
            <div
              v-if="list !== null"
              id="list-item"
              style="cursor: default !important"
              v-show="
                index < currentInviteMsgCnt + 4 && index >= currentInviteMsgCnt
              "
            >
              <b-row align-v="center">
                <b-col cols="auto">
                  <b-img
                    id="listImage"
                    :src="list.moimData.thumbnail"
                    rounded="circle"
                  ></b-img>
                </b-col>
                <b-col>
                  <b-row id="listTitle">
                    <b-col>
                      <div>{{ list.moimData.title }}</div>
                    </b-col>
                  </b-row>
                  <b-row id="listData">
                    <b-col cols="auto" style="padding: 0 0 0 20px">
                      <i class="fa-solid fa-envelope"></i>
                    </b-col>
                    <b-col
                      style="
                        width: 150px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                      "
                    >
                      {{ list.message }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="auto">
                  <div
                    id="green-outline-option-button"
                    style="
                      font-size: 10px !important;
                      cursor: pointer;
                      align: right;
                      margin: 20px;
                    "
                    v-b-modal.modal-invite-detail
                    @click="setCurrentSelectedMsgDetail(list)"
                  >
                    더보기
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
          <div
            id="green-colored-option-button"
            style="width: 150px !important; margin-top: 40px"
          >
            <b-row>
              <b-col>
                <span @click="prevInviteMsgList()">
                  <i
                    class="fa-solid fa-angle-left"
                    id="recommend-type-change-button"
                  ></i>
                </span>
              </b-col>
              <b-col>
                <div style="width: 10px"></div>
              </b-col>
              <b-col>
                <span @click="nextInviteMsgList()">
                  <i
                    class="fa-solid fa-angle-right"
                    id="recommend-type-change-button"
                  ></i>
                </span>
              </b-col>
            </b-row>
          </div>
        </div>
        <div v-else style="margin-top: 50px; margin-bottom: 50px">
          받은 초대메세지가 없습니다.
        </div>
      </b-col>
    </b-row>
    <b-row style="margin-top: 80px" v-if="this.$cookies.get('MoimUserId')">
      <b-col>
        <b-row align-h="center">
          <b-col cols="auto" style="padding: 0 5px 0 5px">
            <div id="main-text">
              <b id="main-text-highlight"
                >가입신청서
                <p
                  style="
                    float: center;

                    font-size: 10px !important;
                  "
                >
                  가입신청서는 방장만 조회 가능합니다.
                </p></b
              >
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="this.$cookies.get('MoimUserId')">
      <b-col>
        <div id="list-box" v-if="this.joinMsgList.length > 0">
          <div v-for="(list, index) in joinMsgList" :key="index">
            <div
              v-if="list !== null"
              id="list-item"
              style="cursor: default !important"
              v-show="
                index < currentJoinMsgCnt + 4 && index >= currentJoinMsgCnt
              "
            >
              <b-row align-v="center">
                <b-col cols="auto">
                  <b-img
                    id="listImage"
                    :src="list.moimData.thumbnail"
                    rounded="circle"
                  ></b-img>
                </b-col>
                <b-col>
                  <b-row id="listTitle">
                    <b-col>
                      <div>{{ list.moimData.title }}</div>
                    </b-col>
                  </b-row>
                  <b-row id="listData">
                    <b-col cols="auto" style="padding: 0 0 0 20px">
                      <i class="fa-solid fa-envelope"></i>
                    </b-col>
                    <b-col
                      style="
                        width: 150px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                      "
                    >
                      {{ list.message }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="auto">
                  <div
                    id="green-outline-option-button"
                    style="
                      font-size: 10px !important;
                      cursor: pointer;
                      align: right;
                      margin: 20px;
                    "
                    v-b-modal.modal-invite-detail
                    @click="setCurrentSelectedMsgDetail(list)"
                  >
                    더보기
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
          <div id="green-colored-option-button" style="width: 150px !important">
            <b-row>
              <b-col>
                <span @click="prevJoinMsgList()">
                  <i
                    class="fa-solid fa-angle-left"
                    id="recommend-type-change-button"
                  ></i>
                </span>
              </b-col>
              <b-col>
                <div style="width: 10px"></div>
              </b-col>
              <b-col>
                <span @click="nextJoinMsgList()">
                  <i
                    class="fa-solid fa-angle-right"
                    id="recommend-type-change-button"
                  ></i>
                </span>
              </b-col>
            </b-row>
          </div>
        </div>
        <div v-else style="margin-top: 50px; margin-bottom: 50px">
          받은 가입신청서가 없습니다.
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-invite-detail"
      title="초대메세지"
      hide-footer
      centered
      style="font-family: 'NanumBarunGothic'"
    >
      <div v-if="currentSelectedMsgDetail != null">
        <b-row style="margin: 5px">
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <div style="width: 60px">모임</div>
          </b-col>
          <b-col cols="auto" style="padding: 0">
            <div>:</div>
          </b-col>
          <b-col>
            {{ currentSelectedMsgDetail.moimData.title }}
          </b-col>
        </b-row>
        <b-row style="margin: 5px">
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <div
              style="width: 60px"
              v-if="this.currentSelectedMsgDetail.type == 'INVITE'"
            >
              모임장
            </div>
            <div
              style="width: 60px"
              v-if="this.currentSelectedMsgDetail.type == 'JOIN'"
            >
              신청인
            </div>
          </b-col>
          <b-col cols="auto" style="padding: 0">
            <div>:</div>
          </b-col>
          <b-col>
            {{ currentSelectedMsgDetail.fromData.name }}
          </b-col>
        </b-row>
        <b-row style="margin: 5px">
          <b-col>
            <b-row>
              <b-col>
                <div style="width: 60px">메세지</div>
              </b-col>
            </b-row>
            <b-row style="margin: 5px 0 5px 0">
              <b-col style="padding: 0">
                <b-form-textarea
                  plaintext
                  :value="currentSelectedMsgDetail.message"
                  style="
                    background-color: #ffffff;
                    border-radius: 10px !important;
                    border: 1px solid #aaaaaa;
                    font-family: 'NanumBarunGothic';
                    padding: 5px;
                  "
                ></b-form-textarea>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col cols="auto">
            <div
              id="green-colored-option-button"
              style="margin: 10px !important; cursor: pointer"
              @click="acceptInvite"
            >
              수락하기
            </div>
          </b-col>
          <b-col cols="auto">
            <div
              id="green-colored-option-button"
              style="
                background-color: red !important;
                margin: 10px !important;
                cursor: pointer;
              "
              @click="rejectInvite"
            >
              거절하기
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { MyMoimList, MoimDetail } from "@/services/moim";
import {
  GetAllMessage,
  MessageAccept,
  MessageReject,
} from "@/services/message";
import { getUserinfo } from "@/services/login";

export default {
  data() {
    return {
      moimlist: "",
      mylist: 0,
      maxmylist: 1,
      inviteMsgList: [],
      currentInviteMsgCnt: 0,
      inviteMsgCnt: 1,
      joinMsgList: [],
      currentJoinMsgCnt: 0,
      joinMsgCnt: 1,
      currentSelectedMsgDetail: null,
    };
  },
  methods: {
    prevlist() {
      if (this.mylist >= 4) this.mylist -= 4;
    },
    nextlist() {
      if (this.mylist + 4 < this.maxmylist) this.mylist += 4;
    },
    prevInviteMsgList() {
      if (this.currentInviteMsgCnt >= 4) this.currentInviteMsgCnt -= 4;
    },
    nextInviteMsgList() {
      if (this.currentInviteMsgCnt + 4 < this.inviteMsgCnt)
        this.currentInviteMsgCnt += 4;
    },
    prevJoinMsgList() {
      if (this.currentJoinMsgCnt >= 4) this.currentJoinMsgCnt -= 4;
    },
    nextJoinMsgList() {
      if (this.currentJoinMsgCnt + 4 < this.joinMsgCnt)
        this.currentJoinMsgCnt += 4;
    },
    callMoim(index) {
      this.$store.commit(
        "searchStore/setSelectedMoimId",
        this.moimlist[index]["id"]
      );
      this.$store.commit(
        "searchStore/setSelectedMoimHostId",
        this.moimlist[index]["userId"]
      );
      this.$router.push({ name: "MoimTeam" });
    },
    newmoim() {
      this.$router.replace("/newmoim");
    },
    async setMyMoimList() {
      let response = await MyMoimList(this.$cookies.get("MoimUserId"));
      if (response.status == 200) {
        if (response.data.length == 0) {
          this.mylist = 0;
          var Nulldata = Object();
          let data = [];
          data.push({ title: "모임 정보가 존재하지 않습니다.", info: "" });
          Nulldata = data;
          this.moimlist = Nulldata;
          console.log(this.moimlist);
        } else {
          this.moimlist = response.data;
          this.maxmylist = response.data.length;
          /*
        respose data는 다음과 같은 값을 가진다.
          "id": 0,  (모임 고유 id)
          "userId": 0, (방장)
          "categoryId": 0,
          "title": "string",
          "content": "string",
          "sido": "string",
          "sigungu": "string",
          "dong": "string",
          "isPublish": "string",
          "isFreeEnter": "string",
          "maxMember": 0,
          "createDate": "2022-11-18T09:33:59.914Z",
          "moimLevel": 0
        */
        }
      }
    },
    async setCurrentSelectedMsgDetail(detail) {
      let currentMessageFrom = await getUserinfo(detail.fromId);
      var newDetail = detail;
      newDetail.fromData = currentMessageFrom.data;
      this.currentSelectedMsgDetail = newDetail;
      console.log(this.currentSelectedMsgDetail);
    },
    async acceptInvite() {
      console.log("invite!");
      let accept;
      if (this.currentSelectedMsgDetail.type == "INVITE") {
        accept = await MessageAccept(
          this.currentSelectedMsgDetail.id,
          this.currentSelectedMsgDetail.moimId,
          this.currentSelectedMsgDetail.toId
        );
      } else if (this.currentSelectedMsgDetail.type == "JOIN") {
        accept = await MessageAccept(
          this.currentSelectedMsgDetail.id,
          this.currentSelectedMsgDetail.moimId,
          this.currentSelectedMsgDetail.fromId
        );
      }

      this.$bvModal.hide("modal-invite-detail");
      this.setMyMoimList();
      this.setAllMessages();
      console.log(accept);
    },
    async rejectInvite() {
      console.log("reject!");
      let reject;
      if (this.currentSelectedMsgDetail.type == "INVITE") {
        reject = await MessageReject(
          this.currentSelectedMsgDetail.id,
          this.currentSelectedMsgDetail.moimId,
          this.currentSelectedMsgDetail.toId
        );
      } else if (this.currentSelectedMsgDetail.type == "JOIN") {
        reject = await MessageReject(
          this.currentSelectedMsgDetail.id,
          this.currentSelectedMsgDetail.moimId,
          this.currentSelectedMsgDetail.fromId
        );
      }
      this.$bvModal.hide("modal-invite-detail");
      this.setMyMoimList();
      this.setAllMessages();
      console.log(reject);
    },
    resetMessageData() {
      this.inviteMsgList = [];
      this.currentInviteMsgCnt = 0;
      this.inviteMsgCnt = 0;
      this.joinMsgList = [];
      this.currentJoinMsgCnt = 0;
      this.joinMsgCnt = 0;
      this.currentSelectedMsgDetail = null;
    },
    async setAllMessages() {
      let allMessage = await GetAllMessage(this.$cookies.get("MoimUserId"));
      console.log(allMessage);
      this.resetMessageData();

      for (var i = 0; i < allMessage.data.length; i++) {
        if (allMessage.data[i].type == "INVITE") {
          let inviteMoimData = await MoimDetail(allMessage.data[i].moimId);
          console.log(inviteMoimData);
          var inviteMessage = allMessage.data[i];
          inviteMessage.moimData = inviteMoimData.data;
          this.inviteMsgList.push(inviteMessage);
          this.inviteMsgCnt += 1;
        } else if (allMessage.data[i].type == "JOIN") {
          let joinMoimData = await MoimDetail(allMessage.data[i].moimId);
          console.log(joinMoimData);
          var joinMessage = allMessage.data[i];
          joinMessage.moimData = joinMoimData.data;
          this.joinMsgList.push(joinMessage);
          this.joinMsgCnt += 1;
        }
      }
      console.log(this.inviteMsgList);
      console.log(this.joinMsgList);
      console.log(this.joinMsgList.length);
    },
  },
  async created() {
    this.setMyMoimList();
    this.setAllMessages();
  },
};
</script>

<style>
#MymoimTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 25px;
  padding: 0px 0px 15px 0px;
  align-items: center;
}
#moiminfo {
  font-size: 15px;
}
#plus {
  padding: 0px 0px 0px 10px;
}
#Mymoimselect {
  align-items: center;
}
#listbackground {
  background-color: #f3f3f3 !important;
  border-radius: 20px !important;
  padding: 20px 30px 30px 30px;
  margin: 10px 0 10px 0;
  max-width: 1050px;
}
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 20px;
  padding: 0px 0px 0px 5px;
}
#listnodata {
  font-size: 14px;
  margin: auto;
  margin: 10px 10px 10px 0px;
  padding: 3px 0px 3px 5px;
}
#listdata {
  font-size: 14px;
  width: 14em;
  margin-left: 30px;
  background-color: #f3f3f3;
  margin: 10px 10px 10px 0px;
  border-radius: 10px !important;
  padding: 3px 0px 3px 5px;
}
#listBox {
  border-radius: 10px !important;
  border: 1px solid;
  background-color: #f1f1f1 !important;
  float: center;
  max-width: 1000px;
  padding: 20px 10px 20px 10px;
  margin: 10px 0 10px 0;
}
</style>
