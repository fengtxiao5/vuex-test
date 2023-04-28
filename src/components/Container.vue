<template>
  <div style="width: 100%;height: 100%">
    <div class="container">
      <Card
          v-for="(item,index) in cards"
          :data="item"
          :key="index"
          :index="index"
      >
      </Card>
    </div>
    <div>
      <button @click="init">初始化</button>
    </div>
  </div>
</template>

<script>

import Card from "@/components/Card";
import {useStore} from "vuex";
import {computed} from "vue";
import { initPng } from "@/mock";

export default {
  name: "out-container",
  components: {
    Card
  },
  setup() {
    const store = useStore()
    return {
      cards: computed(() => {
        console.log('使用了cards',store.getters.allCards)
        return store.getters.allCards
      }),
      init: () => store.dispatch('initPngAction',initPng()),
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.container {
  width: 400px;
  height: 400px;
  background-color: aliceblue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 分n列 */
  grid-template-rows: repeat(4, 1fr);
}

.card {
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border: 1px solid;
  user-select: none;
}
</style>
