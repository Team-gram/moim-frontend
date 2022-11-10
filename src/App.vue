<template>
  <div>
    <MoimHeader></MoimHeader>
    <router-view/>
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
}
</script>

