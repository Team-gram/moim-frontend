<template>
  <div>
    <MoimHeader></MoimHeader>
    <router-view :key="$route.fullPath"/>
  </div>
  
</template>


<script>
import MoimHeader from './components/MoimHeader.vue'
export default {
  name: 'App',
  components: {
    MoimHeader,
  },
  methods: {
    
  },
  created(){
    this.$store.commit('Resize',window.innerWidth,window.innerHeight);
  },
  mounted(){
    window.addEventListener('resize',() =>{
      this.$store.commit('Resize',window.innerWidth,window.innerHeight);
    });
  }
}
</script>

