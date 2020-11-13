<template>
  <el-main class="app">
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-card class="box-card">
          <div class="box-card-info">
            <div>
              $ 总营业额
            </div>
            <div>{{ deal[0] }}</div>
          </div>
          <div class="box-card-font">钻石</div>
        </el-card>
      </el-col>
      <el-col :span="12" :xs="24"
        ><el-card class="box-card">
          <div class="box-card-info">
            <div>$ 总收入</div>
            <div>{{ income[0] }}</div>
          </div>
          <div class="box-card-font">钻石</div>
        </el-card>
      </el-col>
      <div
        v-for="(typeObj, tindex) in [
          { type: '收入', data: income },
          { type: '流水', data: deal }
        ]"
        :key="tindex"
      >
        <el-col v-for="(obj, index) in names" :key="index" :span="6" :xs="24">
          <el-card class="box-card mini-card">
            <div class="mini-card-info">
              <div class="mini-card-font" style="text-align:center;">
                {{ obj }}{{ typeObj.type }}
              </div>
              <div style="text-align:center;">
                {{ typeObj.data[index] }}
              </div>
              <div class="mini-card-diamonds">
                钻石
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      names: ["今天", "昨天", "本周", "本月"],
      //总额
      deal: [0, 0, 0, 0, 0],
      //
      income: [0, 0, 0, 0, 0]
    };
  },
  created() {
    this.$store
      .dispatch("user/getList")
      .then(res => {
          this.deal = res.deal;
          this.income = res.income;
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  margin: 0 25px 25px;
  padding: 25px 0;
  font-size: 2rem;
  font-weight: bold;
}
.box-card-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.box-card-font {
  font-size: 0.9rem;
  text-align: right;
  font-weight: 400;
}
.mini-card-font {
  margin-bottom: 10px;
  font-size: 1.2rem;
}
.mini-card-diamonds {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 400;
}
</style>
