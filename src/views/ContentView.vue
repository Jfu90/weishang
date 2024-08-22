<script setup>
import { ref } from 'vue'

const selectTime = ref('')
</script>

<template>
  <div class="container-fluid">
    <div class="row" style="height: 630px">
      <div class="col-3 text-dark-700 bg-light h-100 overflow-auto">
        <form class="px-2 py-3">
          <div class="row mb-2">
            <label for="selectCon" class="col-4 col-form-label">選擇容器</label>
            <div class="col-8">
              <select id="selectCon" class="form-select">
                <option>所有容器</option>
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <label for="selectTime" class="col-4 col-form-label">過濾時段</label>
            <div class="col-8">
              <select id="selectTime" class="form-select" v-model="selectTime">
                <option>過去15分鐘</option>
                <option value="costom">自訂時段</option>
              </select>
            </div>
          </div>
          <template v-if="selectTime === 'costom'">
            <div class="row mb-2">
              <label for="startDate" class="col-4 col-form-label">開始日期</label>
              <div class="col-8">
                <input type="date" class="form-control" id="startDate" />
              </div>
            </div>
            <div class="row mb-2">
              <label for="startTime" class="col-4 col-form-label">時間</label>
              <div class="col-8">
                <input type="time" class="form-control" id="startTime" />
              </div>
            </div>
            <div class="row mb-2">
              <label for="endDate" class="col-4 col-form-label">結束時間</label>
              <div class="col-8">
                <input type="date" class="form-control" id="endDate" />
              </div>
            </div>
            <div class="row mb-2">
              <label for="endTime" class="col-4 col-form-label">時間</label>
              <div class="col-8">
                <input type="time" class="form-control" id="endTime" />
              </div>
            </div>
          </template>
          <hr />
          <div class="row mb-2">
            <label for="setSIP" class="col-4 col-form-label">SIP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setSIP" />
            </div>
          </div>
          <div class="row mb-2">
            <label for="setSP" class="col-4 col-form-label">SP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setSP" />
            </div>
          </div>
          <div class="row mb-2">
            <label for="setDIP" class="col-4 col-form-label">DIP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setDIP" />
            </div>
          </div>
          <div class="row mb-2">
            <label for="setDP" class="col-4 col-form-label">DP</label>
            <div class="col-8">
              <input type="text" class="form-control" id="setDP" />
            </div>
          </div>
          <hr />
          <div class="row mb-2">
            <label for="showLists" class="col-2 col-form-label pe-0">筆數</label>
            <div class="col-4">
              <input type="text" class="form-control" id="showLists" />
            </div>
            <label for="setNum" class="col-2 col-form-label pe-0">倍數</label>
            <div class="col-4">
              <input type="text" class="form-control" id="setNum" />
            </div>
          </div>
          <div class="row align-items-center mb-4">
            <label for="selectOrder" class="col-2 col-form-label pe-0">排序</label>
            <div class="col-6">
              <select id="selectOrder" class="form-select">
                <option>Octets</option>
              </select>
            </div>

            <div class="col-4">
              <label for="checkbox01" class="form-check-label me-1">IP反解析</label>
              <input type="checkbox" class="form-check-input" id="checkbox01" />
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-secondary me-2">確認</button>
            <button type="submit" class="btn btn-outline-dark-700">清除</button>
          </div>
        </form>
      </div>
      <div class="col-9 h-100 overflow-hidden">
        <div class="container-fluid">
          <div class="row py-3">
            <div class="col-12">
              <button type="button" class="btn text-light border-0 p-0 me-2">
                <span class="icon-weishang-toolicon-fileHTML fs-3"></span>
              </button>
              <button type="button" class="btn text-light border-0 p-0 me-4">
                <span class="icon-weishang-toolicon-filePDF fs-3"></span>
              </button>
              <h4 class="d-inline">inside_download 下載流量_報表</h4>
              <button
                type="button"
                class="btn-close btn-close-white float-end"
                aria-label="Close"
              ></button>
            </div>
            <div class="col-8">con data</div>
            <div class="col-4">info data</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
