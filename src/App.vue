<template>
  <div id="app">
    <uploader
      ref="uploader"
      action="localhost:8080/upload"
      :data="{name: 'wang', index: 1}"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :on-error="onError"
      :request="request"
      :unique="true"
    />
  </div>
</template>

<script>
import uploader from "./components/uploader.vue";

export default {
  components: {
    uploader
  },
  methods: {
    onChange(file) {
      console.log(file);
      this.$refs.uploader.submit();
    },
    beforeUpload(file, dataList) {
      console.log(dataList);
      return true;
    },
    onError(e) {
      console.log(e.message);
    },
    request(file, dataList) {
      console.log(dataList);
    }
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
