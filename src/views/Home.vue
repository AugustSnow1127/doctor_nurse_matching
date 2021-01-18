<template lang="pug">
.home
  Login(v-if="loginStatus" v-on:close="closeLogin")
  Signup(v-if="signupStatus" v-on:close="closeSignup")

  navbar.navbar
    .title 醫師和治療師媒合系統
    .buttons
      button#loginBtn.btn.btn-primary(@click="openLogin") 登入
      button#signUpBtn.btn.btn-secondary(@click="openSignup") 註冊
  .system
    .indicators
      span.matchingDoc 媒合醫師：
      span.matchingTherapist 媒合治療師：
      .colorIndicator
        .square1
        span.matchingStatus 可媒合
        .square2
        span.matchingStatus 已媒合
    table.table.table-bordered
      thead
        tr
          th(scope='col') 日期\時間
          th.morning(scope='col') 9:00-9:30
          th.morning(scope='col') 9:30-10:00
          th.morning(scope='col') 10:00-10:30
          th.morning(scope='col') 10:30-11:00
          th.morning(scope='col') 11:00-11:30
          th.morning(scope='col') 11:30-12:00
          th.afternoon(scope='col') 13:00-13:30
          th.afternoon(scope='col') 13:30-14:00
          th.afternoon(scope='col') 14:00-14:30
          th.afternoon(scope='col') 14:30-15:00
          th.afternoon(scope='col') 15:00-15:30
          th.afternoon(scope='col') 15:30-16:00
          th.night(scope='col') 18:00-18:30
          th.night(scope='col') 18:30-19:00
          th.night(scope='col') 19:00-19:30
          th.night(scope='col') 19:30-20:00
          th.night(scope='col') 20:00-20:30
          th.night(scope='col') 20:30-21:00
      tbody
        tr#monday.weekday
          th(scope='row') --
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.night
          td.night
          td.night
          td.night
          td.night
          td.night
        tr#tuesday.weekday
          th(scope='row') --
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.night
          td.night
          td.night
          td.night
          td.night
          td.night
        tr#wednesday.weekday
          th(scope='row') --
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.night
          td.night
          td.night
          td.night
          td.night
          td.night
        tr#thursday.weekday
          th(scope='row') --
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.night
          td.night
          td.night
          td.night
          td.night
          td.night
        tr#friday.weekday
          th(scope='row') --
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.morning
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.afternoon
          td.night
          td.night
          td.night
          td.night
          td.night
          td.night
          
    .check#weekCheck
      .form-check.weekCheck
        input.weekRadios.form-check-input(type='radio' name='weekRadios' value='11/23-11/27' checked='')
        label.form-check-label 11/23-11/27
      .form-check.weekCheck
        input.weekRadios.form-check-input(type='radio' name='weekRadios' value='11/30-12/4' checked='')
        label.form-check-label 11/30-12/4
    .check
      .form-check.timeCheck
        input#sunRadios1.form-check-input(type='radio' name='timeRadios' value='morning' checked='')
        label.form-check-label 早上
      .form-check.timeCheck
        input#sunRadios2.form-check-input(type='radio' name='timeRadios' value='afternoon' checked='')
        label.form-check-label 下午
      .form-check.timeCheck
        input#sunRadios3.form-check-input(type='radio' name='timeRadios' value='night' checked='')
        label.form-check-label 晚上
      
    form.form
      .form-row
        .col
          label 醫師姓名：
          input#docNameInput.form-control(type='text' placeholder='姓名')
      .form-row
        .col
          label 治療師姓名：
          input#therapistNameInput.form-control(type='text' placeholder='姓名')
    
    .alertMsg 
    button#matchBtn.btn.btn-primary(type='button') 媒合
</template>

<script>
import $ from 'jquery'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import { mapState } from "vuex";

var selectedWeek 
var selectedTime
var selectedDocName = ""
var selectedTherapistName = ""
var selectedDoc = ""
var selectedTherapist = ""
var timeBlocksNum
var tempArray = []
var theWeekMonday 
var theWeekFriday
var theWeekMondayMonth
var theWeekFridayMonth 

var doctors = [{
  docName: "張醫師",
  availTime: [{
    weekday: '一',
    officeTime: '111000010011111111'
  },{
    weekday: '二',
    officeTime: '000000000000111111'
  },{
    weekday: '三',
    officeTime: '000000000000111111'
  },{
    weekday: '四',
    officeTime: '101101000111000000'
  },{
    weekday: '五',
    officeTime: '111000010011000000'
  }],
  bookedTime: []
}]

