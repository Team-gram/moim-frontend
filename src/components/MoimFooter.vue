<template>
  <footer>
    <div class="footer">
      <p style="margin: 0px;">2022-2 SW Capstone Design Team-gram</p>
      <p style="margin: 0px; padding:0 10px; cursor:pointer;" @click="placesubmit()"><b>장소 상위</b></p>
    </div>
  </footer>
</template>

<script>
export default {
  methods:{
    placesubmit(){
      this.$router.push("/placetop").catch((error) => {
        console.log(error);
      });
    }
  },
};
</script>

<style>
footer {
  border-top: 0px solid #35495e;
  text-align: center;
  font-size: 16px;
  color: #000000;
  margin: 100px 0 0 0;
  padding: 20px;
  background-color: #eeeeee;
}
.footer{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content:center;
}
</style>
