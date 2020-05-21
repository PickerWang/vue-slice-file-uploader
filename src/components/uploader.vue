<template>
  <div class="slice-uploader">
    <input
      type="file"
      :name="name"
      :id="id"
      :accept="accept"
      :capture="capture"
      :disabled="disabled"
      @change="change"
    >
  </div>
</template>

<script>
import upload from "/src/utils/upload";

const NOOP = function() {};
const EACH_SIZE = 1024 * 2;

export default {
  name: "uploader",
  props: {
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: ""
    },
    capture: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: ""
    },
    unique: {
      type: Boolean,
      default: false
    },
    eachSize: {
      type: Number,
      default: EACH_SIZE
    },
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    onChange: {
      type: Function,
      default: NOOP
    },
    beforeUpload: {
      type: Function,
      default: function() {
        return true;
      }
    },
    request: Function,
    onCancel: {
      type: Function,
      default: NOOP
    },
    onSuccess: {
      type: Function,
      default: NOOP
    },
    onError: {
      type: Function,
      default: NOOP
    }
  },
  data() {
    return {
      file: null
    };
  },
  computed: {
    chunkSize() {
      return (this.eachSize > 0 ? this.eachSize : EACH_SIZE) * 1024;
    }
  },
  methods: {
    change(e) {
      const [file] = e.target.files;
      this.file = file;
      this.onChange(file);
    },
    submit() {
      upload({
        file: this.file,
        action: this.action,
        unique: this.unique,
        headers: this.headers,
        data: this.data,
        chunkSize: this.chunkSize,
        beforeUpload: this.beforeUpload,
        request: this.request,
        onCancel: this.onCancel,
        onSuccess: this.onSuccess,
        onError: this.onError
      });
    }
  }
};
</script>

<style>
.slice-uploader {
  background: #ffff;
}
</style>