var therapists = [{
  therapistName: "張心理師",
  availTime: [{
    weekday: '一',
    officeTime: '000000000000111111'
  },{
    weekday: '二',
    officeTime: '111100101010000111'
  },{
    weekday: '三',
    officeTime: '111000111100000111'
  },{
    weekday: '四',
    officeTime: '001111001111111100'
  },{
    weekday: '五',
    officeTime: '000000000000000000'
  }],
}]

export default {
  data() {
    return {
      login: false,
      signup: false,
    }
  },
  computed: {
    ...mapState({
      loginStatus: state => state.mStatus.status.loginStatus,
      signupStatus: state => state.mStatus.status.signupStatus,
    }),
  },
  methods: {
    openLogin() {
      this.login = true
      this.$store.dispatch('mStatus/fetchStatus', {
        loginStatus: this.login,
        signupStatus: this.signup
      })
    },
    openSignup() {
      this.signup = true
      this.$store.dispatch('mStatus/fetchStatus', {
        loginStatus: this.login,
        signupStatus: this.signup
      })
    },
    closeLogin() {
      this.login = false
      this.$store.dispatch('mStatus/fetchStatus', {
        loginStatus: this.login,
        signupStatus: this.signup
      })
      $("html").css('overflow','auto')
      $("body").css('overflow','auto')
    },
    closeSignup() {
      this.signup = false
      this.$store.dispatch('mStatus/fetchStatus', {
        loginStatus: this.login,
        signupStatus: this.signup
      })
      $("html").css('overflow','auto')
      $("body").css('overflow','auto')
    },
  },
  mounted() {
    $(document).ready(function(){
      //登入註冊
      $("#loginBtn").click(function() {
        $(".loginAndSignUp").css('display', 'block')
        $(".loginAndSignUp").css('opacity', '1')
        $(".login").css('display', 'block')
        $(".login").css('opacity', '1')
        $("html").css('overflow','hidden')
        $("body").css('overflow','hidden')
      })
      $("#signUpBtn").click(function() {
        $(".loginAndSignUp").css('display', 'block')
        $(".loginAndSignUp").css('opacity', '1')
        $(".signUp").css('display', 'block')
        $(".signUp").css('opacity', '1')
        $("html").css('overflow','hidden')
        $("body").css('overflow','hidden')
      })
      
      //default render
      $(".afternoon").hide()
      $(".night").hide()
      $("#weekCheck").text("")
      $(".colorIndicator").hide()
      
      //渲染週選單
      let i
      for(i = 0; i < 5 ; i++) {
        theWeekMonday = getMonday(new Date(), i)
        theWeekFriday = getFriday(new Date(), i)
        theWeekMondayMonth = theWeekMonday.getMonth() + 1
        theWeekFridayMonth = theWeekFriday.getMonth() + 1
        
        $("#weekCheck").append("<div class='form-check weekCheck'></div>")
        i++
        $(".weekCheck:nth-child(" + i + ")").append("<input class='form-check-input weekRadios' type='radio' name='weekRadios' value='" + theWeekMonday.getFullYear() + "/" + theWeekMondayMonth + "/" + theWeekMonday.getDate() + "-" + theWeekFriday.getFullYear() + "/" + theWeekFridayMonth + "/" + theWeekFriday.getDate() +"' checked='' />")
        $(".weekCheck:nth-child(" + i + ")").append("<label class='form-check-label'>" + theWeekMondayMonth + "/" + theWeekMonday.getDate() + "-" + theWeekFridayMonth + "/" + theWeekFriday.getDate() +"</label>")
        i--
      }
      $("input[name=weekRadios]").each(function() {
        $(this).prop("checked", false);
      })
      
      $("input[name=timeRadios]").each(function() {
        $(this).prop("checked", false);
      })
      
      //evt handler
      $(function(){
        $('.weekday').on('click','.bookable',function(){
          console.log('Row ' + $(this).closest("tr").index())
          console.log('Column ' + $(this).closest("td").index()%7)
        })
      }) 

      $(".weekCheck").change(function(){
        selectedWeek = $('input[name=weekRadios]:checked').val()
        let dayOneYear = selectedWeek.split("-")[0].split("/")[0]
        let dayOneMonth = selectedWeek.split("-")[0].split("/")[1] - 1 
        let dayOneDay = selectedWeek.split("-")[0].split("/")[2]
        let firstDay = new Date(dayOneYear, dayOneMonth, dayOneDay)
        console.log("選擇週：" + selectedWeek)
        
        let i
        for(i = 1; i <= 5; i++) {
          let d = new Date(firstDay)
          d.setDate(firstDay.getDate()+i-1); 
          let m = d.getMonth() + 1
          let wd
          switch(d.getDay()) {
            case 1:
              wd = '一'
              break
            case 2:
              wd = '二'
              break
            case 3:
              wd = '三'
              break
            case 4:
              wd = '四'
              break
            case 5:
              wd = '五'
              break
          }
          $(".weekday:nth-child(" + i + ") th").text(m + "/" + d.getDate() + "(" + wd + ")")
        }
      })
      $(".timeCheck").change(function(){
        selectedTime = $('input[name=timeRadios]:checked').val()
        console.log("選擇時段：" + selectedTime)
        
        if(selectedTime == "morning"){
            $('.morning').show()
            $('.afternoon').hide()
            $('.night').hide()
          }else if (selectedTime == "afternoon"){
            $('.morning').hide()
            $('.afternoon').show()
            $('.night').hide()
          }else {
            $('.morning').hide()
            $('.afternoon').hide()
            $('.night').show()
          }
      })
      $("#docNameInput").change(function(){
        selectedDocName = $('#docNameInput').val()
        console.log("醫師：" + selectedDocName)
      })
      $("#therapistNameInput").change(function(){
        selectedTherapistName = $('#therapistNameInput').val()
        console.log("治療師：" + selectedTherapistName)
      })
      
      //媒合按鈕點擊
      $("#matchBtn").click(function(){
        let matchDocName = doctors.find(el => el.docName == selectedDocName)
        let matchTherapistName = therapists.find(el => el.therapistName == selectedTherapistName)
        
        //測試是否有欄位為空
        if(selectedWeek == "" || selectedTime == "" || selectedDocName == "" || selectedTherapistName == ""){
          $(".alertMsg").text("有欄位為空")
        }else if(!matchDocName){
          $(".alertMsg").text("未找到您輸入的醫師")
        }else if(!matchTherapistName){
          $(".alertMsg").text("未找到您輸入的治療師")
        }else{
          //清空所有表格
          $(".alertMsg").text("")
          $("td").text("")
            .css("background-color","white")
          $('.matchingDoc').text("媒合醫師：")
          $('.matchingTherapist').text("媒合治療師：")
          
          //填入醫師、治療師姓名
          $('.matchingDoc').append(selectedDocName)
          $('.matchingTherapist').append("<span class='selectedTherapistColor'>" + selectedTherapistName + "</span>")
          $('.colorIndicator').show()

          selectedDoc = doctors.filter(doc => doc.docName == selectedDocName)
          selectedTherapist = therapists.filter(therapist => therapist.therapistName == selectedTherapistName)
          
          //填入醫師有空的時間
          let i, j
          for(i = 0; i < selectedDoc[0].availTime.length; i++){
            switch(selectedDoc[0].availTime[i].weekday) {
              case '一':
                tempArray = selectedDoc[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedDoc[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#monday td:nth-child(" + j +")").text(selectedDocName)
                    j = j - 2
                  }
                }
                break
              case '二':
                tempArray = selectedDoc[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedDoc[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#tuesday td:nth-child(" + j +")").text(selectedDocName)
                    j = j - 2
                  }
                }
                break
              case '三':
                tempArray = selectedDoc[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedDoc[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#wednesday td:nth-child(" + j +")").text(selectedDocName)
                    j = j - 2
                  }
                }
                break
              case '四':
                tempArray = selectedDoc[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedDoc[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#thursday td:nth-child(" + j +")").text(selectedDocName)
                    j = j - 2
                  }
                }
                break
              case '五':
                tempArray = selectedDoc[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedDoc[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#friday td:nth-child(" + j +")").text(selectedDocName)
                    j = j - 2
                  }
                }
            }
          }
          //填入護理師有空的時間
          for(i = 0; i < selectedTherapist[0].availTime.length; i++){
            switch(selectedTherapist[0].availTime[i].weekday) {
              case '一':
                tempArray = selectedTherapist[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedTherapist[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#monday td:nth-child(" + j +")").append("<br>" + "<p class='selectedTherapistColor'>" + selectedTherapistName + "</p>")
                    if($("#monday td:nth-child(" + j +")").text().length > 5){
                      $("#monday td:nth-child(" + j +")").addClass("bookable")
                    }
                    j = j - 2
                  }
                }
                break
              case '二':
                tempArray = selectedTherapist[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedTherapist[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#tuesday td:nth-child(" + j +")").append("<br>" + "<p class='selectedTherapistColor'>" + selectedTherapistName + "</p>")
                    if($("#tuesday td:nth-child(" + j +")").text().length > 5){
                      $("#tuesday td:nth-child(" + j +")").addClass("bookable")
                    }
                    j = j - 2
                  }
                }
                break
              case '三':
                tempArray = selectedTherapist[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedTherapist[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#wednesday td:nth-child(" + j +")").append("<br>" + "<p class='selectedTherapistColor'>" + selectedTherapistName + "</p>")
                    if($("#wednesday td:nth-child(" + j +")").text().length > 5){
                      $("#wednesday td:nth-child(" + j +")").addClass("bookable")
                    }
                    j = j - 2
                  }
                }
                break
              case '四':
                tempArray = selectedTherapist[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedTherapist[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#thursday td:nth-child(" + j +")").append("<br>" + "<p class='selectedTherapistColor'>" + selectedTherapistName + "</p>")
                    if($("#thursday td:nth-child(" + j +")").text().length > 5){
                      $("#thursday td:nth-child(" + j +")").addClass("bookable")
                    }
                    j = j - 2
                  }
                }
                break
              case '五':
                tempArray = selectedTherapist[0].availTime[i].officeTime.split("")
                timeBlocksNum = selectedTherapist[0].availTime[i].officeTime.length
                for(j = 0; j < timeBlocksNum; j++){
                  if(tempArray[j] == 1){
                    j = j + 2
                    $("#friday td:nth-child(" + j +")").append("<br>" + "<p class='selectedTherapistColor'>" + selectedTherapistName + "</p>")
                    if($("#friday td:nth-child(" + j +")").text().length > 5){
                      $("#friday td:nth-child(" + j +")").addClass("bookable")
                    }
                    j = j - 2
                  }
                }
            }
          }
          $(".selectedTherapistColor").css("color","blue")
        }
      })
    })

    function getMonday(d, i) { 
      d = new Date(d); 
      var day = d.getDay(), 
      diff = d.getDate() - day + (day == 0 ? -6:1) + i*7; // adjust when day is sunday 
      return new Date(d.setDate(diff)); 
    } 

    function getFriday(d, i) { 
      d = new Date(d); 
      var day = d.getDay(), 
      diff = d.getDate() - day + (day == 0 ? -2:5) + i*7; // adjust when day is sunday
      return new Date(d.setDate(diff)); 
    } 
  },
  components: {
    Login,
    Signup
  },
}
</script>

