<template>
  <div style="margin-top: 80px;">
    <Categorysearch v-if="this.$store.getters['searchStore/getSearchType'] ==='category'"></Categorysearch>
    <KeywordSearch v-if="this.$store.getters['searchStore/getSearchType']==='keyword'"></KeywordSearch>
    <MoimList></MoimList>
  </div>
</template>

<script>
import Categorysearch from "@/components/Search/CategorySearch.vue";
import KeywordSearch from "@/components/Search/KeywordSearch.vue";
import MoimList from "@/components/moimList.vue";

export default {
  components: {
    Categorysearch,
    KeywordSearch,
    MoimList
  },
};
</script>

<style>
</style>
