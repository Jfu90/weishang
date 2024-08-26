<script setup>
import { Chart } from 'chart.js/auto'
import { onMounted } from 'vue'

onMounted(async () => {
  const pie = document.querySelector('#chart')
  new Chart(pie, {
    type: 'doughnut',
    data: {
      labels: [
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145',
        '192.168.3.145'
      ],
      datasets: [
        {
          data: [3, 5, 1, 8, 32, 2, 14, 8, 5, 2],
          hoverOffset: 5
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  })

  pie.classList.add('m-auto')
})
</script>

<template>
  <h1>測試</h1>
  <div class="p-2" style="width: 685px; height: 366px">
    <canvas id="chart"></canvas>
  </div>
</template>
