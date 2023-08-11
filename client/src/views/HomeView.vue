<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ArticleCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    ArticleCard,
  },
});
</script>
