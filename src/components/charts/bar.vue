<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'CustomerChart',
  extends: Bar,
  mounted(){
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Customers',
          backgroundColor: '#318dce',
          data: [20, 36, 18, 30, 45, 66, 60, 40, 69, 56, 60, 67]
          
        }
      ]
    },{
      responsive: true,
      maintainAspectRatio: false,
    })
  }
}
</script>

<style>
</style>
