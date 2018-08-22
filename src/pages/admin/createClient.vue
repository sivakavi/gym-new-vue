<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Add Client <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>
       <!-- Doctor list -->
      <q-card>
        <q-card-title class="card-header">
          Client Information
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
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label col-md-3">Staff to Assign</label>
                </div>
                <div class="col-md-5">
                  <q-select  class="select-input" :options="staffOption" v-model="createForm.staff"/>
                  <span class="form-group__error" v-if="$v.createForm.staff.$error && !$v.createForm.staff.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Address Line 1</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.address1" placeholder="Address Line 1" />
                  <span class="form-group__error" v-if="$v.createForm.address1.$error && !$v.createForm.address1.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Address Line 2</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.address2" placeholder="Address Line 2" />
                  <span class="form-group__error" v-if="$v.createForm.address2.$error && !$v.createForm.address2.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">City</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.city" placeholder="City" />
                  <span class="form-group__error" v-if="$v.createForm.city.$error && !$v.createForm.city.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">State</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.state" placeholder="State" />
                  <span class="form-group__error" v-if="$v.createForm.state.$error && !$v.createForm.state.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Country</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.country" placeholder="Country" />
                  <span class="form-group__error" v-if="$v.createForm.country.$error && !$v.createForm.country.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Pincode</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="createForm.pincode" placeholder="Pincode" />
                  <span class="form-group__error" v-if="$v.createForm.pincode.$error && !$v.createForm.pincode.required">Field is required.</span>
                </div>
              </div>
            </div>
            <div class="row gutter-sm">
              <div class="col-md-3">
              </div>
              <div class="col-md-5">
                 <q-btn @click="createClient" class="add-btn">Create Client</q-btn>
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
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

import {
  alphaWithSpaceDot,
  alphaWithSpace,
  alphaWithDot,
  alphaNumericWithSpaceDot,
  alphaNumericWithSpace,
  alphaNumericWithDot,
  alphaNumericWithSpaceHyphen
} from '../../services/shared/customValidation.js'

export default {
  name: 'PageName',
  data () {
    return {
      createForm:{
        firstName: '',
        lastName: '',
        emailId: '',
        phoneNumber: '',
        staff: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        pincode:''
      },
      staffOption: [
        {
          label: 'Sivakavi',
          value: 'sivakavi'
        },
        {
          label: 'Pondybiz',
          value: 'pondybiz'
        },
      ]
    }
  },

  validations(){
      return {
          createForm:{
            firstName: {
              required,
              alphaNumericWithSpace
            },
            lastName: {
              required,
              alphaNumericWithSpace
            },
            emailId: {
              required,
              email
            },
            phoneNumber:{
              required,
              numeric
            },
            staff:{
              required
            },
            address1:{
              required
            },
            address2:{
              required
            },
            city:{
              required
            },
            state:{
              required
            },
            country:{
              required
            },
            pincode:{
              required
            }
          }
      }
  },

  methods:{

    createClient(){
      this.$v.createForm.$touch()
      if (this.$v.createForm.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      console.log(this.createForm)
    },

    goBack(){
      this.$router.push('/admin/clientlist')
    },

  },
 
}
</script>

<style>

</style>

