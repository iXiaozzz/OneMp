<template>
  <div>
    <button @tap.stop="bindStop">停止</button>
    <button @tap.stop="bindPlay">播放</button>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {}
  },

  created() {
    mpvue.playBackgroundAudio({
      dataUrl: 'http://music.163.com/song/media/outer/url?id=448780541.mp3',
      title: '好好',
      coverImgUrl: 'https://w.wallhaven.cc/full/ox/wallhaven-oxwk75.jpg'
    })
  },
  methods: {
    bindStop() {
      mpvue.pauseBackgroundAudio()
    },
    bindPlay() {
      mpvue.pauseBackgroundAudio()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
