<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Add GST Type <q-btn round color="black" @click="goBack" style="float:right;" icon="keyboard_backspace" /></h3>
      </div>
       <!-- Doctor list -->
      <q-card>
        <q-card-title class="card-header">
          Gst Type Information
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div class="form-body">
            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Type name</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="gstType" placeholder="Gst Type Name" />
                  <span class="form-group__error" v-if="$v.gstType.$error && !$v.gstType.required">Field is required.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Due Date (Only Day Value)</label>
                </div>
                <div class="col-md-5">
                  <q-input class="form-input" v-model="dueDate" placeholder="Due Date" />
                  <span class="form-group__error" v-if="$v.dueDate.$error && !$v.dueDate.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.dueDate.$error && !$v.dueDate.numeric">Accept numeric value only.</span>
                </div>
              </div>
            </div>
             
            <div class="row gutter-sm">
              <div class="col-md-3">
              </div>
              <div class="col-md-5">
                 <q-btn @click="createGSTType" class="add-btn">Create GST Type</q-btn>
              </div>
            </div>
          </div>
        </q-card-main>
      </q-card>
    </div>
    
  </q-page>
</template>

<script>

import api from 'src/services/api/api';

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
  name: 'AddGSTType',
  data () {
    return {
      gstType: '',
      dueDate: ''
    }
  },

  validations(){
      return {
            gstType:{
              required
            },
            dueDate:{
              required,
              numeric
            }
      }
  },

  methods:{

    createGSTType(){
      this.$v.gstType.$touch()
      this.$v.dueDate.$touch()
      if (this.$v.gstType.$error || this.$v.dueDate.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      
      let self = this
      let requestData = {
        gst_type: this.gstType,
        due_date: this.dueDate
      }
      
      api
        .post("gst-types", requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              type: 'positive',
              message: response.data.message
          })
          self.gstType = ''
          self.dueDate = ''
          self.$v.gstType.$reset()
          self.$v.dueDate.$reset()
        })
        .catch(function (error) {
          console.log("add gst type error !!");
          // self.$q.notify({
          //     position: "top",
          //     message: 'Something went wrong !!'
          // })
        });
    },

    goBack(){
      this.$router.push('/admin/gsttypelist')
    },

  },
 
}
</script>

<style>

</style>

