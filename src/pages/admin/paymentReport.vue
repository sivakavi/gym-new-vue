<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Payment Report</h3>
      </div>
      <div class="row">
        <div class="col-md-3 padding-center">
          <div class="padding-bottom-5">Start Date</div>
          <q-datetime class="form-input" :max="maxDay" format="DD-MM-YYYY" v-model="dos"/>
          <span class="form-group__error" v-if="$v.dos.$error && !$v.dos.required">Field is required.</span>
        </div>
        <div class="col-md-3 padding-center">
          <div class="padding-bottom-5">End Date</div>
          <q-datetime class="form-input" :max="maxDay" format="DD-MM-YYYY" v-model="doe"/>
          <span class="form-group__error" v-if="$v.doe.$error && !$v.doe.required">Field is required.</span>
        </div>
        <div class="col-md-3 padding-center">
          <div class="padding-bottom-5">Staff</div>
          <q-select class="form-input" v-model="staff" :options="staffOptions"/>
        </div>
        <div class="col-md-3 btn-padding">
          <q-btn color="purple" @click="getPaymentReport" label="Get Report" />
        </div>
      </div>
      <br/>
      <q-card>
        <q-card-title class="card-header">
          Payment Report
          <span style="float:right"> Total Amount : {{totalAmount}}</span>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-table :data="paymentList" :pagination.sync="pagination" :columns="paymentColumns" row-key="name" class="table-view">
            <q-tr slot="body" slot-scope="props" :props="props">
              <q-td key="customer_id" :props="props" >
                
              </q-td>
              <q-td key="name" :props="props" >
                
              </q-td>
              <q-td key="subscription_name" :props="props" >
                {{props.row.customerSubscription.name}}
              </q-td>
              <q-td key="amount" :props="props" >
                {{props.row.amount | showPrice}}
              </q-td>
              <q-td key="paid_at" :props="props" >
                {{props.row.paid_at | momentDate}}
              </q-td>
            </q-tr>
          </q-table>
        </q-card-main>
      </q-card>

    </div>
    
  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import moment from 'moment';

import { 
    required, 
    email,
    minLength,
    maxLength,
    numeric,
    alpha
} from 'vuelidate/lib/validators'

export default {

  name: 'PaymentReport',
  
  components: {
  
  },
  
  data () {
    return {
      paymentList: [],
      paymentColumns: [
        {
          name: 'customer_id',
          label: 'ID',
          align: 'left',
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          align: 'left',
          sortable: true
        },
        {
          name: 'subscription_name',
          label: 'Subscription',
          align: 'left',
          sortable: true
        },
        {
          name: 'amount',
          label: 'Paid Amount',
          align: 'left',
          sortable: false
        },
        {
          name: 'paid_at',
          label: 'Paid On',
          align: 'left',
          sortable: false
        },
      ],
       pagination: {
        sortBy: null, // String, column "name" property value
        descending: true,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      staffOptions: [
        {
          label: 'All',
          value: 'all'
        }
      ],
      staff: 'all',
      dos: '',
      doe: '',
      maxDay: '',
      totalAmount: 0
    }
  },

  validations(){
      return {
            dos:{
              required
            },
            doe:{
              required
            }
          }
  },

  computed: {
    
  },

  methods:{

    getStaffList(){
      let self = this;
      api
        .get('getAllUser')
        .then(function(response) {
          let staffList = response.data.data;
          staffList.forEach(function(element) {
            let singleItem = {
              label: element.name,
              value: element.id
            }
            self.staffOptions.push(singleItem)
          });
        })
        .catch(function(error) {
          console.log("staff table get data error---",error);
        });
    },

    getPaymentReport(){
      let self = this;
      this.$v.dos.$touch()
      this.$v.doe.$touch()
      if (this.$v.dos.$error || this.$v.doe.$error) {
        this.$q.notify({
          position: "top",
          message: "Please review fields again."
        })
        return
      }
      let startCheck = moment(moment(this.dos).format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss")
      let endCheck = moment(moment(this.doe).format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss")
      if(endCheck.isSameOrAfter(startCheck)){
        let startDate = moment(this.dos).format('YYYY-MM-DD')
        let endDate = moment(this.doe).format('YYYY-MM-DD')
        let url = 'getPaymentReport?dos='+startDate+'&doe='+endDate
        if(this.staff != '' && this.staff != 'all'){
          url = url + '&user_id='+this.staff
        }
        api
          .get(url)
          .then(function(response) {
            self.paymentList = response.data.data;
            self.calculateTotal(self.paymentList);
          })
          .catch(function(error) {
            console.log("payment table get data error---",error);
          });
      }else{
        this.$q.notify({
          position: "top",
          message: "End date is must greater than Start date."
        })
      }
    },

    calculateTotal(paymentlist){
      let finalAmount = 0
      paymentlist.forEach(function(element){
        let floatAmount = parseFloat(element.amount)
        finalAmount = finalAmount + floatAmount
      })
      this.totalAmount = finalAmount
    }

  },

  filters:{

    momentDate: function (date) {
      if(date)
        return moment(date).format('DD-MM-YYYY');
      else
        return date
    },

    showPrice: function(price){
      if(price){
        if(price.indexOf(".") > -1){
          let priceArray = price.split('.')
          return priceArray[0]
        }else{
          return price
        }
      }else{
        return price
      }
    }

  },

  created() {
    let today = moment().format('YYYY-MM-DD');
    this.maxDay = today;
    //this.dos = this.maxDay
    //this.doe = this.maxDay
    this.getStaffList()
  }

}
</script>

<style>

.q-table-top{
  padding-bottom: 30px;
}

.padding-bottom-5{
  padding-bottom: 5px
}

.btn-padding{
  padding: 28px 10px 0px 10px;
}

.padding-center{
  padding: 0 10px;
}

.select-input{
    width: 100%;
    height: 45px;
    padding: 7px 12px;
    font-size: 14px;
    color: #555;
    border: 1px solid #ccc;
    border-bottom: none;
}

.black-color{
  color: #000 !important;
}

</style>
