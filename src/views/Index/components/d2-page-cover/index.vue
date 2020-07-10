<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__logo">
      <slot/>
    </div>
    <p class="d2-page-cover__title">D2 Admin {{$version}}</p>
    <p class="d2-page-cover__sub-title">优雅的中后台集成方案</p>
    <p class="d2-page-cover__build-time">FINAL BUILD TIME {{$buildTime}}</p>
    <slot name="footer"/>
    <a target="blank" href="https://github.com/d2-projects/d2-admin">
      <img
        style="position: absolute; top: 0; right: 0; border: 0; width: 150px;"
        src="./image/darkblue@2x.png"
        alt="Fork me on GitHub">
    </a>
  </div>
</template>

<style lang="scss" scoped>
	$color-text-main: #303133;
	$color-text-normal: #606266;
	$color-text-sub: #909399;
	$color-text-placehoder: #C0C4CC;
	$color-primary: #409EFF;
.d2-page-cover {
//   @extend %full;
user-select: none;
	  cursor: pointer;
//   @extend %unable-select;
 position: absolute;
		  top: 0px;
		  right: 0px;
		  bottom: 0px;
		  left: 0px;
			
			
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
</style>
