<template>
  <div id="app">
    <slice-uploader
      ref="uploader"
      :action="action"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :on-error="onError"
      :unique="true"
    />
    <button @click="handleUpload">开始上传</button>
  </div>
</template>

<script>

export default {
  computed: {
    action() {
      return `${location.origin}/upload`
    }
  },
  methods: {
    onChange(file) {
      console.log(file);
    },
    handleUpload() {
      this.$refs.uploader.submit();
    },
    beforeUpload(file, dataList) {
      console.log(dataList);
      return true;
    },
    onError(e) {
      console.log(e.message);
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
