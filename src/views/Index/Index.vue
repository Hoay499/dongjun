<template>
  <d2-container class="page">
    <d2-page-cover>
      <d2-icon-svg class="logo" name="d2-admin"/>
      <template slot="footer">
        <div class="btn-group">
          <span class="btn-group__btn" @click="$open('https://github.com/d2-projects')">开源组织</span> |
          <span class="btn-group__btn" @click="$open('https://d2.pub/zh/doc/d2-admin')">文档</span> |
          <span class="btn-group__btn" @click="$open('https://github.com/d2-projects/d2-admin-start-kit')">简化版</span> |
          <span class="btn-group__btn" @click="$open('https://juejin.im/user/57a48b632e958a006691b946/posts')">掘金</span> |
          <el-popover :width="150" trigger="hover">
            <img src="./image/qr.jpg" style="width: 150px;">
            <span slot="reference" class="btn-group__btn btn-group__btn--link">
              <d2-icon name="weixin"/>
              微信服务号
            </span>
          </el-popover>
        </div>
        <d2-badge/>
        <d2-help/>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import d2icon from  '@/components/d2-icon/index.vue'
import D2Badge from './components/d2-badge'
import D2Help from './components/d2-help'
import D2PageCover from './components/d2-page-cover'
export default {
  components: {
    D2Badge,
    D2Help,
    D2PageCover,
	  "d2-icon": d2icon,
  }
}
</script>

<style lang="scss" scoped>

// 	$color-text-normal: #606266;
// 	$color-text-sub: #909399;
// 	$color-text-placehoder: #C0C4CC;
// 	$color-primary: #409EFF;
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
		// $color-text-main: #303133;
    // color: $color-text-placehoder;
		  color:#C0C4CC;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
			
      // color: $color-text-sub;
			color:#909399;
      &:hover {
        // color: $color-text-main;
				color:#303133;
      }
      &.btn-group__btn--link {
        // color: $color-primary;
				color:#409EFF;
      }
    }
  }
}
</style>
