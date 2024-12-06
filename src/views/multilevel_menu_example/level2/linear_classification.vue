<route lang="yaml">
meta:
  title: 导航2-1
</route>

<template>
  <div>

    <PageHeader>
      线性分类
    </PageHeader>

    <PageMain>
 <!--      拖入文件上传部分 (有爆红但是代码没问题)-->
      <el-upload
        class="upload-demo"
        :limit= '1'
        drag
        action=""
        :http-request = "uploadFile"
        :on-exceed="handleExceed"
        :on-remove="set_zero"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖拽至此处上传或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            仅支持xls和xlsx文件类型哦
          </div>
        </template>
      </el-upload>

      <div>
        <el-image :src="train_img"/>
      </div>

      <div>
        <el-image :src="test_img"/>
      </div>
    </PageMain>
  </div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import api from "@/api";
import {ElMessage, ElMessageBox} from "element-plus";
import { ref } from 'vue'

const upload_data = ref('')
const linregress_img = ref(null)
const train_img = ref(null)
const test_img = ref(null)

// http返回响应如果是500的话可能是文件列名有错误
const http_fail = (response) =>{
  ElMessage({
    type: 'error',
    message:`${response}`
  })
}

const success = (name) =>{
  ElMessage({
    message:`${name}文件上传成功`,
    type:'success'
  })
}

const set_zero = () => {
  linregress_img.value = null
  ElMessage({
    type: 'success',
    message: '文件删除成功'
  })
}

const fail = () =>{
  ElMessageBox.alert('都说了仅支持xls和xlsx文件类型，怎么就不听呢','警告',{
    confirmButtonText:'好的，我知道了',
    callback:()=>{
      ElMessage({
        type:'warning',
        message:'你最好是真的长记性了'
      })
    }
  })
}

// 单次仅允许提交单个文件的处理
const handleExceed = () =>{
  ElMessage({
    type: 'warning',
    message:'一次只能提交一个文件哦 请将上一个上传的文件删除'
  })
}

// 上传文件的请求
const uploadFile = (options: any) => {
  const { file } = options
  const formData = new FormData()
  formData.append('file', file)

  // 这里其实最好做成异步处理 因为图片上传 和后端图片返回响应是两步操作 但是暂时偷懒没做那么全
  api.post('/linear/classification', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      if (response.status === 1) {
        if (response.data.status === 0) {
          // 可以在这里处理成功后的逻辑，比如显示成功提示
          upload_data.value = response.data.upload_data
          success(upload_data.value)
          train_img.value = response.data.train_img_data
          test_img.value = response.data.test_img_data

        }else if(response.data.status === 1) {
          fail()
        }
      }else {
        http_fail(response.status)
      }

    })
    .catch(error => {
      console.error('文件上传失败:', error)
      // 可以在这里处理失败后的逻辑，比如显示错误提示
    })
}
</script>
