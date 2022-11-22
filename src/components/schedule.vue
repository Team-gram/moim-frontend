<template>
<div>
<b-table-simple class="sched" responsive>
  <b-thead>
    <b-tr>
      <b-th class="text-center">시간</b-th>
      <b-th class="text-center notdrag" v-for="(item,index) in day_options" :key="index">{{ item.name }}</b-th>
    </b-tr>
  </b-thead>
  <b-tbody>
    <b-tr class="text-center" v-for="hour in hour_options" :key="hour">
      <b-th class="notdrag">{{hour}}</b-th>
      <b-td class="no-padding" v-for="(day,index) in day_options" :key="index">
        <ul style="margin-bottom: 0px">
          <li class="minute notdrag" :class="{'check': mouseover(day.item,hour,minute)}"  v-for="minute in minute_options" :key="minute"
          @mouseover="mouseover(day.item,hour,minute)"
          @mouseup="mouseup(day.item)" 
          @mousedown="mousedown(day.item)"></li>
        </ul>
      </b-td>
    </b-tr>
  </b-tbody>
</b-table-simple>
</div>
</template>

<script>
  export default {
    name:"MoimSchedule",
    data(){
    return{
      drag:-1,
      current:0,
      check:1,
      day_options: [
        { item: 0, name: "월" },
        { item: 1, name: "화" },
        { item: 2, name: "수" },
        { item: 3, name: "목" },
        { item: 4, name: "금" },
        { item: 5, name: "토" },
        { item: 6, name: "일" },
      ],
      hour_options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
      minute_options:[
        0, 10, 20, 30, 40, 50
      ]
    };
  },
  methods:{
    mousedown(item){
      this.drag=1;
      this.current=item;
    },
    mouseover(day,hour,minute){
      if(this.drag==1 && day==this.current){
        console.log(this.day_options[day].name,hour +"시 ",minute+"분");
        return true;
      }
      return false;
    },
    mouseup(){
      this.drag=-1;
    },
  }
}
</script>
<style>
.notdrag{
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none
}
.minute{
  height: 10px;
  list-style:none;
  padding-left:0px;
}
.no-padding {
  padding: 0 !important;
}
ul,li {margin:0; padding:0;}
.check{
  background-color: #928f8f;

}
</style>