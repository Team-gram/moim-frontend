
<template>
  <div id="listbackground">
    <b-row align-v="center">
      <b-col  v-on:click="onClickPrev(currentMonth)" style="cursor:pointer">◀</b-col>
        <!-- <div>{{currentYear}}년</div> -->
        <div id="title">{{currentMonth}}월</div>
      <b-col  v-on:click="onClickNext(currentMonth)" style="cursor:pointer">▶</b-col>
    </b-row>
    <b-row>
      <b-col id="daytitle" v-for="(weekName, index) in weekNames" v-bind:key="index">
        {{weekName}}
      </b-col>
    </b-row>
    <b-row v-for="(row, index) in currentCalendarMatrix" :key="index">
      <b-col v-for="(day, index2) in row" :key="index2">
        <div id="day" v-if="isToday(currentYear, currentMonth, day)">
          {{day}}
        </div>
        <div id="day" v-else>
          {{day}}
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      weekNames: ["월", "화", "수","목", "금", "토", "일"],
      rootYear: 1904,
      rootDayOfWeekIndex: 4, // 2000년 1월 1일은 토요일
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth()+1,
      currentDay: new Date().getDate(),
      currentMonthStartWeekIndex: null,
      currentCalendarMatrix: [],
      endOfDay: null,
      memoDatas: [],
    }
  },
  mounted(){
      this.init();
  },
  methods: {
      init:function(){
        this.currentMonthStartWeekIndex = this.getStartWeek(this.currentYear, this.currentMonth);
        this.endOfDay = this.getEndOfDay(this.currentYear, this.currentMonth);
        this.initCalendar();
      },
      initCalendar:function(){
        this.currentCalendarMatrix = [];
        let day=1;
        for(let i=0; i<6; i++){
          let calendarRow = [];
          for(let j=0; j<7; j++){
            if(i==0 && j<this.currentMonthStartWeekIndex){
              calendarRow.push("");
            }
            else if(day<=this.endOfDay){
              calendarRow.push(day);
              day++;
            }
            else{
              calendarRow.push("");
            }
          }
          this.currentCalendarMatrix.push(calendarRow);
        }
      },
      getEndOfDay: function(year, month){
          switch(month){
              case 1:
              case 3:
              case 5:
              case 7:
              case 8:
              case 10:
              case 12:
                return 31;
              case 4:
              case 6:
              case 9:
              case 11:
                return 30;
              case 2:
                if( (year%4 == 0) && (year%100 != 0) || (year%400 == 0) ){
                return 29;   
                }
                else{
                    return 28;
                }
              default:
                console.log("unknown month " + month);
                return 0;
          }
      },
      getStartWeek: function(targetYear, targetMonth){
        let year = this.rootYear;
        let month = 1;
        let sumOfDay = this.rootDayOfWeekIndex;
        let many = 999999;
        while(many){
          if(targetYear > year){
            for(let i=0; i<12; i++){
              sumOfDay += this.getEndOfDay(year, month+i);
            }
            year++;
          }
          else if(targetYear == year){
            if(targetMonth > month){
              sumOfDay += this.getEndOfDay(year, month);
              month++;
            }
            else if(targetMonth == month){
              return (sumOfDay)%7;
            }
          }
        }
      },
      onClickPrev: function(month){
        month--;
        if(month<=0){
          this.currentMonth = 12;
          this.currentYear -= 1;
        }
        else{
          this.currentMonth -= 1;
        }
        this.init();
      },
      onClickNext: function(month){
        month++;
        if(month>12){
          this.currentMonth = 1;
          this.currentYear += 1;
        }
        else{
          this.currentMonth += 1;
        }
        this.init();
      },
      isToday: function(year, month, day){
        let date = new Date();
        return year == date.getFullYear() && month == date.getMonth()+1 && day == date.getDate(); 
      }
  }
}
</script>

<style>

#listbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 10px 20px 10px 20px;
  margin: 10px 0 10px 0;
}
#title{
  font-weight: bold !important;
  font-size: 20px;
  padding: 10px 90px 10px 90px;
}
#daytitle{
  font-weight: bold !important;
  font-size: 17px;
  padding: 10px 0px 10px 0px;
}
#day{
  padding: 10px 0px 10px 0px;
}
</style>