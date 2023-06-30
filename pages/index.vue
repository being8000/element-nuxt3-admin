<template>
  <ClientOnly>
    <section>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card :body-style="{ padding: 0 }">
            <div class="statistic-card">
              <el-statistic :value="98500">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Daily active users
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one day"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
            </div>
            <apexchart
              :key="splineSeries1"
              height="100"
              width="100%"
              :options="splineOptions"
              :series="splineSeries1"
            ></apexchart>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: 0 }">
            <div class="statistic-card">
              <el-statistic :value="693700">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    Monthly Active Users
                    <el-tooltip
                      effect="dark"
                      content="Number of users who logged into the product in one month"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
            </div>
            <apexchart
              :key="splineSeries2"
              height="100"
              width="100%"
              :options="{ ...splineOptions, colors: ['#ff7043'] }"
              :series="splineSeries2"
            ></apexchart>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: 0 }">
            <div class="statistic-card">
              <el-statistic :value="72000" title="New transactions today">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    New transactions today
                  </div>
                </template>
              </el-statistic>
            </div>
            <apexchart
              :key="splineSeries3"
              height="100"
              width="100%"
              :options="{ ...splineOptions, colors: ['#66bb6a'] }"
              :series="splineSeries3"
            ></apexchart>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <apexchart
      :key="series"
      height="400"
      width="100%"
      :options="options"
      :series="series"
    ></apexchart>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-8 rounded"
      @click="updateChart"
    >
      Change
    </button>
  </ClientOnly>
</template>
<script setup lang="ts">
import { ApexOptions } from 'apexcharts'

const splineOptions = ref<ApexOptions>({
  chart: {
    toolbar: {
      show: false
    },

    height: 200,
    type: 'area'
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  yaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  xaxis: {
    labels: {
      show: false
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    // crosshairs: {
    //   show: false
    // },
    type: 'datetime',
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z'
    ]
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }
})
const splineSeries1 = ref([
  {
    name: 'series1',
    data: new Array(7).fill(null).map(() => Math.floor(Math.random() * 100))
  }
])
const splineSeries2 = ref([
  {
    name: 'series1',
    data: new Array(7).fill(null).map(() => Math.floor(Math.random() * 100))
  }
])
const splineSeries3 = ref([
  {
    name: 'series1',
    data: new Array(7).fill(null).map(() => Math.floor(Math.random() * 100))
  }
])
const options = ref({
  chart: {
    type: 'bar'
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      borderRadiusApplication: 'around'
    }
  }
})
const series = ref([
  {
    name: 'Score',
    data: []
  }
])
const updateChart = () => {
  //generate array of random numbers of length 10
  const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
  options.value = {
    ...options.value,
    xaxis: {
      categories: Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
      ) // array of last 10 years
    }
  }
  series.value = [
    {
      name: 'Score',
      data: data
    }
  ]
}
onMounted(() => {
  //generate array of random numbers of length 10
  updateChart()
})
</script>
<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px 20px 0px 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>