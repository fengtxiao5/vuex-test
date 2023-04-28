<template>
  <div class="card">
    <div :class="'flip-container '+'flip-container'+index" @click="toggleClass(index)">
      <div class="flipper">
        <div class="back">
          <img v-show="data.status !== '2'" :src="src" class="canClick"/>
        </div>
        <div class="front">
          <img v-show="data.status !== '2'" class="canClick" :src="require('../assets/back.png')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "single-card",
  props: {
    data: Object,
    index: Number,
  },
  mounted() {

  },
  methods: {
    toggleClass(index) {
      //转动期间 点其他的格子不要有反应
      console.log('index',index)
      if (this.reversing === false) {
        this.store.commit('SET_REVERSING', true)
        document.querySelector('.flip-container' + this.index).classList.toggle('clicked');
        setTimeout(() => {
          //320ms翻开后判断是否需要转回背面
          this.reverseCard(index)
        }, 320)
      }

    },
    removeClass(index) {
      this.store.commit('SET_REVERSING', true)
      let elm = document.querySelector('.flip-container' + index)
      if (elm) {
        elm.classList.remove('clicked')
      }
      setTimeout(() => {
        this.store.commit('SET_REVERSING', false)
      })
    },
  },
  computed: {
    src() {
      return require('../assets/' + this.data.name + '.png')
    }
  },
  setup() {
    const store = useStore()
    return {
      store: store,
      reversing: computed(() => store.getters.reversing),
      setReversing: (payload) => store.dispatch('setReversing', payload),
      reverseCard: (index) => {
        store.dispatch('reverseCard', index).then((res) => {
          if (res && store.getters.needReverseArr != null) {
            console.log('reverseCard needReverseArr',store.getters.needReverseArr)
            let arr = store.getters.needReverseArr
            for(let i = 0;i<arr.length;i++){
              let elm = document.querySelector('.flip-container' + arr[i])
              if (elm) {
                elm.classList.remove('clicked')
              }
            }
            setTimeout(() => {
              store.commit('SET_NEEDREVERSE',null)
              store.commit('SET_REVERSING',false)
            },320)
          } else {
            store.commit('SET_REVERSING',false)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.canClick {
  width: 100px;
  height: 100px;
}

.canClick:hover {
  cursor: pointer;
}

.canNotClick {
  width: 100px;
  height: 100px;
}

.flip-container {
  perspective: 1000px;
}

.flipper {
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: transform 0.3s ease-out;
}

.front, .back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  backface-visibility: hidden;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
}

.clicked .flipper {
  transform: rotateY(180deg);
}

* {
  padding: 0;
  margin: 0;
}
</style>
