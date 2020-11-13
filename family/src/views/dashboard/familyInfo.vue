<template>
  <el-main class="main">
    <el-table :data="tableData" style="width: 100%;" :height="770" border fit>
      <el-table-column
        v-for="(obj, index) in tableColumn"
        :key="index"
        :prop="obj.prop"
        :label="obj.label"
        align="center"
      >
        <template slot-scope="scope">
          <template v-if="index === 1">
            <img
              :src="scope.row[obj.prop]"
              style="width:40px;height:40px;border-radius:20px"
            />
          </template>
          <template v-else-if="index === 9">
            <el-button
              type="primary"
              @click="shortUser(scope.row['uniqueId'], scope.$index)"
              >主要按钮</el-button
            >
          </template>
          <template v-else>
            {{ scope.row[obj.prop] }}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-block">
      <el-pagination
        layout="prev, pager, next"
        :total="pageTotal"
        :page-size="15"
        @size-change="sizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </el-main>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      tableColumn: [
        {
          prop: "uniqueId",
          label: "编号"
        },
        {
          prop: "avatarUrl",
          label: "头像"
        },
        {
          prop: "phone",
          label: "手机"
        },
        {
          prop: "nickname",
          label: "昵称"
        },
        {
          prop: "gender",
          label: "性别"
        },
        {
          prop: "diamondTotal",
          label: "财富值"
        },
        {
          prop: "consumeTotal",
          label: "魅力值"
        },
        {
          prop: "createdTime",
          label: "注册时间"
        },
        {
          prop: "joinTime",
          label: "加入时间"
        },
        {
          prop: "operation",
          label: "操作"
        }
      ],
      pageTotal: 16
    };
  },
  created() {
    this.getFamiliesData(1);
  },
  methods: {
    getFamiliesData(pageNum) {
      this.$store
        .dispatch("user/getFamilyList", { page: pageNum, pageSize: 15 })
        .then(res => {
          var result = res.members.map(item => {
            return {
              ...item,
              createdTime: this.convertDate(item.createdTime),
              joinTime: this.convertDate(item.joinTime),
              gender: item.gender === 1 ? "女" : "男",
              avatarUrl: this.userUrl + item.avatarUrl
            };
          });
          console.log(result);
          this.pageTotal = res.count;
          this.tableData = result;
        })
        .catch(error => {
          console.log(error);
        });
    },
    convertDate(timeStamp) {
      let date = new Date(timeStamp * 1000);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return `${y}-${m}-${d}`;
    },
    sizeChange(pageNum) {},
    prevClick(pageNum) {
      this.getFamiliesData(pageNum);
      console.log("当前页面", pageNum);
    },
    nextClick(pageNum) {
      this.getFamiliesData(pageNum);
      console.log("当前页面", pageNum);
    },
    currentChange(pageNum) {
      this.getFamiliesData(pageNum);
      console.log("当前页面", pageNum);
    },
    shortUser(userId, index) {
      console.log(userId);
      this.$confirm("是否踢出该成员, 是否继续?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$store
            .dispatch("user/shotOffUser", { userId })
            .then(res => {
              this.$message({
                type: "success",
                message: "踢出成功!"
              });
              location.reload();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>
<style scoped>
.page-block {
  text-align: right;
  position: relative;
  bottom: 0;
}
.main {
  position: relative;
}
</style>
