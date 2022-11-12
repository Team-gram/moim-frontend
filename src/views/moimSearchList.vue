<template>
  <div style="margin-top: 30px;">
    <Categorysearch v-if="$route.query.type==='category'"></Categorysearch>
    <KeywordSearch v-if="$route.query.type==='keyword'"></KeywordSearch>
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
