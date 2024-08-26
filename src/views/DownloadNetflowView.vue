<script setup>
import { Chart } from 'chart.js/auto'
import { onMounted, ref } from 'vue'

const datePushZero = (num) => String(num).padStart(2, '0')
const selectDatas = ref({
  container: 'all',
  catchTime: 15,
  sDate: '',
  sTime: '',
  eDate: '',
  eTime: '',
  sip: '',
  sp: '',
  dip: '',
  dp: '',
  rows: 10,
  double: 0,
  sort: 'Octets',
  ipParse: false
})
const resetData = () => {
  selectDatas.value = {
    container: 'all',
    catchTime: 15,
    sDate: '',
    sTime: '',
    eDate: '',
    eTime: '',
    sip: '',
    sp: '',
    dip: '',
    dp: '',
    rows: 10,
    double: 0,
    sort: 'Octets',
    ipParse: false
  }
}

const searchDatas = ref([
  { key: 'name', title: '報表 Report', content: '' },
  { key: 'sort', title: '排序', content: '' },
  { key: 'sTime', title: '開始時間', content: '' },
  { key: 'eTime', title: '結束時間', content: '' },
  { key: 'container', title: '分析容器', content: '' },
  { key: 'exp', title: '輸出設備', content: '' },
  { key: 'sip', title: '來源 IPs', content: '' },
  { key: 'dip', title: '目的 IPs', content: '' },
  { key: 'sp', title: '來源 Ports', content: '' },
  { key: 'dp', title: '目的 Ports', content: '' },
  { key: 'rows', title: '顯示行數', content: 0 },
  { key: 'size', title: '最小資料大小', content: 0 }
])
const resDatas = ref([])
const resRows = ref(0)
const chartColors = ref([
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba'
])
let getDatas, clearDatas, createChart

