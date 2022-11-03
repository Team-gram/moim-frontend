<template>
  <div class="centerform">
    <h4 class="maintitle"><b>어떤 모임을 찾고 있나요?</b></h4>
    <b-input-group-append>
        <div class="searchitem">
          <b-form-input id="searchbar"></b-form-input>
        </div>
        <div class="searchbutton">
          <b-button variant="none">
              <img src="../assets/search.png" width="23" />
          </b-button>
        </div>
    </b-input-group-append>
  </div>
</template>




<script>
export default {
  name: 'MainHome',
  components: {
  },
  methods: {
  },
}
</script>

<style>
.centerform{
  margin: 60px 0px 20px 20px;
  text-align: center;
  position: relative;
}
.maintitle{
  margin: 20px 40px;
}
.searchitem{
  position: absolute;
  left: 50%;
  transform:translate(-70%, 0);
}
.searchbutton{
  position: absolute;
  left: 50%;
  transform:translate(300%, 0);
}
#searchbar{
  width : 140%;
  background-color: lightgray;
   -webkit-appearance: none;
  border-radius: 40px;
  border:none;
  font-size: 1.5em;
  text-align: center;
  overflow: auto;
}
/* @media screen and (max-width: 480px){
  #searchbar{
    width:15em;
  }
  .searchbutton{
    transform:translate(270%, 10%);
  }
} */
</style>