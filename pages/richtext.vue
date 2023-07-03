<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="12">
        <client-only>
          <editor
            api-key="no-api-key"
            v-model="text"
            :init="{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
            }"
          /> </client-only
      ></el-col>
      <el-col :span="12">
        <div class="font-bold text-2xl">Rich Text Content</div>
        <div>{{ text }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'

const text = ref('<h1>Rich Text Content</h1>')
</script>

