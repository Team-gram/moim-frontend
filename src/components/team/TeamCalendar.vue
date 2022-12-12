<template>
  <div id="Calendar" style="margin-top: 0px">
    <div id="main-text">
      <b id="main-text-highlight">모임 일정</b>
    </div>
    <div
      style="margin-top: 3px"
      v-if="
        isAllbutton == 0 &&
        startKalendar == 1 &&
        events.length == 0 &&
        moimhostid == userid
      "
    >
      참여자 일정에서 새 모임일정을 만들 수 있습니다.
    </div>
    <b-button
      @click="[(startKalendar = 0), MoimAllCall()]"
      variant="success"
      style="margin: 0 0 10px 80%"
      id="Allbutton"
      >{{ Allbutton }}</b-button
    >
    <kalendar
      v-if="startKalendar > 0"
      :configuration="calendar_settings"
      :events="events"
    >
      <div
        slot="created-card"
        slot-scope="{ event_information }"
        class="details-card"
        @click="[isAllbutton == 0 ? startitem(event_information) : Message(0)]"
      >
        <h5 class="appointment-title appfont">
          {{ event_information.data.title }}
        </h5>
        <h6 class="appsubfont" style="padding: 10px 0 0 0">
          {{ event_information.data.description }}
        </h6>
        <span class="time">
          {{ event_information.start_time.substr(11, 5) }}
          <br />
          {{ event_information.end_time.substr(11, 5) }}
        </span>
      </div>
      <div slot="creating-card">
        <h4 class="appointment-title" style="text-align: left">모임 일정</h4>
      </div>
      <div
        slot="popup-form"
        slot-scope="{ popup_information }"
        style="display: flex; flex-direction: column"
      >
        <h4 style="margin-bottom: 10px">모임 일정</h4>
        <input
          v-model="new_appointment['title']"
          type="text"
          name="title"
          placeholder="Title"
        />
        <textarea
          v-model="new_appointment['description']"
          type="text"
          name="description"
          placeholder="Description"
          rows="2"
        ></textarea>
        <div class="buttons popup-event">
          <button class="add" @click="addAppointment(popup_information)">
            추가
          </button>
          <button class="cancel" @click="closePopups()">취소</button>
        </div>
      </div>
    </kalendar>
    <b-modal
      id="modal-scrollable"
      centered
      scrollable
      title="모임 일정 상세 조회"
    >
      <template #modal-header>
        <!-- Emulate built in modal header close button action -->
        <!-- <b-button size="sm" variant="outline-danger" @click="close()">
          Close Modal
        </b-button> -->
        <h5>모임 일정 상세 조회</h5>
      </template>

      <template>
        <b-row align-v="center" align-h="center">
          <b-col
            id="teammenu"
            cols="auto"
            style="cursor: pointer"
            :class="{ menuselect: memuindex == 0 }"
            @click="memuindex = 0"
            ><div>정보</div></b-col
          >
          <b-col
            id="teammenu"
            cols="auto"
            style="cursor: pointer"
            :class="{ menuselect: memuindex == 1 }"
            @click="memuindex = 1"
            ><div>참여인원</div></b-col
          >
          <b-col
            id="teammenu"
            cols="auto"
            style="cursor: pointer"
            :class="{ menuselect: memuindex == 2 }"
            @click="memuindex = 2"
            ><div>준비물</div></b-col
          >
          <b-col
            id="teammenu"
            cols="auto"
            style="cursor: pointer"
            :class="{ menuselect: memuindex == 3 }"
            @click="memuindex = 3"
            ><div>장소</div></b-col
          >
        </b-row>
        <div v-if="memuindex == 0" style="padding: 20px">
          <!-- 정보 -->
          <b-row>
                <b-col cols="auto">
                  <div id="main-text">
                    <b id="main-text-highlight">일정 상세 정보</b>
                  </div>
                </b-col>
              </b-row>
          <b-row>
            <b-col v-if="this.currentSelectedSchedule">
              제목: {{ this.currentSelectedSchedule.data.title }}
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="this.currentSelectedSchedule">
              일시: {{ this.currentSelectedSchedule.start_time.split("T")[0] }}
              {{ this.currentSelectedSchedule.start_time.substr(11, 5) }} -
              {{ this.currentSelectedSchedule.end_time.substr(11, 5) }}
            </b-col>
          </b-row>
          <b-row>
            <b-col v-if="this.currentSelectedSchedule">
              상세 내용: {{ this.currentSelectedSchedule.data.description }}
            </b-col>
          </b-row>
        </div>
        <div v-if="memuindex == 1" style="padding: 20px">
          <!-- 모임원 -->
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="auto">
                  <div id="main-text">
                    <b id="main-text-highlight">참여 인원 리스트</b>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col v-if="attendMembers.length > 0">
                  <div id="list-box">
                    <div
                      id="list-item"
                      style="
                        height: 50px !important;
                        cursor: default !important;
                      "
                      v-for="member in attendMembers"
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
                                    src="@/assets/default-profile.png"
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
                                    <b-col cols="auto">
                                      <div>{{ member.name }}</div>
                                    </b-col>
                                  </b-row>
                                </b-col>
                              </b-row>
                            </b-col>
                            <b-col cols="auto">
                              <div v-if="userid == member.id">
                                <b-button-group size="sm">
                                  <div
                                    @click="toggleAttendState(true)"
                                    :style="{
                                      backgroundColor: attendToggle
                                        ? '#4fb26f'
                                        : '#aaaaaa',
                                    }"
                                    style="
                                      cursor: pointer;
                                      border: 0px solid;
                                      color: #ffffff;
                                      font-size: 10px !important;
                                      font-family: 'NanumBarunGothic';
                                      padding: 5px 10px 5px 10px;
                                      width: fit-content;
                                      border-top-left-radius: 20px;
                                      border-bottom-left-radius: 20px;
                                      margin: 10px 0 10px 10px;
                                    "
                                  >
                                    참여
                                  </div>
                                  <div
                                    @click="toggleAttendState(false)"
                                    :style="{
                                      backgroundColor: attendToggle
                                        ? '#aaaaaa'
                                        : 'red',
                                    }"
                                    style="
                                      cursor: pointer;
                                      border: 0px solid;
                                      color: #ffffff;
                                      font-size: 10px !important;
                                      font-family: 'NanumBarunGothic';
                                      padding: 5px 10px 5px 10px;
                                      width: fit-content;
                                      border-top-right-radius: 20px;
                                      border-bottom-right-radius: 20px;
                                      margin: 10px 10px 10px 0;
                                    "
                                  >
                                    불참
                                  </div>
                                </b-button-group>
                              </div>
                              <div
                                id="green-colored-option-button"
                                style="
                                  font-size: 10px !important;
                                  align: right;
                                  margin: 10px;
                                "
                                v-if="
                                  userid != member.id && member.attend == true
                                "
                              >
                                참석
                              </div>
                              <div
                                id="green-colored-option-button"
                                style="
                                  font-size: 10px !important;
                                  align: right;
                                  margin: 10px;
                                  background-color: red !important;
                                "
                                v-if="
                                  userid != member.id && member.attend == false
                                "
                              >
                                불참
                              </div>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
                <b-col v-else>
                  <div>등록된 준비물이 없습니다.</div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div v-if="memuindex == 2" style="padding: 20px">
          <!-- 준비물 -->
          <b-row>
            <b-col>
              <b-row>
                <b-col cols="auto"> <b-row>
                <b-col cols="auto">
                  <div id="main-text">
                    <b id="main-text-highlight">준비물 목록</b>
                  </div>
                </b-col>
              </b-row> </b-col>
                <b-col cols="auto">
                  <div
                    id="green-colored-option-button"
                    style="cursor: pointer; height: 30px ; margin-top: 15px"
                    @click="[openNewRefModal(), closeDetailModal()]"
                  >
                    새 준비물 추가하기
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col v-if="preparations.length > 0">
                  <div
                    id="moim-prep-item"
                    v-for="prep in preparations"
                    :key="prep.id"
                  >
                    <b-row style="padding: 10px">
                      <b-col cols="auto">
                        <b-form-checkbox
                          name="checkbox-1"
                          @change="togglePrepItem(prep.id)"
                          v-model="prep.status"
                          value="Y"
                          unchecked-value="N"
                        ></b-form-checkbox>
                      </b-col>
                      <b-col
                        v-if="prep.status === 'Y'"
                        cols="auto"
                        style="text-decoration: line-through"
                      >
                        {{ prep.name }}
                      </b-col>
                      <b-col v-else cols="auto"> {{ prep.name }} </b-col>
                      <b-col cols="auto" v-if="prep.status === 'Y'">
                        <div
                          id="gray-colored-option-button"
                          style="height: 20px !important; font-size: 8px"
                        >
                          {{ prep.userName }}
                        </div></b-col
                      >
                      <b-col cols="auto"
                        ><div
                          style="cursor: pointer"
                          @click="deletePrep(prep.id)"
                        >
                          <i class="fa-solid fa-trash"></i></div
                      ></b-col>
                    </b-row>
                  </div>
                </b-col>
                <b-col v-else>
                  <div>등록된 준비물이 없습니다.</div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div v-if="memuindex == 3" style="padding: 20px">
          <div id="main-text">
                    <b id="main-text-highlight">모임 장소 정하기</b>
                  </div>
          <PlaceSearch :Scheduleid="currentSelectedSchedule.kalendar_id"></PlaceSearch>
        </div>
      </template>
      <template #modal-footer="{ hide }">
        <!-- Button with custom close trigger value -->
        <b-button
          size="sm"
          v-if="level < 2"
          @click="[removeEvent(currentSelectedSchedule), hide('forget')]"
          style="background-color: red"
        >
          삭제하기
        </b-button>
        <b-button size="sm" @click="hide('forget')"> 닫기 </b-button>
      </template>
    </b-modal>
    <b-modal
      id="newRefModal"
      centered
      title="새로운 준비물 등록하기"
      hide-footer
    >
      <b-row>
        <b-col cols="4">
          <p class="my-4">준비물 이름</p>
        </b-col>
        <b-col cols="8" style="padding-top: 15px !important">
          <b-form-input
            v-model="newPerpText"
            placeholder="준비물 이름을 입력하세요"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row align="center">
        <b-col>
          <div
            id="green-colored-option-button"
            style="cursor: pointer"
            @click="registerNewPrep(newPerpText)"
          >
            등록하기
          </div>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>
