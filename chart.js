const ctx = document.getElementById('bar');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// new chart
// Chart Data Containers
const chartData1 = { hourly: [], daily: [], monthly: [] };
const chartData2 = { hourly: [], daily: [], monthly: [] };
const pieChartData = { IncomeCategory: [], QuantityCategory: [] };
const sizePieChartData = { revenueBySize: [], quantitySoldBySize: [] };

// Load Data from JSON Files
async function loadData() {
  try {
    const [response1, response2, response3, response4] = await Promise.all([
      fetch('json/Revenue.json'),
      fetch('json/Quantity.json'),
      fetch('json/TotalOrderQuan.json'),
      fetch('json/TotalOrderSize.json')
    ]);

    const [data1, data2, data3, data4] = await Promise.all([
      response1.json(),
      response2.json(),
      response3.json(),
      response4.json()
    ]);

    chartData1.hourly = data1.hourly;
    chartData1.daily = data1.daily;
    chartData1.monthly = data1.monthly;

    chartData2.hourly = data2.hourly;
    chartData2.daily = data2.daily;
    chartData2.monthly = data2.monthly;

    pieChartData.IncomeCategory = data3.IncomeCategory;
    pieChartData.QuantityCategory = data3.QuantityCategory;

    sizePieChartData.revenueBySize = data4.revenueBySize;
    sizePieChartData.quantitySoldBySize = data4.quantitySoldBySize;
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

let myChart1, myChart2, myPieChart, mySizePieChart;

// Initialize Charts
async function initializeCharts() {
  await loadData();

  const ctx1 = document.getElementById('chart1').getContext('2d');
  myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: chartData1.monthly.map(item => item.label),
      datasets: [{
        label: 'Revenue',
        data: chartData1.monthly.map(item => item.value),
        backgroundColor: [
            'rgba(255, 255, 0, 0.7)',  // Yellow
            'rgba(0, 0, 0, 0.7)'       // Black
          ],
        borderColor: 
            'rgba(0, 0, 0, 1)'
          ,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1000, easing: 'easeInOutQuad' }
    }
  });

  const ctx2 = document.getElementById('chart2').getContext('2d');
  myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: chartData2.monthly.map(item => item.label),
      datasets: [{
        label: 'Quantity Sold',
        data: chartData2.monthly.map(item => item.value),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1000, easing: 'easeInOutQuad' }
    }
  });

  const pieCtx = document.getElementById('pieChart').getContext('2d');
  myPieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: pieChartData.IncomeCategory.map(item => item.label),
      datasets: [{
        label: 'Orders',
        data: pieChartData.IncomeCategory.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1000, easing: 'easeInOutQuad' }
    }
  });

  const sizePieCtx = document.getElementById('sizePieChart').getContext('2d');
  mySizePieChart = new Chart(sizePieCtx, {
    type: 'pie',
    data: {
      labels: sizePieChartData.revenueBySize.map(item => item.label),
      datasets: [{
        label: 'Size Data',
        data: sizePieChartData.revenueBySize.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 1000, easing: 'easeInOutQuad' }
    }
  });
}

// Initialize Charts on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeCharts);
