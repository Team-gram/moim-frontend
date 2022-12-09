<template>
  <div>
    <b-row>
      <b-col>
        <div id="main-text">
          <b id="main-text-highlight">모임 구성원</b>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="list-box">
          <div
            id="list-item"
            style="height: 50px !important; cursor: default !important"
            v-for="member in memberList"
            :key="member.id"
          >
            <b-row align-v="center" style="padding: 5px">
              <b-col>
                <b-row align-h="between">
                  <b-col cols="auto">
                    <b-row>
                      <b-col cols="auto">
                        <img
                          v-if="
                            member.details.profileImage == undefined ||
                            member.details.profileImage == null ||
                            member.details.profileImage == ''
                          "
                          src="../assets/default-profile.png"
                          width="40"
                          height="40"
                        /><b-img
                          v-else
                          :src="`${member.details.profileImage}`"
                          rounded="circle"
                          width="40"
                          height="40"
                        />
                      </b-col>
                      <b-col style="margin: 5px 0 5px 0">
                        <b-row id="listTitle">
                          <b-col cols="auto">
                            <div>{{ member.details.name }}</div>
                          </b-col>
                          <b-col cols="auto">
                            <div
                              style="
                                font-weight: normal;
                                font-size: 12px;
                                margin: 6px 0 6px 0;
                              "
                            >
                              {{ member.details.detail }}
                            </div>
                          </b-col>
                          <b-col cols="auto" v-if="member.userId == moimHostId">
                            <i
                              class="fa-solid fa-crown"
                              style="color: #4fb26f"
                            ></i>
                          </b-col>
                        </b-row>
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
                        margin: 10px;
                      "
                      v-b-modal.modal-member
                      v-if="userId != member.userId"
                      @click="setCurrentSelectedMember(member)"
                    >
                      더보기
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal
      id="modal-member"
      size="sm"
      title="모임 구성원 관리"
      hide-footer
      centered
      style="font-family: 'NanumBarunGothic'"
      v-if="this.currentSelectedMember != null"
    >
      <b-row>
        <b-col>
          <div id="list-item" style="height: 30px !important">
            <b-row style="padding: 5px 10px 5px 10px">
              <b-col cols="auto">
                <i class="fa-solid fa-calendar" style="color: #4fb26f"></i>
              </b-col>
              <b-col>
                <div @click="[showCalendarMemberModal(), (isCalendar = true)]">
                  개인 일정 확인
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="this.userlevel >= 1">
        <b-col>
          <div
            id="list-item"
            style="height: 30px !important"
            @click="showMemberLevelModal()"
          >
            <b-row style="padding: 5px 10px 5px 10px">
              <b-col cols="auto">
                <i class="fa-solid fa-star" style="color: #4fb26f"></i>
              </b-col>
              <b-col>
                <div>등급 변경</div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div
            id="list-item"
            style="height: 30px !important"
            @click="showInviteMemberModal()"
          >
            <b-row style="padding: 5px 10px 5px 10px">
              <b-col cols="auto">
                <i class="fa-solid fa-comment" style="color: #4fb26f"></i>
              </b-col>
              <b-col>
                <div>다른 모임에 초대하기</div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row
        v-if="
          this.userlevel >= 1 && this.currentSelectedMember.level != 2
        "
      >
        <b-col>
          <div id="list-item" style="height: 30px !important" @click="checkBanishMember()">
            <b-row style="padding: 5px 10px 5px 10px">
              <b-col cols="auto">
                <i
                  class="fa-solid fa-right-from-bracket"
                  style="color: #4fb26f"
                ></i>
              </b-col>
              <b-col>
                <div>강퇴하기</div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      id="Calendar_modal"
      title="공개한 일정"
      @show="resetModal"
      @hidden="resetModal"
      centered
    >
      <MemberCalendar
        v-if="isCalendar"
        v-bind:Memberid="currentSelectedMember.id"
      ></MemberCalendar>
    </b-modal>
    <b-modal
      id="invite_modal"
      title="모임 초대하기"
      @show="resetModal"
      @hidden="resetModal"
      @ok="InviteSubmit"
      centered
    >
      <form @submit.stop.prevent="InviteSubmit">
        <b-form-group label="모임" label-for="moim-input">
          <b-form-select
            id="moim-input"
            v-model="inviteMoim"
            :options="inviteMoims"
            value-field="id"
            text-field="title"
            required
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >초대할 모임을 선택하세요</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>

        <b-form-group label="초대메세지" label-for="name-input">
          <b-form-input
            id="name-input"
            v-model="inviteMsg"
            required
            placeholder="초대메세지를 입력하세요"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="modal-level"
      size="sm"
      title="멤버 등급 변경하기"
      hide-footer
      centered
      style="font-family: 'NanumBarunGothic'"
      v-if="this.currentSelectedMember != null"
    >
      <b-row>
        <b-col>
          <div>
            현재 등급:
            <a v-if="this.currentSelectedMember.level == 0">일반 모임원</a
            ><a v-else-if="this.currentSelectedMember.level == 1">부방장</a>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <b-form-select
              v-model="levelSelected"
              :options="options"
              class="mb-3"
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- 변경할 등급을 선택하세요. --</b-form-select-option
                >
              </template>
            </b-form-select>
          </div>
        </b-col>
      </b-row>
      <b-row align="center">
        <b-col>
          <div
            id="green-colored-option-button"
            style="cursor: pointer"
            @click="changeMemberLevel()"
          >
            변경하기
          </div>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      id="modal-banish"
      size="sm"
      title="멤버 강퇴하기"
      hide-footer
      centered
      style="font-family: 'NanumBarunGothic'"
      v-if="this.currentSelectedMember != null"
    >
      <b-row>
        <b-col>
          <div>
            {{ this.currentSelectedMember.details.name }}님을 정말
            강퇴시키겠습니까?
          </div>
        </b-col>
      </b-row>
      <b-row align="center">
        <b-col>
          <div
            id="green-colored-option-button"
            style="cursor: pointer"
            @click="banishMember()"
          >
            강퇴하기
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import MemberCalendar from "@/components/MemberCalendar.vue";
import {
  getMoimMember,
  changeMoimUserLevel,
  banishMember,
} from "@/services/moim.js";
import { getUserinfo } from "@/services/login.js";
import { MyMoimList, InviteMoim } from "@/services/moim.js";
export default {
  props: ["hostId"],
  components: {
    MemberCalendar,
  },
  data() {
    return {
      moimId: null,
      memberList: null,
      userId: null,
      userlevel: null,
      moimHostId: this.$props.hostId,
      currentSelectedMember: null,
      inviteMsg: "",
      inviteMoim: null,
      inviteMoims: [],
      isCalendar: false,
      levelSelected: null,
      options: [
        { value: 0, text: "일반 모임원" },
        { value: 1, text: "부방장" },
      ],
    };
  },
  methods: {
    async getMoimMemberList(moimId) {
      this.memberList = [];
      let moimMemberList = await getMoimMember(moimId);
      // this.userinfo = userinfo;
      console.log(moimMemberList);
      this.$emit("memberCount", moimMemberList.data.length);
      for (var i = 0; i < moimMemberList.data.length; i++) {
        var userId = moimMemberList.data[i].userId;
        let userDetail = await getUserinfo(userId);
        var moimMember = moimMemberList.data[i];
        moimMember.details = userDetail.data;
        if (this.$cookies.get("MoimUserId") == userDetail.data.id) {
          this.memberList.unshift(moimMember);
          this.userlevel = moimMember.level;
        } else {
          this.memberList.push(moimMember);
        }
      }
      console.log(this.memberList);
    },
    async setCurrentSelectedMember(member) {
      this.inviteMoims = [];
      console.log(member);
      this.currentSelectedMember = member;

      let inviteMoims = await MyMoimList(this.userId); // 사용자가 가입한 모임 리스트
      let memberMoims = await MyMoimList(member.userId); // 선택한 멤버가 가입한 모임 리스트

      console.log(this.moimid);
      console.log(inviteMoims.data);
      console.log(memberMoims.data);

      for (var i = 0; i < inviteMoims.data.length; i++) {
        //참가자가 가입한 모임 리스트 순회
        var exist = false;
        for (var j = 0; j < memberMoims.data.length; j++) {
          // 선택한 멤버가 가입한 모임 리스트
          if (inviteMoims.data[i].id == memberMoims.data[j].id) {
            exist = true;
          }
        }
        if (exist == false) {
          this.inviteMoims.push(inviteMoims.data[i]);
        }
        // if (
        //   inviteMoims.data[i].id != this.moimid ||
        //   memberMoims.data.filter((e) => {
        //     return e.id == memberMoims.data[i].id;
        //   }).length < 1
        // ) {
        //   this.inviteMoims.push(inviteMoims.data[i]);
        // }
      }
      console.log(this.inviteMoims);
      console.log(this.currentSelectedMember);

      // this.currentSelectedMember.joinMoims = memberMoims.data;
      // for (var i = 0 ; i < memberMoims.data.length; i++) {
      //   if( this.memberMoims.filter((e) => { return e.id == inviteMember.data[i].id }).length < 1 ) arr.push(user);
      // }
      // if( this.inviteMoims.filter((e) => { return e.id == user.id }).length < 1 ) arr.push(user);
      // console.log(this.currentSelectedMember);
    },
    showInviteMemberModal() {
      this.$bvModal.hide("modal-member");
      this.$bvModal.show("invite_modal");
    },
    showMemberLevelModal() {
      this.$bvModal.hide("modal-member");
      this.$bvModal.show("modal-level");
    },
    showCalendarMemberModal() {
      this.$bvModal.hide("modal-member");
      this.$bvModal.show("Calendar_modal");
      this.isCalendar = false;
    },
    resetModal() {
      this.inviteMsg = "";
      this.inviteMoim = null;
    },
    async InviteSubmit() {
      console.log(this.currentSelectedMember);
      // Exit when the form isn't valid
      if (
        this.inviteMsg.split(" ").join("") !== "" &&
        this.inviteMoim != null
      ) {
        let inviteSend = await InviteMoim(
          this.inviteMoim,
          this.currentSelectedMember.id,
          this.inviteMsg
        );
        console.log(inviteSend);
      } else {
        alert("초대 정보가 제대로 입력되지 않았습니다.");
      }

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("invite_modal");
      });
    },
    async getInviteMoimList(userId) {
      let inviteMoims = await MyMoimList(userId);
      console.log(this.moimid);
      for (var i = 0; i < inviteMoims.data.length; i++) {
        if (inviteMoims.data[i].id != this.moimid) {
          this.inviteMoims.push(inviteMoims.data[i]);
        }
      }
      console.log(inviteMoims);
      // this.inviteMoims = inviteMoims.data;
    },
    async changeMemberLevel() {
      if (this.levelSelected != null) {
        console.log(
          this.moimid,
          this.currentSelectedMember.userId,
          this.levelSelected
        );
        console.log(this.currentSelectedMember);
        await changeMoimUserLevel(
          this.moimid,
          this.currentSelectedMember.userId,
          this.levelSelected
        );
        alert("모임원 등급 변경이 완료되었습니다.");
        this.getMoimMemberList(this.moimid);
        this.levelSelected = null;
        this.$bvModal.hide("modal-level");
      } else {
        alert("변경할 등급이 선택되지 않았습니다.");
      }
    },
    checkBanishMember() {
      this.$bvModal.hide("modal-member");
      this.$bvModal.show("modal-banish");
    },
    async banishMember() {
      await banishMember(this.moimid, this.currentSelectedMember.userId);
      alert(this.currentSelectedMember.details.name + "님을 강퇴하였습니다.");
      this.getMoimMemberList(this.moimid);
      this.$bvModal.hide("modal-banish");
    },
  },
  async created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    console.log(this.moimid);
    this.getMoimMemberList(this.moimid);
    console.log(this.moimHostId);
    this.userId = this.$cookies.get("MoimUserId");
    this.getInviteMoimList(this.userId);
  },
  // mounted() {
  //   console.log(this.moimHostId);
  //   console.log(this.$props.hostId);
  // }
};
</script>

<style>
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 18px;
}
#Calendar_modal___BV_modal_footer_ {
  margin: 0;
}
</style>
