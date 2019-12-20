<template>
  <div class="all-wrap">
    <scroll-view
      id="list"
      class="list-container"
      :scroll-y="true"
      :enable-flex="true"
      @scroll="bindscroll"
      @scrolltoupper="bindscrolltoupper"
      @scrolltolower="bindscrolltolower"
    >
      <div class="refresh-box" v-show="isRefresh">正在刷新...</div>
      <virtual-list :size="40" :remain="25">
        <p class="item" v-for="item in list" :key="item">{{item}}</p>
      </virtual-list>
      <div class="loading-box" v-show="isLoading">正在加载...</div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      selectQuery: null,
      oList: null,
      isRefresh: false,
      isLoading: false,
      queryForm: { page: 1, pageSize: 30 }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.queryListData()
  },
  // async onReachBottom() {
  //   this.queryListData()
  // },
  async onPullDownRefresh() {
    // this.queryForm.page = 1
    // this.list = []
    // this.$nextTick(() => {
    //   this.queryListData()
    // })
  },
  methods: {
    bindscroll(e) {
      // console.log(e)
    },
    bindscrolltoupper() {
      this.queryForm.page = 1
      this.list = []
      this.isRefresh = true
      this.$nextTick(() => {
        this.queryListData()
      })
    },
    bindscrolltolower() {
      this.isLoading = true
      this.queryListData()
    },
    forgeData(opt) {
      let temp = []
      let start = (opt.page - 1) * opt.pageSize
      let end = start + opt.pageSize
      for (let i = start; i < end; i++) {
        temp.push(i)
      }
      return temp
    },
    queryListData() {
      this.$utils.delay(1500).then(() => {
        this.isRefresh = false
        this.isLoading = false
        this.list = Object.freeze(
          this.list.concat(this.forgeData(this.queryForm))
        )

        this.queryForm.page += 1
        // 停止刷新
        mpvue.stopPullDownRefresh()
      })
    }
  }
}
</script>

<style lang="less" scope>
@import url('./index');
</style>
