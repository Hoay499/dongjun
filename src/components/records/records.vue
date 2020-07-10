<template>
	<div>
		<!-- 面包屑导航区域-->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		问题时间 提出者 所属公司 设备类型 详细内容(模板版本(模板历史版本以及升级记录)，主板版本(谁的主板),) 问题类型， 问题原因， 问题描述， 状态(未解决，已解决，解决中(进度))， 问题解决方法(过程)， 销售负责人，
		问题负责人
		<el-row :gutter="20">
			<el-col :span="8">
				<el-input placeholder="请输入内容" v-model="input" clearable @clear="getErrorRecordsList">
					<el-button slot="append" icon="el-icon-search" @click="getErrorRecordsList"></el-button>
				</el-input>

			</el-col>
			<el-col :span="4">
				<el-button type="primary" @click="recordAddDialog = true">添加新记录</el-button>
			</el-col>
		</el-row>

		<el-card>
			<el-button @click="resetDateFilter">清除日期过滤器</el-button>
			<el-button @click="clearFilter">清除所有过滤器</el-button>
			<el-table ref="filterTable" :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'descending'}"
			 border>

				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<!-- inline -->
							<el-form-item label="商品名称">
								<span>{{ props.row.name }}</span>
							</el-form-item>
							<el-form-item label="所属店铺">
								<span>{{ props.row.shop }}</span>
							</el-form-item>
							<el-form-item label="商品 ID">
								<span>{{ props.row.id }}</span>
							</el-form-item>
							<el-form-item label="店铺 ID">
								<span>{{ props.row.shopId }}</span>
							</el-form-item>
							<el-form-item label="商品分类">
								<span>{{ props.row.category }}</span>
							</el-form-item>
							<el-form-item label="店铺地址">
								<span>{{ props.row.address }}</span>
							</el-form-item>
							<el-form-item label="商品描述">
								<span>{{ props.row.desc }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>

				<el-table-column label="#" type="index">
				</el-table-column>

				<el-table-column prop="date" label="日期" width="180" column-key="date" :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
				 :filter-method="filterHandler" sortable>
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="180" sortable>
				</el-table-column>
				<!--formatter  可以对值进行格式化  -->
				<el-table-column prop="address" label="地址" :formatter="formatter">
				</el-table-column>
				<!-- 这里 状态的 prop可以删除： 使用了作用域插槽 -->
				<el-table-column label="状态" prop="mg_state">
					<!-- <template slot-scope="scope">I
						{{scope.row}}
					</template> -->
					<template v-slot="scope">
						<!-- {{scope.row}}  获取该行内的值-->
						<el-switch v-model="scope.row.mg_state" @change="stateChange(scope.row)">
						</el-switch>

					</template>

				</el-table-column>

				<el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
				 :filter-method="filterTag" filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<el-tooltip class="item" effect="dark" content="修改记录" placement="top-end" :enterable="false">
						<el-button type="primary" icon="el-icon-edit">修改</el-button>
					</el-tooltip>

					<el-button type="danger" icon="el-icon-delete">删除</el-button>
				</el-table-column>

			</el-table>

			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"
			 background>
			</el-pagination>
		</el-card>
		<el-dialog
  title="添加问题记录"
  :visible.sync="recordAddDialog"
  width="50%"
  :before-close="handleClose">
  
 <el-form ref="recordAddForm" :rules="recordAddRules" :model="recordAddForm" label-width="80px">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="recordAddForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="recordAddForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="recordAddForm.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="recordAddForm.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送">
    <el-switch v-model="recordAddForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质">
    <el-checkbox-group v-model="recordAddForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源">
<<<<<<< HEAD
    <el-radio-groupgit  v-model="recordAddForm.resource">
=======
    <el-radio-group v-model="recordAddForm.resource">
>>>>>>> errorRecords
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="recordAddForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="recordAddDialog = false">取 消</el-button>
    <el-button type="primary" @click="recordAddDialog = false">保 存</el-button>
  </span>
</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//获取用户列表的参数对象
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 2
				},
				recordAddDialog:false,
				recordAddForm:{
					 name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
				},
				recordAddRules:{
					 name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
				},
				input:'',
				userlist: [],
				total: '',
				currentPage: 4,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					tag: '家',
					id: '12987122',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
					mg_state: true
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					tag: '公司',
					id: '12987123',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
					mg_state: false
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					tag: '家',
					id: '12987124',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
					mg_state: true
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					tag: '公司',
					id: '12987125',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
					mg_state: false
				}]
			}
		},
		created() {
			// 获取错误记录列表
			// this.getErrorRecordsList();
		},
		methods: {
			getErrorRecordsList: async function() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: this.queryInfo
				})
				if (res.meta.status != 200) {
					return this.$message.error('获取用户列表失败! ')
				}
				this.userlist = res.data.users;
				this.total = res.data.total;

				console.log(res);

			},
			stateChange: function(info) {
				console.log(userinfo);
// 				const {
// 					data: res
// 				} = await this.$http.put(`users/
// 				${userinfo.id}/state/$ {userinfo.mg_state}`)
// 
// 				if (res.meta.status != 200) {
// 					userinfo.mg_state = !userinfo.mg_state;
// 					return this.$message.error('更新用户状态失败!');
// 				}

			},
			tableRowClassName({
				row,
				rowIndex
			}) {

				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
			},
			formatter(row, column) {
				return row.address;
			},
			resetDateFilter() {
				this.$refs.filterTable.clearFilter('date');
			},
			clearFilter() {
				this.$refs.filterTable.clearFilter();
			},
			filterTag(value, row) {
				return row.tag === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				// this.getErrorRecordsList();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				// this.getErrorRecordsList();
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }



		}


	}
</script>

<style lang="scss" scoped>
	.el-breadcrumb {
		margin-bottom: 20px;
		font-size: 12px;
	}

	.el-card {
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
	}

	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}


	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		// margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}

	.el-form-item {}
</style>