<style lang="sass">
html, body
  width: 100%

.title
  font-weight: 600
  font-size: 26px
  
.buttons
  position: absolute
  right: 10px
  .btn
    font-size: 18px
  .btn-primary
    margin-right: 10px

.system
  padding: 20px
  
.navbar
  background-color: rgba(0,0,0,0.1)
  height: 60px
  width: 100%
  
.indicators, .colorIndicator
  display: flex
  font-size: 18px
  font-weight: 600
  align-items: center

.matchingDoc, .matchingTherapist
  margin-right: 50px

.square1, .square2
  height: 10px
  width: 20px
  border: 1px solid black
  margin-right: 10px

.square1
  background-color: yellow
.square2
  background-color: red

.matchingStatus
  margin-right: 50px

.table
  font-size: 18px
  margin: 10px 0px 0px 0px
  th
    background-color: rgba(0,0,0,0.05)
    text-align: center

.check
  display: flex
  .form-check-input
    transform: translateY(8px)

.form-check
  display: flex
  margin-right: 10px
  .form-check-label
    font-size: 16px
    transform: translateX(-5px)
  
.form
  width: 350px
  font-size: 16px
  .form-row
    margin-bottom: 10px
    .col
      display: flex
      align-items: center
      label
        width: 100px
        margin: 0
      .form-control
        width: 150px
        height: 30px
        font-size: 16px
        text-align: left
        padding: 5px

.btn
  height: auto
  width: auto
  padding: 5px 10px
  font-size: 16px
  font-weight: normal
  
.alertMsg
  color: red
  font-size: 16px

#matchBtn
  font-size: 14px

.bookable
  cursor: pointer
  background-color: yellow !important
  
</style>