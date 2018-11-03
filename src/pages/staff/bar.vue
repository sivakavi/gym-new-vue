<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'CustomerChart',
  extends: Bar,
  props:['chartData'],
  mounted(){
    this.renderBarChart();
  },
  computed: {
    chartFinalData: function() {
      return this.chartData;
    }
  },
  methods: {
    renderBarChart(){
      this.renderChart({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Customer ',
            backgroundColor: '#1faf4b',
            data: this.chartFinalData
            
          }
        ]
      },{
          scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'CUSTOMERS',
                    fontSize: 14,
                    fontColor: '#000',
                    padding: 10
                },
                ticks: {
                  beginAtZero: true
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'MONTHS',
                    fontSize: 14,
                    fontColor: '#000',
                    padding: 10
                }
            }]
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          }
      })
    }
  },
  watch: {
    chartData: function() {
        this.$data._chart.destroy();
        this.renderBarChart();
    }
  },
}
</script>

<style>
</style>
