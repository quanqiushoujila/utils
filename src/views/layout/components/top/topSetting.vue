<template>
  <div class="setting">
    <i class="el-icon-more icon-more" @click="handleToggleSetting"></i>
    <div class="setting-container" v-show="settingStatus">
      <div class="background" @click="handleToggleSetting"></div>
      <div class="setting-content">
        <div class="setting-header">设置</div>
        <div class="setting-body">
          <el-form label-width="90px" v-if="formProps.length > 0">
            <el-form-item :label="item.label" v-for="item in formProps" :key="item.prop">
              <el-switch
                @change="((e) => { handleChange(item, e)})"
                v-model="form[item.prop]">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'TopSetting',
  data () {
    return {
      form: {
        isTopMenu: false,
        isShowBreakCrumb: false
      },
      settingStatus: false,
      formProps: [
        {
          prop: 'isTopMenu',
          commit: 'SET_IS_TOP_MENU',
          label: '菜单置顶'
        },
        {
          prop: 'isShowBreakCrumb',
          commit: 'SET_IS_SHOW_BREAK_CRUMB',
          label: '面包屑导航'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'isTopMenu',
      'isShowBreakCrumb'
    ])
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.form.isTopMenu = this.isTopMenu
      this.form.isShowBreakCrumb = this.isShowBreakCrumb
    },
    handleChange (data, status) {
      this.$store.commit(data.commit, status)
    },
    handleToggleSetting () {
      this.settingStatus = !this.settingStatus
    }
  }
}
</script>
<style scoped lang="scss">
  .setting {
    .icon-more {
      cursor: pointer;
      padding: 0 5px;
      font-size: 18px;
      color: #999;
      line-height: 50px;
      transform: rotate(90deg);
    }
    .setting-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .3);
      }
    }
    .setting-content {
      padding: 10px;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 180px;
      background-color: #fff;
      z-index: 10;
      .setting-header {
        margin-bottom: 10px;
      }
    }
  }
</style>
