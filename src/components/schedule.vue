<template>
<b-table-simple responsive>
  <b-thead>
    <b-tr>
      <b-th v-for="(item,index) in day_options" :key="index">{{ item.name }}</b-th>
    </b-tr>
  </b-thead>
  <b-tbody>
    <b-tr v-for="index in hour_options" :key="index">
      <b-th>{{index}}</b-th>
      <b-td v-for="(item,dayindex) in day_options" :key="dayindex" @click="set(item.item,index)"></b-td>
    </b-tr>
  </b-tbody>
  <b-tfoot>
    <b-tr>
      <b-th></b-th>
      <b-th></b-th>
      <b-th></b-th>
      <b-th></b-th>
      <b-th></b-th>
    </b-tr>
  </b-tfoot>
</b-table-simple>
</template>

<script>
  export default {
    name:"MoimSchedule",
    data(){
    return{
        day_options: [
          { item: "0", name: "일" },
          { item: "1", name: "월" },
          { item: "2", name: "화" },
          { item: "3", name: "수" },
          { item: "4", name: "목" },
          { item: "5", name: "금" },
          { item: "6", name: "토" },
        ],
        hour_options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
    };
  },
  methods:{
    set(item,index){
      console.log(item,index);
    }
  }
}
</script>