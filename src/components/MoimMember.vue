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
                            member.profileImage == undefined ||
                            member.profileImage == null ||
                            member.profileImage == ''
                          "
                          src="../assets/default-profile.png"
                          width="40"
                          height="40"
                        /><b-img
                          v-else
                          :src="`${member.profileImage}`"
                          rounded="circle"
                          width="40"
                          height="40"
                        />
                      </b-col>
                      <b-col style="margin: 5px 0 5px 0">
                        <b-row id="listTitle">
                          <b-col>
                            <div >{{ member.name }}</div>
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
                        margin: 10px
                      "
                      v-b-modal.modal-sm
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
      id="modal-sm"
      size="sm"
      title="모임 구성원 관리"
      hide-footer
      centered
      style="font-family: 'NanumBarunGothic'"
    >
      <b-row>
        <b-col>
          <div id="list-item" style="height: 30px !important">
            <b-row style="padding: 5px 10px 5px 10px">
              <b-col cols="auto">
                <i class="fa-solid fa-calendar" style="color: #4fb26f"></i>
              </b-col>
              <b-col>
                <div>개인 일정 확인</div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row v-if="this.userId === this.moimHostId">
        <b-col>
          <div id="list-item" style="height: 30px !important">
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
          <div id="list-item" style="height: 30px !important">
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
      <b-row v-if="this.userId === this.moimHostId">
        <b-col>
          <div id="list-item" style="height: 30px !important">
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
  </div>
</template>

<script>
import { getMoimMember } from "@/services/moim.js";
import { getUserinfo } from "@/services/login.js";
export default {
  props: ['hostId'],
  data() {
    return {
      moimId: null,
      memberList: null,
      userId: null,
      moimHostId: this.$props.hostId,
    };
  },
  methods: {
    async getMoimMemberList(moimId) {
      this.memberList = [];
      let moimMemberList = await getMoimMember(moimId);
      for (var i = 0; i < moimMemberList.data.length; i++) {
        var userId = moimMemberList.data[i].userId;
        let userDetail = await getUserinfo(userId);
        this.memberList.push(userDetail.data);
      }
      console.log(this.memberList);
    },
  },
  created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    console.log(this.moimid);
    this.getMoimMemberList(this.moimid);
    console.log(this.moimHostId);
    this.userId = this.$cookies.get("MoimUserId");
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
</style>
