<template>
  <div class="app-container">
    <h1>子应用Sale的 form</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            type="fixed-time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <p>{{ form._text }}</p>
    <button @click="changeData">change</button>
    <p>{{ $data._name }}</p>
    <button @click="changeData1">change1</button>
    <button @click="addRoute">addRoute</button>
    <button @click="closeRoute">closeRoute</button>
    <button @click="closeCurrentRoute">closeCurrentRoute</button>
    <button @click="refreshView">refreshView</button>
    <button @click="refreshCurrentView">refreshCurrentView</button>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        _text: "abc",
      },
      _name: "cde",
    };
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
    changeData() {
      this.form._text += "b";
    },
    changeData1() {
      this.$data._name += "d";
    },
    addRoute() {
      // this.$mainApp.tabView.openView({
      //   appName: "vue-admin-house",
      //   path: '/submit/index'
      // });
      // this.$mainApp.tabView.openView({
      //   path: "/dashboard",
      // });
      this.$mainApp.tabView.openView({
        appName: "vue-admin-sale",
        path: "/example/table",
      });
    },
    closeRoute() {
      this.$mainApp.tabView.closeView({
        appName: "vue-admin-house",
        path: "/submit/index",
      });
    },
    closeCurrentRoute() {
      this.$mainApp.tabView.closeCurrentView();
    },
    refreshView() {
      this.$mainApp.tabView.refreshView({
        appName: "vue-admin-house",
        path: "/submit/index",
      });
    },
    refreshCurrentView() {
      this.$mainApp.tabView.refreshCurrentView();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

