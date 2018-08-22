<script>
import { Line } from 'vue-chartjs'
export default {
  name: 'AppointmentChart',
  extends: Line,
  props: ['data', 'options'],
  mounted(){
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Appointments',
          data: [40, 56, 48, 60, 65, 76, 70, 80, 79, 66, 54, 78],
           backgroundColor: '#44c753',
        }
      ]
    })
  }
}
</script>

<style>
</style>
