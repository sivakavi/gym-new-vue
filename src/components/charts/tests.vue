<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  mounted(){
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'ECG',
          data: [44, 66, 78, 60, 65, 66, 80, 60, 79, 69, 74, 58],
          borderColor: "#ec9422",
          fill:false
        },
        {
          label: 'XRAY',
          data: [34, 56, 18, 80, 55, 46, 60, 60, 65, 55, 70, 38]
          ,
          borderColor: "#3c92ea",
          fill:false
        },
        {
          label: 'Blood test',
          data: [64, 46, 58, 50, 45, 56, 58, 55, 69, 55, 80, 68]
          ,
          borderColor: "#e346ed",
          fill:false
        }
      ]
    })
  }
}
</script>

<style>
</style>
