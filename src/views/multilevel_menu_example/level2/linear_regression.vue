<route lang="yaml">
meta:
title: 导航2-1
</route>

<template>
  <div>

    <page-header>
      线性回归
    </page-header>

    <PageMain>
<!--      拖入文件上传部分 (有爆红但是代码没问题)-->
      <el-upload
        class="upload-demo"
        drag
        action=""
        :http-request = "uploadFile"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖拽至此处上传或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
<!--原来做测试用的按钮-->
<!--      <div>-->
<!--        <el-button type="primary" @click="">pictureTest</el-button>-->
<!--        <el-image :src='test'/>-->
<!--      </div>-->
      <div>
        <el-image :src="linregress_img"/>
      </div>
    </PageMain>
  </div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import api from "@/api";
import {ElMessage} from "element-plus";

const file_name = ref('1')
const linregress_img = ref('')

const success = (name) =>{
  ElMessage({
    message:`${name}文件上传成功`,
    type:'success'
  })
}

// 上传文件的请求
const uploadFile = (options: any) => {
  const { file } = options
  const formData = new FormData()
  formData.append('file', file)

  // 这里其实最好做成异步处理 因为图片上传 和后端图片返回响应是两步操作 但是暂时偷懒没做那么全
  api.post('/linear/regression', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      file_name.value = response.data.upload_data
      success(file_name.value)

      linregress_img.value = response.data.img_data

      // 可以在这里处理成功后的逻辑，比如显示成功提示
    })

    //没写完 对文件类型错误 数据解析方向的错误进行展示

    .catch(error => {
      console.error('文件上传失败:', error)
      // 可以在这里处理失败后的逻辑，比如显示错误提示
    })
}

// 图片测试
// const pictureTest = () => {
//   api.get('/pictureTest')
//     .then(response => {
//       console.log(response)
//       test.value =response.data.upload_data
//     })
// }

</script>
