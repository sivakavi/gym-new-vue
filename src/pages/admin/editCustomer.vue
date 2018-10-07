<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Edit Customer <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>
       <!-- Doctor list -->
      <q-card>
        <q-card-title class="card-header">
          Customer Information
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div class="form-body">
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">First name</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.firstName" placeholder="First name" />
                  <span class="form-group__error" v-if="$v.createForm.firstName.$error && !$v.createForm.firstName.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.createForm.firstName.$error && !$v.createForm.firstName.alphaWithSpaceDot">Invalid data.</span>
                </div>
              </div>
            </div>
             <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">Last name</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.lastName" placeholder="Last name" />
                  <span class="form-group__error" v-if="$v.createForm.lastName.$error && !$v.createForm.lastName.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.createForm.lastName.$error && !$v.createForm.lastName.alphaWithSpaceDot">Invalid data.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">Email id</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.emailId" placeholder="Email id" />
                  <span class="form-group__error" v-if="$v.createForm.emailId.$error && !$v.createForm.emailId.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.createForm.emailId.$error && !$v.createForm.emailId.email">Invalid Email.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">Phone number</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.phoneNumber" placeholder="Phone number" />
                  <span class="form-group__error" v-if="$v.createForm.phoneNumber.$error && !$v.createForm.phoneNumber.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.createForm.phoneNumber.$error && !$v.createForm.phoneNumber.numeric">Invalid Mobile Number.</span>
                  <span class="form-group__error" v-if="$v.createForm.phoneNumber.$error && !$v.createForm.phoneNumber.minLength">Should be minimum 10 digit</span>
                  <span class="form-group__error" v-if="$v.createForm.phoneNumber.$error && !$v.createForm.phoneNumber.maxLength">Should not exceed 10 digit</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">Gender</label>
                </div>
                <div class="col-md-5">
                  <q-select  class="select-input" :options="genderOption" v-model="createForm.gender"/>
                  <span class="form-group__error" v-if="$v.createForm.gender.$error && !$v.createForm.gender.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">DOB</label>
                </div>
                <div class="col-md-5">
                  <q-datetime class="form-input" :max="maxDay" format="DD-MM-YYYY" v-model="createForm.dob"/>
                  <span class="form-group__error" v-if="$v.createForm.dob.$error && !$v.createForm.dob.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">DOJ</label>
                </div>
                <div class="col-md-5">
                  <q-datetime class="form-input" format="DD-MM-YYYY" v-model="createForm.doj"/>
                  <span class="form-group__error" v-if="$v.createForm.doj.$error && !$v.createForm.doj.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="row gutter-sm">
              <div class="col-md-3">
              </div>
              <div class="col-md-5">
                 <q-btn @click="editCustomer" class="add-btn">Edit Customer</q-btn>
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    
  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import { 
    required, 
    email,
    minLength,
    maxLength,
    numeric,
    alpha
} from 'vuelidate/lib/validators'
import {
  alphaWithSpaceDot,
  alphaWithSpace,
  alphaWithDot,
  alphaNumericWithSpaceDot,
  alphaNumericWithSpace,
  alphaNumericWithDot,
  alphaNumericWithSpaceHyphen
} from '../../services/shared/customValidation.js'
import moment from 'moment';

export default {

  name: 'AddCustomer',
  
  data () {
    return {
      customerID: '',
      createForm:{
        firstName: '',
        lastName: '',
        emailId: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        doj: '',
        photo: ''
      },
      maxDay: '',
      genderOption: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Others',
          value: 'other'
        },
      ]
    }
  },

  validations(){
      return {
          createForm:{
            firstName: {
              required,
              alphaWithSpaceDot
            },
            lastName: {
              required,
              alphaWithSpaceDot
            },
            emailId: {
              required,
              email
            },
            phoneNumber:{
              required,
              numeric,
              maxLength: maxLength(10),
              minLength: minLength(10)
            },
            gender:{
              required
            },
            dob:{
              required
            },
            doj:{
              required
            }
          }
      }
  },

  methods:{

    editCustomer(){
      this.$v.createForm.$touch()
      if (this.$v.createForm.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      
      let self = this
      let url = 'customers/'+this.customerID
      let requestData = {
        "fname": this.createForm.firstName,
        "lname": this.createForm.lastName,
        "dob": moment(this.createForm.dob).format('YYYY-MM-DD'),
        "mobileno": this.createForm.phoneNumber,
        "email": this.createForm.emailId,
        "gender": this.createForm.gender,
        "doj": moment(this.createForm.doj).format('YYYY-MM-DD'),
        "photo": ""
      }
      
      api
        .put(url, requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              type: 'positive',
              message: response.data.message
          })
        })
        .catch(function (error) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              message: 'Something went wrong !!'
          })
        });
    },

    goBack(){
      this.$router.push('/admin/customer-list')
    },

    getCustomer(){
      let self = this;
      api
        .get('customers/'+this.customerID)
        .then(function(response) {
          let data = response.data.data
          self.createForm = {
            firstName: data.fname,
            lastName: data.lname,
            emailId: data.email,
            phoneNumber: data.mobileno,
            gender: data.gender,
            dob: data.dob,
            doj: data.doj,
            photo: ''
          }
        })
        .catch(function(error) {
          console.log("customer get data error---",error);
        });
    },

  },

  created(){
    let today = moment().format('YYYY-MM-DD');
    this.maxDay = today;
    this.customerID = this.$route.params.id;
    this.getCustomer()
  }
 
}
</script>

<style>

</style>

