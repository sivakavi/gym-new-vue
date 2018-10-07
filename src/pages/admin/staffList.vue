<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Staff</h3>
      </div>
       <!-- Satff list -->
      <q-btn class="add-btn" @click="addStaffModal">Add Staff</q-btn>
      <q-card>
        <q-card-title class="card-header">
          Staff List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="staffListTableData" :pagination.sync="pagination" :columns="staffcolumns" row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <!-- <q-td key="action" :props="props" >
                <q-btn round color="secondary" icon="visibility" @click="viewStaff(props.row)"/>
              </q-td> -->
              <q-td key="sno" :props="props" >
                {{props.row.__index + 1}}
              </q-td>
              <q-td key="staffName" :props="props" >
                 {{props.row.name}}
              </q-td>
              <q-td key="emailId" :props="props" >
                 {{props.row.email}}
              </q-td>
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>

    </div>

    <q-modal no-esc-dismiss no-backdrop-dismiss class="smart-model-view" v-model="staffAdd" :content-css="{ minWidth: '50vw'}">
      <q-card>
        <q-card-title class="model-header">
          <div class="model-title">Staff Add</div>
          <q-btn @click="staffAdd = false" flat icon="clear" class="header-btn" color="white" slot="right"></q-btn>
        </q-card-title>
      <q-card-main class="model-main">
            <div class="form-body">
              <div class="form-group">
                <div class="row gutter-sm">
                  <div class="col-md-3">
                    <label class="control-label">Name</label>
                  </div>
                <div class="col-md-7">
                  <q-input class="form-input" v-model="staffName"/>
                  <span class="form-group__error" v-if="$v.staffName.$error && !$v.staffName.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.staffName.$error && !$v.staffName.alphaWithSpaceDot">Invalid data.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Email</label>
                </div>
                <div class="col-md-7">
                  <q-input class="form-input" v-model="staffEmail"/>
                  <span class="form-group__error" v-if="$v.staffEmail.$error && !$v.staffEmail.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.staffEmail.$error && !$v.staffEmail.email">Invalid email.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Password</label>
                </div>
                <div class="col-md-7">
                  <q-input type="password" class="form-input" v-model="staffPassword"/>
                  <span class="form-group__error" v-if="$v.staffPassword.$error && !$v.staffPassword.required">Field is required.</span>
                  <span class="form-group__error" v-if="$v.staffPassword.$error && !$v.staffPassword.minLength">Should be minimum 8 characters</span>
                  <span class="form-group__error" v-if="$v.staffPassword.$error && !$v.staffPassword.maxLength">Should not exceed 20 characters</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="row gutter-sm">
                <div class="col-md-3">
                  <label class="control-label">Confirm Password</label>
                </div>
                <div class="col-md-7">
                  <q-input type="password" class="form-input" v-model="staffCPassword"/>
                  <span class="form-group__error" v-if="$v.staffCPassword.$error && !$v.staffCPassword.sameAsPassword">Passwords must be identical.</span>
                </div>
              </div>
            </div>
             
            <div class="row gutter-sm">
              <div class="col-md-3">
              </div>
              <div class="col-md-7">
                 <q-btn @click="addStaff" class="add-btn">Add Staff</q-btn>
              </div>
            </div>
          </div>
        
      </q-card-main>
      <q-card-actions class="model-footer">
        <div>
          
        </div>
      </q-card-actions>
      </q-card>
    </q-modal>
    
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
    alpha,
    sameAs
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

  name: 'StaffList',

  components: {

  },

  data () {
    return {
      staffListTableData: [],
      staffcolumns: [
        // {
        //   name: 'action',
        //   required: true,
        //   label: 'Action',
        //   align: 'left',
        // },
        {
          name: 'sno',
          required: true,
          label: 'SNO',
          align: 'left',
        },
        {
          name: 'staffName',
          required: true,
          label: 'Staff Name',
          align: 'left',
        },
        {
          name: 'emailId',
          required: true,
          label: 'Email Id',
          align: 'left',
        },
      ],
       pagination: {
        sortBy: null,
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      staffAdd: false,
      staffName: '',
      staffEmail: '',
      staffPassword: '',
      staffCPassword: ''
    }
  },

  validations(){
      return {
        staffName: {
          required,
          alphaWithSpaceDot
        },
        staffEmail: {
          required,
          email
        },
        staffPassword:{
          required,
          maxLength: maxLength(20),
          minLength: minLength(8)
        },
        staffCPassword: {
          sameAsPassword: sameAs('staffPassword')
        }
      }
  },

  computed: {
    
  },

  methods:{

    viewStaff(staff){
      console.log(staff)
    },

    getStaffList(){
      let self = this;
      api
        .get('getAllUser')
        .then(function(response) {
          self.staffListTableData = response.data.data;
        })
        .catch(function(error) {
          console.log("staff table get data error---",error);
        });
    },

    addStaffModal(){
      this.staffName = ''
      this.staffEmail = ''
      this.staffPassword = ''
      this.staffCPassword = ''
      this.$v.staffName.$reset()
      this.$v.staffEmail.$reset()
      this.$v.staffPassword.$reset()
      this.$v.staffCPassword.$reset()
      this.staffAdd = true
    },

    addStaff(){
      this.$v.staffName.$touch()
      this.$v.staffEmail.$touch()
      this.$v.staffPassword.$touch()
      this.$v.staffCPassword.$touch()
      if (this.$v.staffName.$error || this.$v.staffEmail.$error || this.$v.staffPassword.$error || this.$v.staffCPassword.$error) {
          this.$q.notify({
            position: "top",
            message: "Please review fields again."
          })
          return
      }

      let self = this
      let url = 'register'
      let requestData = {
        "name": this.staffName,
        "email": this.staffEmail,
        "password": this.staffPassword,
        "c_password": this.staffPassword
      }
      
      api
        .post(url, requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              type: 'positive',
              message: response.data.success
          })
          self.getStaffList()
          self.staffAdd = false
        })
        .catch(function (error) {
          self.$q.notify({
              position: "top",
              timeout: 2000,
              message: 'Something went wrong !!'
          })
        });
    },


  },

  created(){
    this.getStaffList()
  }

}
</script>

<style>

</style>
