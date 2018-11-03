<template>
  <q-page padding>
    <div class="page-view">
       <div class="page-titles">
        <h3>Customer Chart</h3>
      </div>
      <q-card>
        <q-card-title class="card-header">
          Yearly Customer Chart
          <div class="select-year">
            <q-select class="form-input" @input="yearChange" v-model="selectedYear" :options="yearList" />
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div>
            <customer-chart :chartData="yearlyChartData" />
          </div>
        </q-card-main>
      </q-card>

    </div>

  </q-page>
</template>

<script>

import api from 'src/services/api/api'
import CustomerChart from './bar'

export default {

  name: 'AdminDashboard',
  
  components: {
    CustomerChart
  },
  
  data () {
    return {
      yearlyChartData: [],
      yearList:[],
      selectedYear: '',
    }
  },

  methods:{

    yearChange(){
      this.getYearlyChartData()
    },

    getYearlyChartData(){
      
      let chartSampleData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let self = this
      let url = 'getCustomerYearlyChart?year='+ this.selectedYear

      api
        .get(url)
        .then(function(response){
          let data = response.data.data;
            data.forEach(function(value, key){
              if(value.month == '1'){
                chartSampleData[0] = value.count
              }
              if(value.month == '2'){
                chartSampleData[1] = value.count
              }
              if(value.month == '3'){
                chartSampleData[2] = value.count
              }
              if(value.month == '4'){
                chartSampleData[3] = value.count
              }
              if(value.month == '5'){
                chartSampleData[4] = value.count
              }
              if(value.month == '6'){
                chartSampleData[5] = value.count
              }
              if(value.month == '7'){
                chartSampleData[6] = value.count
              }
              if(value.month == '8'){
                chartSampleData[7] = value.count
              }
              if(value.month == '9'){
                chartSampleData[8] = value.count
              }
              if(value.month == '10'){
                chartSampleData[9] = value.count
              }
              if(value.month == '11'){
                chartSampleData[10] = value.count
              }
              if(value.month == '12'){
                chartSampleData[11] = value.count
              }
            })
          self.yearlyChartData = chartSampleData
        })
        .catch(function(error){
          console.log("get yearly chart data ---- ",error)
        })
        
    },
    
  },

  computed: {

  },

  filters:{

  },

  created(){
    let startYear = 2016;
    let today = new Date();
    let todayYear = today.getFullYear();
    let yearList = []
    for(let i=startYear; i<=todayYear;i++){
      let singleYear = {
        label: i.toString(),
        value: i
      }
      yearList.push(singleYear)
    }
    this.yearList = yearList
    this.selectedYear = todayYear
    this.getYearlyChartData()
  }

}
</script>

<style>

.select-year{
  width: 150px;
  float: right;
}

</style>
