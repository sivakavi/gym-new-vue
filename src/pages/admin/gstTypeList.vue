<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>GST Type</h3>
      </div>
      <router-link class="add-btn" to="/admin/creategsttype">Add GST Type</router-link>
      <q-card>
        <q-card-title class="card-header">
          GST Type List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="gstTypeTableData" :columns="gsttypecolumns" :hide-bottom=true row-key="name" class="table-view">
             <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="gstType" :props="props" >
                 {{props.row.gst_type}}
              </q-td>
              <q-td key="dueDate" :props="props" >
                 {{props.row.due_date}}
              </q-td>
              <q-td key="action" :props="props" >
                <q-btn round color="amber" text-color="black" icon="edit" @click="editGSTType(props.row)" />
              </q-td>
             </q-tr>
          </q-table>
        </q-card-main>
      </q-card>
    </div>

    <q-modal no-esc-dismiss no-backdrop-dismiss class="smart-model-view" v-model="gstTypeEdit" :content-css="{ minWidth: '50vw'}">
      <q-card>
        <q-card-title class="model-header">
          <div class="model-title">Change password</div>
          <q-btn @click="gstTypeEdit = false" flat icon="clear" class="header-btn" color="white" slot="right"></q-btn>
        </q-card-title>
      <q-card-main class="model-main">

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
                 <q-btn @click="updateGSTType" class="add-btn">Update GST Type</q-btn>
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

import api from 'src/services/api/api';

import { 
    required, 
    email,
    minLength,
    maxLength,
    numeric,
    alpha
} from 'vuelidate/lib/validators'

export default {
  name: 'GSTTypeList',
  components: {
  },
  data () {
    return {
      gstType: '',
      dueDate: '',
      selectedId: '',
      gstTypeEdit: false,
      gstTypeTableData: [],
      gsttypecolumns: [
        {
          name: 'gstType',
          required: true,
          label: 'GST Type',
          align: 'left',
        },
        {
          name: 'dueDate',
          required: true,
          label: 'Due Date (Only Day Value)',
          align: 'left',
        },
        {
          name: 'action',
          label: 'Action',
          align: 'left',
        },
      ]
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

  computed: {
   
  },

  methods:{
    
    getGSTTypeList(){
      let self = this;
      api
        .get('gst-types')
        .then(function(response) {
          self.gstTypeTableData = response.data;
        })
        .catch(function(error) {
          console.log("gst type table get data error---",error);
        });
    },

    editGSTType(rowValue){
      this.selectedId = rowValue.id
      this.gstType = rowValue.gst_type
      this.dueDate = rowValue.due_date
      this.gstTypeEdit = true
    },

    updateGSTType(){
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
      let url = "gst-types/" + this.selectedId
      
      api
        .patch(url, requestData)
        .then(function (response) {
          self.$q.notify({
              position: "top",
              type: 'positive',
              message: response.data.message
          })
          self.gstTypeEdit = false
          self.getGSTTypeList()
          self.gstType = ''
          self.dueDate = ''
          self.selectedId = ''
          self.$v.gstType.$reset()
          self.$v.dueDate.$reset()
          
        })
        .catch(function (error) {
          console.log("update gst type error !!");
          // self.$q.notify({
          //     position: "top",
          //     message: 'Something went wrong !!'
          // })
        });
    },

  },

  created() {

    this.getGSTTypeList()

  }

}
</script>

<style>

</style>
