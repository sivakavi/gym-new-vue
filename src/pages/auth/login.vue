<template>
  <q-page class="login-page">
          <div class="login-form">
            <div class="icon-user"><img src="/statics/user.svg" alt=""></div>

            <h3>Login</h3>
            <div>
              <q-field icon="person">
                <q-input type="text"  placeholder="User id" v-model="form.username" />
                <span class="form-group__error" v-if="$v.form.username.$error && !$v.form.username.required">Field is required.</span>
              </q-field>

            </div>
            <div>
              <q-field icon="lock">
                <q-input type="password"  placeholder="Password" v-model="form.password" />
                <span class="form-group__error" v-if="$v.form.password.$error && !$v.form.password.required">Field is required.</span>
              </q-field>
            </div>
            <div class="forget">
                <q-checkbox  indeterminate v-model="check2" color="secondary" label="Remember me" />
                <span>Forgot password</span>
            </div>
            <div class="login-area">
              <q-field>
                    <q-btn
                      class="login-btn"
                      @click="loginSubmit"
                      label="Login"
                    />
                </q-field>
            </div>
          </div>
  </q-page>
</template>

<script>
import { 
    required, 
    email,
    minLength,
    maxLength,
    numeric,
    alpha
} from 'vuelidate/lib/validators'

import api from 'src/services/api/api'; 

export default {
  name: 'Login',
  data(){
    return {
      form: {
        username: "",
        password: ""
      },
      check2: false,
      picture: '../statics/img-01.png',
    }
  },

  validations(){
    return {
      form:{
        username: {
          required
        },
        password: {
          required
        }
      }
    }
  },

  methods: {
    loginSubmit(){
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      let self = this
      let requestData = {
        email: this.form.username,
        password: this.form.password
      }
      api
        .post("login", requestData)
        .then(function (response) {
          localStorage.authtoken = response.data.message
          self.$router.push('/admin/dashboard')
        })
        .catch(function (error) {
          if(error.response.status == 422 || error.response.status == 401)
          {
            self.$q.notify({
              position: "top",
              message: "Invalid Credentials"
            })
          }else{
            console.log("login fail error !!");
          }
        });
    }
  }
}
</script>

<style scoped>

.login-page{
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  position: relative;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  position: relative;
  z-index: 1;
}

.login-form{
 padding: 60px 50px;
 background: #ffffff;
 border-radius: 10px;
}

.login-form .icon-user{
  text-align: center;
}

.login-form img{
  width: 70px;
  height: 70px;
}

.login-form h3{
  font-size: 24px;
  font-weight: 600;
  color: #333333 !important;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 30px;
  margin: 0;
}

.login-form .q-field{
  margin-bottom: 30px;
}

.login-form .q-input, .q-select{
  font-size: 16px;
  color: #333333;
  width: 100%;
  background: #ededed !important;
  height: 50px;
  padding: 15px 15px 10px 30px;
  border-radius: 5px;
  border-bottom: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.text-primary{
  color: #ededed !important;
}

.login-form .q-if:before{
  background: none;
}

.login-area{
  text-align: center;
}

.login-form .q-input.q-if-focused{
 border: none;
}

.login-form .login-btn{
  text-align: center;
  width: 100%;
  margin-top: 30px;
  box-shadow: none;
  background: #5a78db;
  color: #ffffff !important;
  padding: 15px 0;
  border-radius: 5px;
}

.login-form .forget{
  font-size: 16px;
  color: #909193;
  font-weight: 500;
}

.login-form .forget span{
  float: right;
  cursor: pointer;
}

.q-popover {
  background: #0486f5;
  color: #ffffff;
}

.q-popover .q-list{
  padding: 0;
}

@media only screen and (max-width: 767px) {
  .login-form{
    padding: 60px 20px;
  } 
}

@media only screen and (max-width: 374px) {
  .login-form{
    padding: 60px 5px;
  } 
}

</style>
