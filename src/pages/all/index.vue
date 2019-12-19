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
      <p class="item" v-for="item in list" :key="item">{{item}}</p>
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
      queryForm: { page: 1, pageSize: 100 }
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
    this.queryForm.page = 1
    this.list = []
    this.$nextTick(() => {
      this.queryListData()
    })
  },
  methods: {
    bindscroll(e) {
      console.log(e)
    },
    bindscrolltoupper() {
      console.log(22)
    },
    bindscrolltolower() {
      console.log(11)
      this.queryListData()
    },
    checkOListHeight() {
      this.selectQuery = mpvue.createSelectorQuery()
      this.selectQuery.select('#list').boundingClientRect()
      this.selectQuery.selectViewport().scrollOffset()
      this.selectQuery.exec(function(rect) {
        console.log(rect[0].height)
      })
    },
    boundingClientRect() {
      return this.selectQuery.select('.list-container').boundingClientRect()
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
      this.list = this.list.concat(this.forgeData(this.queryForm))
      this.queryForm.page += 1
      this.$nextTick(() => {
        this.checkOListHeight()
      })
      // 停止刷新
      mpvue.stopPullDownRefresh()
    }
  }
}
</script>

<style lang="less" scope>
@import url('./index');
</style>
