# vue-slice-file-uploader

[![Build Status](https://travis-ci.com/PickerWang/v-slice-uploader.svg?branch=master)](https://travis-ci.com/PickerWang/v-slice-uploader)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

## Table of contents

- [Installation](#installation)
- [Documents](#documents)

# Installation

```
npm install --save vue-slice-file-uploader
```

## import

```javascript
import Vue from 'vue'
import VueSliceFileUploader from 'vue-slice-file-uploader'

Vue.use(VueSliceFileUploader)
```

# Documents

| `Property`               | `Type`               | `Default`                          | `Description`     |
|-----------------------|-----------------------|-----------------------------------|-----------------------------------|
|:name|String|''|name attribute of the file upload button|
|:id|String|''|id attribute of the file upload button|
|:accept|String|''|accept attribute of the file upload button|
|:capture|String|''|capture attribute of the file upload button|
|:disabled|Boolean|false|disabled attribute of the file upload button|
|:action|String|''|url of the slice upload request|
|:unique|Boolean|false|either return MD5 hash or not|
|:auto-upload|Boolean|false|either auto upload after file change event or not|
|:each-size|Number|2|each chunk size (MB)|
|:headers|Object|{}|headers of the slice upload request|
|:data|Object|{}|extra info of the slice upload request|
|:on-change|Function|(file) => {}|change callback of the file upload button|
|:before-upload|Function|(file, chunkList) => false|return false => stop upload, return true => start upload, return a chunkList => format the payload of slice upload request and start upload |
|:request|Function|(file, chunkList) => {}|customize slice upload request, will cover the default action|
|:on-cancel|Function|(file) => {}|cancel callback of slice upload|
|:on-success|Function|(file) => {}|success callback of slice upload|
|:on-error|Function|(file) => {}|error callback of slice upload|
