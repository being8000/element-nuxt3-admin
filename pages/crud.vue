<template>
  <div class="scroll-y">
    <!--操作-->
    <div class="mr-3 py-3">
      <el-button type="primary" @click="addBtnClick">
        <el-icon style="vertical-align: middle">
          <FolderAdd />
        </el-icon>
        <span style="vertical-align: middle">Add</span>
      </el-button>
      <el-button type="danger" @click="multiDelBtnClick">
        <el-icon style="vertical-align: middle">
          <Delete />
        </el-icon>
        <span style="vertical-align: middle">Delete</span>
      </el-button>
      <!--条件搜索-->
      <el-form
        ref="refsearchForm"
        :inline="true"
        label-position="top"
        class="search-form my-3"
      >
        <el-form-item label="Brand Name" prop="username" label-position="left">
          <!--  --c -->
          <el-input v-model="searchForm.name" placeholder="Brand Name" />
        </el-form-item>
        <el-form-item
          label="Date & Time"
          prop="createTime"
          label-position="left"
        >
          <el-date-picker
            v-model="createTime"
            type="datetimerange"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD HH:mm:ss"
            class="widthPx-250"
            range-separator="-"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            @change="changeDate"
          />
        </el-form-item>
      </el-form>
      <!--查询按钮-->
      <el-button type="primary" @click="searchBtnClick">Search</el-button>
    </div>
    <!--表格和分页-->
    <EleTableSticker>
      <el-table
        id="resetElementDialog"
        ref="refuserTable"
        border
        :data="data?.records || []"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" prop="id" label="ID" width="80" />
        <el-table-column align="center" prop="brandName" label="Brand Name" />
        <el-table-column align="center" prop="logo" label="Logo" width="150">
          <template #default="{ row }">
            <img
              :src="row.logo"
              class="widthPx-120 heightPx-120"
              style="border-radius: 10px"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="firstName"
          label="First Name"
          width="200"
        />
        <el-table-column
          align="center"
          prop="createTime"
          label="Created Date & Time"
          width="200"
        />
        <el-table-column
          align="center"
          prop="updateTime"
          label="Updated Date & Time"
          width="200"
        />
        <!--点击操作-->
        <el-table-column
          fixed="right"
          align="center"
          label="Operation"
          width="250"
        >
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" type="primary" @click="edit(row)"
                >Edit</el-button
              >
              <el-button size="small" @click="detail(row)">Details</el-button>
              <el-button size="small" type="danger" @click="dedelte(row)"
                >Delete</el-button
              >
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </EleTableSticker>
    <!--分页-->
    <el-affix position="bottom" :offset="0" z-index="5">
      <el-card :body-style="{ padding: '8px' }">
        <el-pagination
          v-model:current-page="pages.pageNum"
          v-model:page-size="pages.pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100, 200]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data?.total || 0"
          @size-change="() => refresh"
          @current-change="() => refresh"
        />
      </el-card>
    </el-affix>
  </div>
</template>

<script setup lang="ts">
import { Delete, FolderAdd } from '@element-plus/icons-vue'
const pages = ref({
  pageNum: 1,
  pageSize: 20
})
const { refresh, pending, data, error } = useGet('GET_BRAND_LIST', pages.value)
interface TableRow {
  id: number
  brandName: string
  logo: string
  firstName: string
  createTime: string
  updateTime: string
}
/* 2.表格操作和查询 */
const multipleSelection = ref([])

const searchForm = reactive({
  id: '',
  name: '',
  image: '',
  letter: '',
  seq: ''
})

onMounted(() => {
  refresh()
})

const createTime = ref('')

const searchBtnClick = () => {
  pages.value.pageNum = 1
  refresh()
}

const edit = (row: TableRow) => {}
const changeDate = () => {}
const detail = (row: TableRow) => {}
const dedelte = (row: TableRow) => {}
</script>

<style scoped lang="scss">
/*详情*/
.detail-container {
  flex-wrap: wrap;
}

.detail-container-item {
  min-width: 40%;
  margin-bottom: 20px;
}

.detailDialog-title {
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 16px;
}
</style>

function useGet(arg0: string, value: { pageNum: number; pageSize: number }): {
refresh: any; pending: any; data: any; error: any } { throw new Error('Function
not implemented.') }
