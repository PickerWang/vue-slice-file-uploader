import SparkMD5 from 'spark-md5';
import axios from 'axios';

const blobSlice =
  File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;

function _slice(file, chunkSize) {
  const chunks = [];
  const chunkCount = Math.ceil(file.size / chunkSize);
  for (let i = 0; i < chunkCount; i++) {
    chunks.push(blobSlice.call(file, chunkSize * i, chunkSize * (i + 1)));
  }
  return chunks;
}

function _hash(file, chunks) {
  const fileReader = new FileReader();
  const spark = new SparkMD5();
  return new Promise((resolve) => {
    let current = 0;
    _read();
    fileReader.onload = e => {
      spark.append(e.target.result);
      if (current < chunks.length) {
        _read();
      } else {
        spark.append(file.name);
        const hexHash = spark.end();
        resolve(hexHash);
      }
    };
    fileReader.onerror = () => {
      resolve(null);
    };
    function _read() {
      fileReader.readAsArrayBuffer(chunks[current++]);
    }
  });
}

const errMsg = {
  NO_FILE: 'no file or file type is wrong',
  NO_ACTION: 'no action'
};

export default async function upload({
  file,
  action,
  unique,
  headers,
  data,
  chunkSize,
  beforeUpload,
  request,
  onCancel,
  onSuccess,
  onError
}) {
  const type = Object.prototype.toString.call(file);
  if (type === '[object File]' || type === '[object Blob]') {
    const chunks = _slice(file, chunkSize);
    const hash = unique ? await _hash(file, chunks) : null;
    let dataList = chunks.map((chunk, index) => {
      let res = {};
      Object.keys(data).forEach(key => {
        res[key] = data[key];
      });
      res.chunk = chunk;
      res.index = index;
      if (hash) res.hash = hash;
      return res;
    });

    if (request) return request(file, dataList);

    const before = beforeUpload(file, dataList);
    if (!before) {
      return onCancel(file);
    } else {
      if (!action) return onError(Error(errMsg.NO_ACTION));
      if (Object.prototype.toString.call(before) === '[object Array]')
        dataList = before;
      const queue = dataList.map(d => {
        const formData = new FormData();
        Object.keys(d).forEach(key => {
          formData.append(key, d[key]);
        });
        return axios.post(action, formData, { headers });
      });
      axios
        .all(queue)
        .then(onSuccess)
        .catch(onError);
    }
  } else {
    return onError(Error(errMsg.NO_FILE));
  }
}
