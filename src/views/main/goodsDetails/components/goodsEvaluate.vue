<template>
  <div class="goodsEvaluate" ref="goodsEvaluateRef">
    <div class="myEvaluate">
      <div class="rate">
        <span>打分</span>
        <el-rate v-model="myEvaluate.rate" :colors="colors" />
      </div>
      <textarea
        v-model="myEvaluate.evaluate"
        name=""
        id=""
        cols="80"
        rows="3"
      ></textarea>
      <button @click="evaluate">我要评价</button>
    </div>
    <ul class="list" v-for="(v, i) in newData" :key="i">
      <img :src="v.avatar" alt="" />
      <li class="info">
        <div class="info-top">
          <div class="info-top-l">
            <span class="nickname">{{ formatName(v.nickname) }}</span>
            <span class="level"
              ><i class="iconfont icon-zuanshi"></i>: {{ v.level }}</span
            >
            <p class="ip">
              IP: <span>{{ v.ip }}</span>
            </p>
          </div>
          <el-rate v-model="v.rate" :disabled="true" :colors="colors" />
        </div>
        <p class="evaluate">
          {{ v.evaluate }}
        </p>
        <div class="info-b">
          <span class="view"
            >浏览<span class="num">{{ v.view }}</span> 次</span
          >
          <span class="time">{{ v.date }}</span>
        </div>
      </li>
    </ul>

    <!-- 弹窗 -->
    <div class="dialog" v-if="dialogShow">
      <div class="main">
        <p>请登录后再进行评价</p>
        <el-button @click="confirm">确定</el-button>
      </div>
    </div>

    <div>
      <el-result v-if="resShow" icon="success" title="评论成功"> </el-result>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import LocalCache from '@/utils/cache'
import router from '@/router'
import { getDate } from '@/utils/getDate'
import { formatName } from '@/utils/formatName'

const props = withDefaults(
  defineProps<{
    user: any[]
  }>(),
  {
    user: () => [],
  },
)
const emits = defineEmits(['updateCount'])

const colors = ref(['#99A9BF'])
//是否显示结果标识
const resShow = ref(false)
// 新数据 后面好吧自己评论的数据添加进去
const newData = ref<any[]>([...props.user])
// 是否显示弹窗标识
const dialogShow = ref(false)
const token = LocalCache.getCache('pet-token')
// 我的评论数据
const myEvaluate = reactive({
  rate: 0,
  evaluate: '',
  nickname: LocalCache.getCache('pet-username'),
  level: 3,
  ip: '四川省',
  view: 1,
  date: getDate(),
  avatar: LocalCache.getCache('pet-avatar'),
})

// 评论
const evaluate = () => {
  // 如果没登录，展示弹窗
  if (!token) {
    dialogShow.value = true
  }
  // 把评论的数据添加到总数据总数据中，
  newData.value.unshift({ ...myEvaluate })

  // 把新数据长度发给父组件展示
  emits('updateCount', newData.value.length)

  // 评论完成， 把输入框的内容清空
  myEvaluate.evaluate = ''
  myEvaluate.rate = 0
  // 结果弹窗显示 1秒后隐藏
  resShow.value = true
  setTimeout(() => {
    resShow.value = false
  }, 1000)
}

const confirm = () => {
  dialogShow.value = false
  router.push('/login')
}

const goodsEvaluateRef = ref<InstanceType<typeof HTMLDivElement>>()
defineExpose({ goodsEvaluateRef })
</script>

<style lang="less" scoped>
@import '@/style/common.less';

.goodsEvaluate {
  border: 1px solid @basic-color;
  height: 100%;
  .myEvaluate {
    width: 80%;
    height: 100px;
    margin-top: 20px;
    margin-left: 72px;
    .flex;
    border-bottom: 2px solid @basic-color;
    .rate {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-weight: bold;
        color: @basic-color;
      }
    }
    textarea {
      outline: 0;
      border: 1px solid #ddd;
      &:focus {
        border: 1px solid blue;
        box-shadow: 0 0 6px @basic-color;
      }
    }
    button {
      width: 100px;
      height: 40px;
      background-color: @basic-color;
      color: #fff;
      border: 0;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .list {
    padding: 20px;
    padding-left: 100px;
    display: flex;
    position: relative;
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      width: 80%;
      height: 1px;
      background-color: @basic-color;
      bottom: 0;
      left: 6%;
    }
    img {
      width: 49px;
      height: 49px;
      border-radius: 7px;
    }
    .info {
      width: 75%;
      margin-left: 30px;

      .info-top {
        .flex(@align:start);
        .info-top-l {
          display: flex;
          align-items: center;
          .nickname {
            color: rgb(91, 91, 205);
            margin-right: 10px;
          }
          .level {
            margin-right: 10px;
          }

          .level,
          .ip {
            color: rgb(149, 147, 147);
          }
        }
      }
      .evaluate {
        line-height: 25px;
        margin-bottom: 3px;
      }
      .info-b {
        margin-top: 10px;
        .flex;
        .view {
          font-size: 12px;
          .num {
            color: coral;
            font-size: 13px;
            font-weight: bold;
          }
        }
        .time {
          text-align: right;
          font-size: 14px;
          color: coral;
        }
      }
    }
  }
  .icon-zuanshi {
    color: @basic-color;
  }
}
.dialog {
  width: 100vw;
  height: 100vh;
  background-color: rgba(149, 126, 126, 0.404);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  .main {
    width: 300px;
    height: 100px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    p {
      text-align: center;
      line-height: 40px;
      color: red;
    }
    button {
      position: absolute;
      right: 20px;
      bottom: 10px;
      background-color: @basic-color;
      color: #fff;
    }
  }
}
.el-result {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 0 5px #ddd;
}
</style>
