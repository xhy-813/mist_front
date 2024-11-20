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
    </PageMain>
  </div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import api from "@/api";
import {ElMessage} from "element-plus";

const success = () =>{
  ElMessage({
    message:'文件上传成功',
    type:'success'
  })
}

// 上传文件的请求
const uploadFile = (options: any) => {
  const { file } = options
  const formData = new FormData()
  formData.append('file', file)

  api.post('/linear/regression', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      success()
      // 可以在这里处理成功后的逻辑，比如显示成功提示
    })

    //没写完 对文件类型错误 数据解析方向的错误进行展示

    .catch(error => {
      console.error('文件上传失败:', error)
      // 可以在这里处理失败后的逻辑，比如显示错误提示
    })
}

</script>
