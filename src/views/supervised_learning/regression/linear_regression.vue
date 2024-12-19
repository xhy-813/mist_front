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

<!--      在整个div左下角的位置有个小灰框就是这个东西 其实应该改一下的 在图片未正常加载的时候也应该有个正常的占位 但是懒得改了-->
      <div>
        <el-image :src="linregress_img"/>
      </div>
      <div v-if="linregress_img">
        <el-row>
          您的文件中拥有{{row_number}}行数据
        </el-row>
        <el-row>
          通过线性回归预测您的第{{row_number+1}}行数据应该为{{predict_data}}
        </el-row>
      </div>
    </PageMain>
  </div>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import api from "@/api";
import {ElMessage} from "element-plus";
import { ref } from 'vue'

const row_number = ref('')
const file_name = ref('')
const predict_data = ref('')
const linregress_img = ref(null)


const success = (name) =>{
  ElMessage({
    message:`${name}文件上传成功`,
    type:'success'
  })
}

// 删除文件后的处理
const set_zero = () => {
  linregress_img.value = null
  ElMessage({
    type: 'success',
    message: '文件删除成功'
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
  api.post('/linear/regression', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
          // 可以在这里处理成功后的逻辑，比如显示成功提示
          file_name.value = response.data.upload_data
          success(file_name.value)
          linregress_img.value = response.data.img_data
          row_number.value = response.data.excel_row
          predict_data.value = response.data.predict_data
    })
    .catch(error => {
      console.error('文件上传失败:', error)
      // 可以在这里处理失败后的逻辑，比如显示错误提示
    })
}
</script>
