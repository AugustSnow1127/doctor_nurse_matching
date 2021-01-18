<template lang="pug">
.loginAndSignUp
  form.login
    .close(@click="close") X
    h6 登入
    .form-group
      label(for='exampleInputEmail1') 電子信箱
      input#exampleInputEmail1.form-control(v-model.trim="loginForm.email" type='email' aria-describedby='emailHelp' placeholder='輸入電子信箱')
    .form-group
      label(for='exampleInputPassword1') 密碼
      input#exampleInputPassword1.form-control(v-model.trim="loginForm.password" type='password' placeholder='密碼')
    button.btn.btn-primary(@click="login()") 登入
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    login() { 
      this.$store.dispatch('mLogin/login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
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

.login
  z-index: 100
  background-color: white
  border: 1px solid black  
  width: 700px
  height: 500px
  border-radius: 30px
  padding: 50px
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-350px, -250px)
  display: none
  opacity: 0
  h6
    text-align: center
  .btn
    font-size: 20px
</style>