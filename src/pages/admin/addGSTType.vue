<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Client : Add GST Type</h3>
      </div>
      <q-card>
        <q-card-title class="card-header">
          GST Type List
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="gstListTableData" hide-bottom :columns="gstcolumns" row-key="name" class="table-view">
                  <q-tr slot="body" slot-scope="props" :props="props">
                    <q-td key="action" :props="props" >
                      <q-btn round color="red" icon="delete_forever"/>
                      &nbsp;&nbsp;
                      <q-btn round color="amber" text-color="black" icon="edit" />
                    </q-td>
                    <q-td key="sno" :props="props" >
                      {{props.row.sno}}
                    </q-td>
                    <q-td key="type" :props="props" >
                      {{props.row.type}}
                    </q-td>
                    <q-td key="date" :props="props" >
                      {{props.row.date}}
                    </q-td>
                  </q-tr>
                </q-table>
                <br/>
                <br/>
                <br/>
                <br/>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-body">
                            <div class="form-group">
                                <div class="row gutter-sm">
                                    <div class="col-md-3">
                                    <label class="control-label col-md-3">GST Type</label>
                                    </div>
                                    <div class="col-md-5">
                                    <q-select  class="select-input" :options="gstOption" v-model="gstType"/>
                                    <span class="form-group__error" v-if="$v.gstType.$error && !$v.gstType.required">Field is required.</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <div class="row gutter-sm">
                                    <div class="col-md-3">
                                    <label class="control-label col-md-3">Next Due Date </label>
                                    </div>
                                    <div class="col-md-5">
                                    <q-datetime class="select-input" v-model="dueDate" type="date" />
                                    <span class="form-group__error" v-if="$v.dueDate.$error && !$v.dueDate.required">Field is required.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row gutter-sm">
                                <div class="col-md-3">
                                </div>
                                <div class="col-md-5">
                                    <q-btn @click="addGstType" class="add-btn">Add GST Type</q-btn>
                                </div>
                            </div>

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
  name: 'AddGSTType',
  components: {
  },
  data () {
    return {
      gstOption: [
        {
          label: 'GST Type 1',
          value: 'GST Type 1'
        },
        {
          label: 'GST Type 2',
          value: 'GST Type 2'
        },
        {
          label: 'GST Type 3',
          value: 'GST Type 3'
        },
        {
          label: 'GST Type 4',
          value: 'GST Type 4'
        },
      ],
      gstType: '',
      dueDate: '',
      gstcolumns: [
        {
          name: 'action',
          required: true,
          label: 'Action',
          align: 'left',
          field: 'action',
          sortable: false
        },
        {
          name: 'sno',
          required: true,
          label: 'SNO',
          align: 'left',
          field: 'sno',
          sortable: true
        },
        {
          name: 'type',
          required: true,
          label: 'Type',
          align: 'left',
          field: 'type',
          sortable: false
        },
        {
          name: 'date',
          required: true,
          label: 'Next Due Date',
          align: 'left',
          field: 'date',
          sortable: true
        },
      ]
    }
  },

  validations(){
      return {
            gstType: {
              required
            },
            dueDate: {
              required
           },
      }  
  },

  computed: {
    gstListTableData() {
       var gstArr = [
        {sno: 1, type: "GST Type 1", date: "31-10-2018"},
      ];
      return gstArr;
    }
  },

  methods:{

      addGstType(){

      }

  },

}
</script>

<style>
.table-view .statusDone{
  color: green;
}
.table-view .statusPending{
  color: red;
}
</style>
