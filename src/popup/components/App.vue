<template>
    <div class="logo">
      <img src = "assets/adel_logo.png" style="width: 80px;height: 40px;">
    </div>
    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">房间号</el-text>
      </div>
      <div class="text">
        <el-input v-model="roomName" @input="changeRoomName" placeholder="请输入房间号" />
      </div>
    </div>

    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">开始时间</el-text>
      </div>
      <div class="text">
      <el-date-picker
        v-model="startDate"
        type="datetime"
        placeholder="开始时间"
        :size="size"
      />
    </div>
    </div>

    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">楼层</el-text>
      </div>
      <div class="text">
        <el-checkbox v-model="state.checked1" label="2F" size="large" />
        <el-checkbox v-model="state.checked2" label="3F" size="large" />
        <el-checkbox v-model="state.checked3" label="5F" size="large" />
      </div>
    </div>


    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">离开时间</el-text>
      </div>
      <div class="text">
      <el-date-picker
        v-model="endDate"
        type="datetime"
        placeholder="离开时间"
        :size="size"
      />
    </div>
    </div>

    <div class="item">
      <div class="title">
        <el-text class="mx-1" type="info">卡号</el-text>
      </div>
      <div class="text">
        <el-input v-model="cardNo"  placeholder="" />
      </div>
    </div>

    <div class="item">
      <el-button type="primary" @click="writeCard">制作房卡</el-button>
      <el-button type="success" @click="readCard">读取房卡</el-button>
      <el-button type="danger" @click="clearCard">清空房卡</el-button>
    </div>
     
 

  </template>
  
  <script setup>
 
 import { ref ,onMounted ,reactive } from 'vue'
 import { ElMessage } from 'element-plus'
 import { getDate ,setDate} from '../../utils/index.js'
 const socket = ref(null);
 
 const state = reactive({
  checked1: false,
  checked2: false,
  checked3: false,
})
 const msg = ref("")
 const roomName =  ref("")
 const cardNo = ref("")
 //const messages = ref([]);
 //组件加载连接socket

const size = ref<'default' | 'large' | 'small'>('default')



// 获取当前日期
var today = new Date();
// 设置时间为明天
today.setDate(today.getDate() + 1);
// 设置时间为 14 点
today.setHours(14, 0, 0, 0);
const startDate = ref(new Date())
const endDate =  ref(today)


onMounted(()=>{
  socket.value = new WebSocket("ws://192.168.10.113:8989/websockets");

  socket.value.onmessage = function (event) {

    const datas = JSON.parse(event.data)

    if(datas.type== "writeCard"){
      if(datas.status==0){
        ElMessage({
          message: '写入成功',
          type: 'success',
          })
      }
    }

    if(datas.type== "clearCard"){
      if(datas.status==0){
        ElMessage({
          message: '清卡成功',
          type: 'success',
          })
      }
    }
    
    if(datas.type == 'readCard'){
      console.log("读取卡片",datas)

      if(datas.status == 0){
        roomName.value = datas.data.room
        startDate.value = getDate(datas.data.startDate)
        endDate.value = getDate(datas.data.endDate)
        cardNo.value = datas.data.cardno
        ElMessage({
          message: '读取成功',
          type: 'success',
          })
      }
      if(datas.status ==7){
        ElMessage({
          message: '房卡为空',
          type: 'success',
          })
      }
   
    }
     
  }
 })

const changeRoomName = (value)=>{
  console.log("房间号",value)
  //console.log("value",value.length)
  if(value.length ==2){
    console.log("房间号",value%10)
    if(value%10==2){
      console.log("选中2")
      state.checked1 = true
    }
    if(value%10==3){
      state.checked2 = true
    }
    if(value%10==5){
      state.checked3 = true
    }
  }
  
}

const  sendSocket = (msg)=>{
  socket.value.send(JSON.stringify(msg.value))
}

const readCard = ()=>{
  msg.value = {
      "action":"readCard",
  }
    sendSocket(msg)
}

const clearCard = ()=>{
  msg.value = {
          "action":"clearCard",
          "cardNo" :cardNo.value  //清除卡号id
      }
  sendSocket(msg)
}

const writeCard = ()=>{

  const floors = []
  if(state.checked1 ==true){
    floors.push(1)
  }

  if(state.checked2 ==true){
    floors.push(2)
  }
  if(state.checked3 ==true){
    floors.push(3)
  }
  
  msg.value = {
          "action":"writeCard",
          "room":roomName.value,
          "cardNo":"",  //卡id 
          "overflag":1,  //是否覆盖
          "lift": floors.join(","),    //电梯楼层 1楼,2楼
          "guestName":'访客',   //名称 非必填
          "guestId" : "",
          "startDate" : setDate(startDate.value), //开始时间
          "endDate" : setDate(endDate.value) //结束时间
    }
    sendSocket(msg)
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
  