<script>
import {
  regularMoimGet,
  regularMoimSet,
  regularMoimRemove,
} from "@/services/teamcalendar";
import { getUserinfo } from "@/services/login.js";
import { AllMeet } from "@/services/meet";
import {
  getMoimRef,
  takeMoimRef,
  deleteMoimRef,
  newMoimRef,
  getMoimMember,
  getMeetMembers,
  joinMeet,
  getOutMeet,
} from "@/services/moim";
import Kalendar from "@/lib-components/kalendar-container.vue";
import moment from "moment";
import PlaceSearch from "@/components/team/setting/PlaceSearch.vue"
import { mapGetters } from "vuex";  
export default {
  name: "TeamCalendar",
  components: {
    Kalendar,
    PlaceSearch,
  },
  data() {
    return {
      level : 2,
      memuindex: 0,
      Allbutton: "모임 일정 조율하기",
      isAllbutton: 0,
      userid: null,
      moimid: "",
      moimhostid: "",
      colorlist: ["red", "white", "gray", "blue"],
      startKalendar: 0,
      events: [],
      calendar_settings: {
        view_type: "week",
        cell_height: 5,
        scrollToNow: false,
        hourlySelection: false,
        start_day: new Date().toISOString(),
        military_time: false,
        read_only: true,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_dates: [],
        hide_days: [],
        past_event_creation: true,
      },
      currentSelectedSchedule: null,
      new_appointment: {},
      preparations: [],
      newPerpText: "",
      attendMembers: [],
      attendToggle: false,
    };
  },
  async created() {
    if(this.getPhone){
			this.calendar_settings.read_only=true;
		}
    this.userid = this.$cookies.get("MoimUserId");
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    this.moimhostid = this.$store.getters["searchStore/getSelectedMoimHostId"];
    this.startKalendar = await this.regularGet(this.moimid);
    this.getMeetMemberList(this.moimid);
  },
  computed:{
    ...mapGetters({getPhone:"getPhone"})
  },
  methods: {
    async getMeetMemberList(moimId) {
      this.attendMembers = [];
      let moimMemberList = await getMoimMember(moimId);
      this.$emit("memberCount", moimMemberList.data.length);
      for (var i = 0; i < moimMemberList.data.length; i++) {
        var userId = moimMemberList.data[i].userId;
        let userDetail = await getUserinfo(userId);
        if (this.$cookies.get("MoimUserId") == userDetail.data.id) {
          this.level = moimMemberList.data[i].level
          this.attendMembers.unshift(userDetail.data);
        } else {
          this.attendMembers.push(userDetail.data);
        }
      }

      console.log(this.attendMembers);
    },
    async setMeetMemberStatus() {
      let meetMemberList = await getMeetMembers(
        this.moimid,
        this.currentSelectedSchedule.kalendar_id
      );
      console.log(meetMemberList.data);
      for (var i = 0; i < this.attendMembers.length; i++) {
        var attend = false;
        for (var j = 0; j < meetMemberList.data.length; j++) {
          if (meetMemberList.data[j].userId == this.attendMembers[i].id) {
            attend = true;
          }
        }
        if (attend == true) {
          this.attendMembers[i].attend = true;
        } else {
          this.attendMembers[i].attend = false;
        }
      }
      this.attendToggle = this.attendMembers[0].attend;
      console.log(this.attendMembers);
    },
    async toggleAttendState(state) {
      if (this.attendMembers[0].attend != state) {
        if (state) {
          console.log("참여");
          await joinMeet(
            this.moimid,
            this.currentSelectedSchedule.kalendar_id,
            this.userid
          );
        } else {
          console.log("불참");
          await getOutMeet(
            this.moimid,
            this.currentSelectedSchedule.kalendar_id,
            this.userid
          );
        }
        // this.getMeetMemberList(this.moimid);
        await this.setMeetMemberStatus();
        this.attendToggle = this.attendMembers[0].attend;
      }
    },
    setEvent(item) {
      var calen = Object();
      var data = Object();
      calen["from"] =
        moment()
          .day(item.day + 1)
          .format()
          .slice(0, 11)
          .toString() +
        item.startTime +
        "+09:00";
      calen["to"] =
        moment()
          .day(item.day + 1)
          .format()
          .slice(0, 11)
          .toString() +
        item.endTime +
        "+09:00";
      calen["id"] = item.id;
      data["title"] = item.scheduleName;
      data["description"] = item.scheduleDetail;
      calen["data"] = data;
      this.events.push(calen);
    },
    async addAppointment(popup_info) {
      let payload = {
        data: {
          title: this.new_appointment.title,
          description: this.new_appointment.description,
        },
        from: popup_info.start_time,
        to: popup_info.end_time,
      };
      if (this.level > 1) {
        this.$bvToast.toast("모임일정을 등록할 권한이 없습니다.", {
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
        return;
      }
      if (payload.data.title == null) {
        this.$bvToast.toast("제목을 입력해주세요", {
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
        return;
      }
      var data = Object();
      data["day"] = moment(payload.from).day() - 1;
      data["day"] = data["day"] < 0 ? 6 : data["day"];
      data["startTime"] = payload.from.slice(11, 19);
      data["endTime"] = payload.to.slice(11, 19);
      data["scheduleName"] = payload.data.title;
      data["scheduleDetail"] = payload.data.description;
      data["moimId"] = this.moimid;
      let response = await regularMoimSet(data);
      if (response.status == 200) {
        this.$bvToast.toast(
          data.scheduleName + ": 모임 정기 일정이 등록되었습니다.",
          {
            // title: "회원 정보 등록 실패",
            toaster: "b-toaster-top-right",
            appendToast: false,
            autoHideDelay: 3000,
          }
        );
      }
      response = await regularMoimGet(this.moimid);
      if (response.status == 200) {
        for (var index in response.data) {
          if (
            response.data[index].startTime == data.startTime &&
            response.data[index].endTime == data.endTime
          ) {
            payload.id = response.data[index].id;
          }
        }
      }
      this.$kalendar.addNewEvent(payload);
      this.$kalendar.closePopups();
      this.clearFormData();
    },
    closePopups() {
      this.$kalendar.closePopups();
    },
    clearFormData() {
      this.new_appointment = {
        description: null,
        title: null,
      };
    },
    async removeEvent(kalendarEvent) {
      let day = kalendarEvent.start_time.slice(0, 10);
      this.$kalendar.removeEvent({
        day,
        key: kalendarEvent.key,
        id: kalendarEvent.kalendar_id,
      });
      const data = await regularMoimRemove(
        this.moimid,
        kalendarEvent.kalendar_id
      );
      if (data.status == 200) {
        this.$bvToast.toast("모임 일정이 삭제되었습니다.", {
          // title: "회원 정보 등록 실패",
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
      }
    },
    async regularGet(moimid) {
      let response = await regularMoimGet(moimid);
      for (var item in response.data.regular) {
        this.setEvent(response.data.regular[item]);
      }
      return 1;
    },
    async MoimAllCall() {
      this.memuindex=0;
      if (this.isAllbutton == 0) {
        this.Allbutton = "기존 모임 일정";
        this.events = [];
        this.regularGet(this.moimid);
        const response = await AllMeet(this.moimid);
        if (response.data.length != 0)
          for (var item in response.data) {
            response.data[item].scheduleName = response.data[item].name;
            this.setEvent(response.data[item]);
          }
        if(!this.getPhone){
          this.calendar_settings.read_only = false;
        }
        this.startKalendar = 1;
        this.isAllbutton = 1;
      } else {
        this.Allbutton = "참여자 일정";
        this.events = [];
        this.calendar_settings.read_only = true;
        this.startKalendar = await this.regularGet(this.moimid);
        this.isAllbutton = 0;
      }
    },
    startitem(kalendarEvent) {
      this.currentSelectedSchedule = kalendarEvent;
      this.updateRef();
      this.setMeetMemberStatus();
      this.$bvModal.show("modal-scrollable");
    },
    async togglePrepItem(prepId) {
      var prep = this.preparations.find((x) => x.id === prepId);
      if (prep) {
        console.log(prep.userId);
        if (
          prep.status === "N" &&
          prep.userId != this.$cookies.get("MoimUserId")
        ) {
          //   // 이미 챙긴 준비물은 다시 못 뺀다!
          prep.status = "Y";
        } else {
          //새로 준비물 챙기기
          console.log(prepId, this.$cookies.get("MoimUserId"));
          let registerRef = await takeMoimRef(
            prepId,
            this.$cookies.get("MoimUserId")
          );
          console.log(registerRef);
          this.updateRef();
        }
      }
    },
    async updateRef() {
      console.log(this.moimid, this.currentSelectedSchedule.kalendar_id);
      // let newRef = await newMoimRef(this.moimid, this.currentSelectedSchedule.kalendar_id, "새 준비물");
      // console.log(newRef);
      let allRefList = await getMoimRef(
        this.moimid,
        this.currentSelectedSchedule.kalendar_id
      );
      this.preparations = allRefList.data;
    },
    async deletePrep(prepId) {
      console.log("delete");
      let allRefList = await deleteMoimRef(prepId);
      console.log(allRefList);
      this.updateRef();
    },
    openNewRefModal() {
      this.$bvModal.show("newRefModal");
    },
    closeDetailModal() {
      this.$bvModal.hide("modal-scrollable");
    },
    async registerNewPrep(prepName) {
      if (prepName.split(" ").join("") !== "") {
        console.log(
          this.moimid,
          this.currentSelectedSchedule.kalendar_id,
          prepName
        );
        let registerPrep = await newMoimRef(
          this.moimid,
          this.currentSelectedSchedule.kalendar_id,
          prepName
        );
        console.log(registerPrep);
        this.updateRef();
        this.$bvModal.hide("newRefModal");
        this.$bvModal.show("modal-scrollable");
      } else {
        alert("준비물 이름이 입력되지 않았습니다.");
      }
    },
    Message(level) {
      if (level == 0) {
        this.$bvToast.toast("기존 모임 일정에서 상세 내역을 볼 수 있습니다.", {
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
      }
    },
    async setJoinMember() {},
  },
};
</script>

<style>
.appointment-title {
  color: black;
  width: 100%;
}
.details-card {
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 100%;
}
.details-button {
  margin: 0;
  border: none;
  color: #4c4b4b;
  position: absolute;
  padding-right: 0px;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background: transparent;
}
svg {
  width: 18px;
  height: 18px;
  fill: white;
}
.popup-event {
  display: flex;
  justify-content: space-between;
}
.add {
  border: none;
  color: #29771c;
  background-color: rgba(0, 128, 0, 0.399);
  padding: 5px 10px;
}
.cancel {
  border: none;
  background-color: rgba(255, 0, 0, 0.399);
  color: red;
  padding: 5px 10px;
}
.appfont {
  font-size: 16px;
}
.appsubfont {
  font-size: 13px;
}
#moim-prep-item {
  border-radius: 20px !important;
  border: 0px solid;
  box-shadow: 0px 0px 5px #ccc;
  background-color: #ffffff;
  float: center;
  max-width: 700px;
  height: 40px;
  padding: 5px 5x 5px 5px;
  margin: 10px 0 10px 0;
  font-family: "NanumBarunGothic";
}
#Allbutton{
  border-radius: 15px !important;
  font-size:14px
}
</style>
