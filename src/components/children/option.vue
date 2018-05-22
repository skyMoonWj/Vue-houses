<template>
	<div >
		<ul class="nav">
			<li @click="showPick(item)" v-for="(item,index) in navs"><span>{{item.name}}</span><img src="../../assets/img/down.png"/></li>
		</ul>
		<van-popup v-model="show"  position="bottom">
			<van-picker
			  show-toolbar
			  :title="title"
			  :columns="columns.column"
			  :key="columns.key"
			  @cancel="onCancel"
			  @confirm="onConfirm"
			/>
		</van-popup>
	</div>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex'
	export default{
		data(){
			return{
				show:false,
				columns:{},
				title:'',
				navs:[
					{	
						name:'区域',
						status:false,
						columns:{
							key:1,
							column:['全部区域','下沙区','江干区','拱墅区','西湖区','滨江区','之江区','下城区','上城区','余杭区','萧山区','富阳区','临安区','郊县','其它'],
							code:['',99,48,43,41,40,100,44,45,39,89,103,189,107,88]
						}
					},
					{
						name:'类别',
						status:false,
						columns:{
							key:2,							
							column:['全部类别','普通住宅','公寓','花园洋房','酒店式公寓','商住','排屋','别墅','写字楼','商铺','综合','其它'],
							code:['',82,38,84,73,74,75,76,77,78]
						}
					},
					{
						name:'价格',
						status:false,
						columns:{
							key:3,
							column:['全部价格','1万以下','1-1.5万','1.5-2万','2-3万','3-4万','4万以上'],
							code:['','0to10000','10000to15000','15000to20000','20000to30000','30000to40000','40000']
						}
					},
					{
						name:'状态',
						status:false,
						columns:{
							key:4,
							column:['全部状态','正在公示','正在报名','报名结束','摇号结束'],
							code:['',1,2,3,4]
						}
					}
				],
				barStatus:false,
				option:{
					value:"",
					optionsNum:0
				}
			}
		},
		computed:{
			...mapGetters([
				'options',
				'houses'
			])
		},
		methods:{
			showPick(item){
		    	this.show = item.status = true
		    	this.columns = item.columns
		 		this.title = item.name
		    },
		   onConfirm(value, index) {
		       this.show = !this.show;
			   this.$toast(value)
		       if (this.columns.key ==1) {
		       		this.option.value = this.columns.code[index]
		       		this.option.optionsNum = 1
		       }else if(this.columns.key ==2){
		       		this.option.value = this.columns.code[index]
		       		this.option.optionsNum = 2
		       }else if(this.columns.key ==3){
		       		this.option.value = this.columns.code[index]
		       		this.option.optionsNum = 3
		       }else if(this.columns.key ==4){
		       	    this.option.value = this.columns.code[index]
		       		this.option.optionsNum = 4
		       }
		       this.navs[this.columns.key-1].name = value
		       this.choseOptions(this.option)
		       console.log(this.options)
		       this.$http.get(`/house/loupanlottery?keywords=${this.options[0]}&area=${this.options[1]}&typeId=${this.options[2]}&price=${this.options[3]}&statusFlag=${this.options[4]}`).then((data)=>{
					console.log(data)
					this.choseHouses(data.data)
				})
		       
		    },
			onCancel() {
		      this.show = !this.show;
		 	},
		 	...mapMutations([
				'choseOptions',
				'choseHouses'
			])
			
		}
		
	}
</script>

<style scoped>
	.nav{
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		justify-content: center;
		border-bottom: 1px solid #CDCDCD;
	}
	.nav li{
		width: 25%;
		padding: 10px 0;
		font-size: 14px;
	}
	.nav li img{
		width: 10px;
		height: 10px;
		margin-left: 5px;
	}
	.van-popup{
		position: fixed;
		width: 96%;
		height: 260px;
		z-index: 9;
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
		overflow: hidden;
	}
	.van-picker{
		background: transparent;
	}
</style>