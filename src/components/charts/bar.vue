<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'Patients',
  extends: Bar,
  mounted(){
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'New',
          backgroundColor: '#318dce',
          data: [20, 36, 18, 30, 45, 66, 60, 40, 69, 56, 60, 67]
          
        },
        {
          label: 'Old',
          backgroundColor: '#f7b349',
          data: [40, 56, 48, 60, 65, 76, 70, 80, 79, 66, 54, 78]
        }
      ]
    })
  }
}
</script>

<style>
</style>
