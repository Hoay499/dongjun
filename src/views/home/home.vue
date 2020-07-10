<template>
	<div class="page-index">
		<el-container>
			<el-header>
				<div>
					<img src="../../public/image/logo/icon-only.png" alt="">
					<span>技术支持系统</span>
				</div>
				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
				 background-color="rgba(211,220,230)" text-color="#fff" active-text-color="#ffd04b">

					<el-menu-item index="1">处理中心</el-menu-item>
					<el-submenu index="2">
						<template slot="title">外部网站链接</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
						<el-menu-item index="2-3">选项3</el-menu-item>
						<el-submenu index="2-4">
							<template slot="title">东骏平台</template>
							<el-menu-item index="2-4-1">日志管理平台kibana</el-menu-item>
							<el-menu-item index="2-4-2">运营管理平台波塞冬</el-menu-item>
							<el-menu-item index="2-4-3">东骏公司网站</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-menu-item index="3" disabled>消息中心</el-menu-item>
					<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
				</el-menu>
				<el-button type="info" @click='logout'> 退出登录 </el-button>
			</el-header>
			<el-container>
				<el-aside :style="{width: asidewidth + 'px'}">

					<el-radio-group v-model="isCollapse" :style="{'margin-bottom': '20px','margin-left':isCollapse? '0px':'60px'}">
						<el-radio-button :label="false">展开</el-radio-button>
						<el-radio-button :label="true">收起</el-radio-button>
					</el-radio-group>
					<el-menu default-active="1-4-1" style="width: {asidewidth};" class="el-menu-vertical-demo" @open="handleOpen"
					 @close="handleClose" :collapse="isCollapse" :unique-opened="true" :router="true" 
					 :default-active="{activeindex}">
						<el-submenu index="1">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span slot="title">售后问题</span>
							</template>
							<el-menu-item-group>
								<span slot="title">问题记录</span>
								<el-menu-item index="addErrorRecord">记录问题</el-menu-item>
								<el-menu-item index="viewRecords" @click="indexactive('viewRecords')">查看问题记录</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group title="分组2">
								<el-menu-item index="1-3">问题分类</el-menu-item>
							</el-menu-item-group>
							<el-submenu index="1-4">
								<span slot="title">问题展示</span>
								<el-menu-item index="1-4-1">柱状图</el-menu-item>
								<el-menu-item index="1-4-2">折线图</el-menu-item>
								<!-- <el-menu-item index="1-4-3">柱状图</el-menu-item> -->
							</el-submenu>
						</el-submenu>
						<el-menu-item index="2">
							<i class="el-icon-menu"></i>
							<span slot="title">权限管理</span>
							<!--左侧根据获取到的权限列表展示，返回的权限列表参照接口文档， -->
						</el-menu-item>
						<el-menu-item index="3" disabled>
							<i class="el-icon-document"></i>
							<span slot="title">导航三</span>
						</el-menu-item>
						<el-menu-item index="4">
							<i class="el-icon-setting"></i>
							<span slot="title">导航四</span>
						</el-menu-item>
					</el-menu>

				</el-aside>
				<el-container>
					<el-main>
						<router-view></router-view>
					</el-main>
					<el-footer>Footer</el-footer>
				</el-container>
			</el-container>
		</el-container>
		<!-- safsdf -->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: true, //控制左侧菜单的收起与展开
				asidewidth: '60',
				activeIndex2: '1',
				//图标
				iconsObj: {
					125 : 'iconfont icon - user ' ,
					103 : 'iconfont icon - tijikongjian' ,
					101 : 'iconfont icon - shangpin ' ,
					102 : 'iconfont icon - danju ',
					145 : 'iconfont icon - baobiao'
				},
				activeindex:'welcome',

			}
		},
		watch: {
			isCollapse: 'asideOpen',
		},
		created() {
			// 获取左侧菜单列表
			// this.getAsideMenuList();
			// 获取头部菜单列表
			// this.getTopMenuList();
		},
		methods: {
			logout: function() {
				sessionStorage.clear();
				this.$router.replace('/login');
			},
			asideOpen: function() {
				 
					if (!this.isCollapse)
						this.asidewidth = '200';
					else
						this.asidewidth = '60';
				 
				
			},
			getAsideMenuList: async function() {
				const {
					data: res
				} = await this.$http.get(' menus ');
				if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
				this.menulist = res.data;
				console.log(res);

			},
			indexactive:function(index){
				this.activeindex = index;
			},
			handleOpen(key, keyPath) {
				console.log('242132r32');
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}


		}

	}
</script>

<style lang="scss">
	.page-index,
	.el-container {
		height: 100%;
		width: 100%;
	}

	//#ifdef 页面头部样式 
	.el-header,
	.el-footer {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-header {
		display: flex;
		/* 行元素排列 */
		justify-content: space-between;
		/* 垂直 */
		align-items: center;

		div {
			display: flex;
			flex-wrap: nowrap;
			height: 100%;
			color: white;
			font-size: 20px;

			img {
				height: 100%;
				width: 60px;
			}

			span {
				line-height: 60px;
				text-align: center;
			}
		}

	}

	// 页面头部样式 #endif
	//#endif

	.el-aside {
		background-color: rgba(55, 60, 65);
		color: #333;
		text-align: center;
		line-height: 200px;
		width: auto;
		min-width: 60px;
	}

	.el-radio-group {
		position: absolute;
		width: 120px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		max-width: 200px;
		min-height: 400px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
</style>
