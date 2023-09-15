<template>
    <div class="logo">
      <img src = "assets/adel_logo.png" style="width: 80px;height: 40px;">
    </div>
    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">房间号</el-text>
      </div>
      <div class="text">
        <el-input v-model="roomName" @change="changeRoomName" placeholder="请输入房间号" />
      </div>
    </div>

    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">开始时间</el-text>
      </div>
      <div class="text">
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="开始时间"
        :size="size"
      />
    </div>
    </div>


    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">离开时间</el-text>
      </div>
      <div class="text">
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="离开时间"
        :size="size"
      />
    </div>
    </div>

    <div class="item">
      <el-button type="primary">制作房卡</el-button>
      <el-button type="success">读取房卡</el-button>
      <el-button type="danger">清空房卡</el-button>
    </div>
     
 

  </template>
  
  <script setup>
 
 import { ref } from 'vue'

const size = ref<'default' | 'large' | 'small'>('default')

const roomName =  ref('8201')

const value1 = ref('')
const value2 = ref('')

const changeRoomName = (value)=>{
  console.log("房间号",value)
}

// const shortcuts = [
//   {
//     text: 'Today',
//     value: new Date(),
//   },
//   {
//     text: 'Yesterday',
//     value: () => {
//       const date = new Date()
//       date.setTime(date.getTime() - 3600 * 1000 * 24)
//       return date
//     },
//   },
//   {
//     text: 'A week ago',
//     value: () => {
//       const date = new Date()
//       date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
//       return date
//     },
//   },
// ]

// const disabledDate = (time) => {
//   return time.getTime() > Date.now()
// }
 
  </script>
  
  <style>
  body{
    padding: 10px;
  }
  .item{
    margin-top: 10px;
    align-items: center;
    display: flex;
    justify-content:  space-between;
  }
  .title{
    margin-right: 10px;
    width: 80px;    
  }
  .text{
    width: 280px;
  }

  .logo{
    margin-top: 0px;
    align-items: center;
    display: flex;
    justify-content:center;
  }

  </style>
  