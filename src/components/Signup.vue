<template lang="pug">
form.signUp
  .close(@click="close") X
  h6 註冊
  .row
    .col
      .form-group
        label(for='exampleInputName') 您的姓名
        input#exampleInputName.form-control(v-model.trim="signupForm.name" type='text' placeholder='姓名')
    .col
      .form-group
        label(for='exampleInputJobTitle') 您的職稱
        select#exampleInputJobTitle.form-control.form-control-sm(v-model.trim="signupForm.jobTitle")
          option 醫師
          option 心理師
  .form-group
    label(for='exampleInputEmail1') 電子信箱
    input#exampleInputEmail1.form-control(v-model.trim="signupForm.email" type='email' aria-describedby='emailHelp' placeholder='輸入電子信箱')
    small#emailHelp.form-text.text-muted 我們絕不會與其他任何人共享您的電子郵件。
  .form-group
    label(for='exampleInputPassword1') 密碼
    input#exampleInputPassword1.form-control(v-model.trim="signupForm.password" type='password' placeholder='密碼')
  button.btn.btn-secondary(@click="signup()") 註冊
</template>

<script>
export default {
  data() {
    return {
      signupForm: {
        name: '',
        jobTitle: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    signup() {
      if (this.name == ""){
        alert('姓名不可為空')
      }else if (this.jobTitle == '') {
        alert('請選擇您的職稱')
      }else {
        this.$store.dispatch('mLogin/signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
          jobTitle: this.signupForm.jobTitle
        })
      }
    },
  }
}
</script>

<style lang="sass">
.loginAndSignUp
  position: absolute
  width: 100%
  height: 100%
  z-index: 99
  background-color: rgba(0,0,0,0.3)
  display: none
  opacity: 0
  .close
    position: absolute
    right: 30px
    top: 20px
    cursor: pointer

.signUp
  z-index: 100
  background-color: white
  border: 1px solid black  
  width: 700px
  height: 600px
  border-radius: 30px
  padding: 50px
  position: absolute
  left: 50%
  top: 40%
  transform: translate(-350px, -250px)
  display: none
  opacity: 0
  h6
    text-align: center
  .btn
    font-size: 20px

.form-group
  font-size: 18px
</style>