onMounted(() => {
  const Today = new Date()
  const dateControl = document.querySelectorAll('input[type="date"]')
  const pie = document.querySelector('#chart')
  const doughnut = new Chart(pie, {
    type: 'doughnut',
    data: { labels: [], datasets: [{ data: [], hoverOffset: 5 }] },
    options: { plugins: { legend: { display: false } }, layout: { padding: 20 } }
  })

  dateControl.forEach((e) => {
    e.setAttribute(
      'max',
      `${Today.getFullYear()}-${datePushZero(Today.getMonth() + 1)}-${datePushZero(Today.getDate())}`
    )
    e.setAttribute(
      'value',
      `${Today.getFullYear()}-${datePushZero(Today.getMonth() + 1)}-${datePushZero(Today.getDate())}`
    )
  })

  getDatas = () => {
    const chartData = ref({ labels: [], values: [], colors: [] })
    clearDatas()

    //接收DATA回傳值 to resDatas
    resDatas.value = [{ key: 'name', content: 'Destination IP' }]

    const tempData = searchDatas.value.reduce((arr, item) => {
      const setData = ref(false)
      //resDatas
      const resIdx = resDatas.value.findIndex((res) => res.key === item.key)
      if (resIdx >= 0) {
        arr.push(Object.assign({}, item, resDatas.value[resIdx]))
        setData.value = true
      }

      //selectDatas
      if (selectDatas.value?.[item.key] !== undefined) {
        const selContent = ref()

        switch (item.key) {
          case 'sTime':
            if (selectDatas.value.catchTime != 'costom') {
              const afterTime = new Date(Date.now() - selectDatas.value.catchTime * 1000 * 60)
              selContent.value = `${afterTime.getFullYear()}-${datePushZero(afterTime.getMonth() + 1)}-${datePushZero(afterTime.getDate())}  ${datePushZero(afterTime.getHours())}:${datePushZero(afterTime.getMinutes())}`
            } else selContent.value = `${selectDatas.value.sDate} ${selectDatas.value.sTime}`
            break
          case 'eTime':
            if (selectDatas.value.catchTime != 'costom') {
              const nowTime = new Date()
              selContent.value = `${nowTime.getFullYear()}-${datePushZero(nowTime.getMonth() + 1)}-${datePushZero(nowTime.getDate())}  ${datePushZero(nowTime.getHours())}:${datePushZero(nowTime.getMinutes())}`
            } else selContent.value = `${selectDatas.value.eDate} ${selectDatas.value.eTime}`
            break
          case 'rows':
            resRows.value = selectDatas.value.rows
            selContent.value = selectDatas.value[item.key]
            break
          default:
            selContent.value = selectDatas.value[item.key]
        }
        arr.push(Object.assign({}, item, { content: selContent.value }))
        setData.value = true
      }

      if (!setData.value) arr.push(item)

      return arr
    }, [])

    resDatas.value = tempData

    for (let i = 1; i <= selectDatas.value.rows; i++) {
      chartData.value.labels.push(i)
      chartData.value.values.push(i * Math.floor(Math.random() * 3) + 1)
      chartData.value.colors.push(chartColors.value[i % chartColors.value.length])
    }
    createChart(chartData.value)
  }

  clearDatas = () => {
    resDatas.value.length = 0
    resRows.value = 0

    doughnut.data.datasets.pop()
    doughnut.update()
  }

  createChart = (data) => {
    doughnut.data.labels = data.labels
    doughnut.data.datasets.push({ data: data.values, backgroundColor: data.colors })
    doughnut.update()
    pie.classList.add('m-auto')
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row" style="height: 630px">
      <div class="col-3 text-dark-700 bg-light p-0">
        <form class="px-3 pt-3 scrollbar border-bottom maxh-560">
          <div class="row mb-2">
            <label for="selectCon" class="col-4 col-form-label">選擇容器</label>
            <div class="col-8">
              <select id="selectCon" class="form-select" v-model="selectDatas.container">
                <option value="all">所有容器</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <label for="selectTime" class="col-4 col-form-label">過濾時段</label>
            <div class="col-8">
              <select id="selectTime" class="form-select" v-model="selectDatas.catchTime">
                <option value="15">過去15分鐘</option>
                <option value="30">過去30分鐘</option>
                <option value="60">過去1小時</option>
                <option value="180">過去3小時</option>
                <option value="720">過去12小時</option>
                <option value="1440">過去24小時</option>
                <option value="costom">自訂時段</option>
              </select>
            </div>
          </div>
          <div v-show="selectDatas.catchTime === 'costom'">
            <div class="row mb-2">
              <label for="startDate" class="col-4 col-form-label">開始日期</label>
              <div class="col-8">
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  v-model="selectDatas.sDate"
                />
              </div>
            </div>
            <div class="row mb-2">
              <label for="startTime" class="col-4 col-form-label">時間</label>
              <div class="col-8">
                <input
                  type="time"
                  class="form-control"
                  id="startTime"
                  v-model="selectDatas.sTime"
                />
              </div>
            </div>
            <div class="row mb-2">
              <label for="endDate" class="col-4 col-form-label">結束時間</label>
              <div class="col-8">
                <input type="date" class="form-control" id="endDate" v-model="selectDatas.eDate" />
              </div>
            </div>
            <div class="row mb-2">
              <label for="endTime" class="col-4 col-form-label">時間</label>
              <div class="col-8">
                <input type="time" class="form-control" id="endTime" v-model="selectDatas.eTime" />
              </div>
            </div>
          </div>
          <hr />
          <div class="row mb-2">
            <label for="setSIP" class="col-4 col-form-label">SIP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setSIP" v-model="selectDatas.sip" />
            </div>
          </div>
          <div class="row mb-2">
            <label for="setSP" class="col-4 col-form-label">SP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setSP" v-model="selectDatas.sp" />
            </div>
          </div>
          <div class="row mb-2">
            <label for="setDIP" class="col-4 col-form-label">DIP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setDIP" v-model="selectDatas.dip" />
            </div>
          </div>
          <div class="row mb-2">
            <label for="setDP" class="col-4 col-form-label">DP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setDP" v-model="selectDatas.dp" />
            </div>
          </div>
          <hr />
          <div class="row mb-2">
            <label for="showLists" class="col-2 col-form-label pe-0">筆數</label>
            <div class="col-4">
              <input
                type="text"
                class="form-control"
                id="showLists"
                v-model.number="selectDatas.rows"
              />
            </div>
            <label for="setNum" class="col-2 col-form-label pe-0">倍數</label>
            <div class="col-4">
              <input type="text" class="form-control" id="setNum" v-model="selectDatas.double" />
            </div>
          </div>
          <div class="row align-items-center mb-4">
            <label for="selectOrder" class="col-2 col-form-label pe-0">排序</label>
            <div class="col-6">
              <select id="selectOrder" class="form-select" v-model="selectDatas.sort">
                <option>Octets</option>
                <option>Flows</option>
                <option>Packets</option>
              </select>
            </div>

            <div class="col-4">
              <label for="checkbox01" class="form-check-label me-1">IP反解析</label>
              <input
                type="checkbox"
                class="form-check-input"
                id="checkbox01"
                v-model="selectDatas.ipParse"
              />
            </div>
          </div>
        </form>
        <div class="d-flex justify-content-end p-3">
          <button type="button" class="btn btn-secondary me-2" @click="getDatas">確認</button>
          <button type="button" class="btn btn-outline-dark-700" @click="resetData">清除</button>
        </div>
      </div>
      <div v-if="!resDatas.length" class="col-9 d-flex justify-content-center h-100">
        <div class="align-self-center text-center text-dark-700">
          <i class="icon-weishang-toolicon-box fs-1 mb-3"></i>
          <p class="fs-4">尚無資料</p>
        </div>
      </div>
      <div v-show="resDatas.length" class="col-9 py-3 d-flex flex-column h-100">
        <div class="px-2">
          <button type="button" class="btn text-light border-0 p-0 me-2">
            <i class="icon-weishang-toolicon-fileHTML fs-3"></i>
          </button>
          <button type="button" class="btn text-light border-0 p-0 me-4">
            <i class="icon-weishang-toolicon-filePDF fs-3"></i>
          </button>
          <h4 class="d-inline">inside_download 下載流量_報表</h4>
          <button
            type="button"
            class="btn-close btn-close-white float-end"
            aria-label="Close"
            @click="clearDatas"
          ></button>
        </div>
        <div class="row px-2">
          <div class="col-8 d-flex flex-column">
            <div class="flex-fill align-content-center">
              <div style="height: 360px">
                <canvas id="chart"></canvas>
              </div>
            </div>
            <div class="text-dark-700 bg-info py-2">
              <table width="100%">
                <tbody class="border-top border-dark-600" style="font-size: 14px">
                  <tr
                    class="border-bottom border-dark-600"
                    v-for="(resData, key) of resDatas"
                    :key="key"
                  >
                    <template v-if="!(key % 2)">
                      <td class="px-3 py-1" style="width: 150px">{{ resData.title }}</td>
                      <td class="px-3 py-1 border-start border-dark-600 bg-light">
                        {{ resData.content }}
                      </td>
                      <td class="px-3 py-1 border-start border-dark-600" style="width: 150px">
                        {{ resDatas[key + 1].title }}
                      </td>
                      <td class="px-3 py-1 border-start border-dark-600 bg-light">
                        {{ resDatas[key + 1].content }}
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-4">
            <div class="text-dark-700 bg-light text-center" style="height: 563px">
              <div
                class="d-flex talbe-head bg-info pt-3 pb-1 px-2"
                style="height: 40px; font-size: 0.8rem"
              >
                <div class="col-5 text-start ps-2">Dst Host</div>
                <div class="col-2">Flows</div>
                <div class="col-3">Octets</div>
                <div class="col-2">Packets</div>
              </div>
              <ul class="table-body scrollbar px-2 maxh-523">
                <li class="d-flex border-bottom py-2" v-for="(i, key) of resRows" :key="key">
                  <div class="col-5 text-start ps-2">{{ `192.168.${i}.136` }}</div>
                  <div class="col-2">156</div>
                  <div class="col-3">42.34 KB</div>
                  <div class="col-2">156</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
