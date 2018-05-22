<template>
	<transition name="rightIn">
		<div class="house_detail">
			<van-nav-bar
			  left-text="返回"
			  fixed='fixed'
			  left-arrow
			  @click-left="onBack"
			  id='back'
			/>
			
			<div class="main-content">
				<van-swipe :autoplay="5000" ref="imgs">
				  <van-swipe-item v-for='(img,index) in house.image_url_large' :key='index' >
				  	<img v-lazy="swiperImg(img)" />
				  </van-swipe-item>
				  <span>{{house.name}}</span>
				</van-swipe>
				
				<div class="content">
					<div class="section">
						<p class="name"><span class="h_name">{{house.name}}</span>  <span class="tips" :class="klass(house.statusFlag)">{{statusinfo(house.statusFlag)}}</span></p>
						<p class="position"><b>报名地址：</b><span>{{house.pro_address}}</span></p>
						<p class="price"><b>预售均价：</b> <span class="b_red">{{house.price}}</span></p>
						<p class="type"><b>主力户型：</b><span>{{house.houseArea}}</span> </p>
						<p class="num"><b>房源套数：</b> <span>{{house.tao}}</span></p>
						<p class="people"><b>登记人数：</b><span>{{house.numberOfPeople}}</span></p>
						<p class="ratio"><b>无房户倾斜比例：</b> <span>{{house.noHouseRate}}</span></p>
						<p class="condition"><b>摇号门槛：</b> <span>{{house.threshold}}</span></p>
						<p class="time"><b>登记时间：</b> <span>{{house.bmDate}}</span></p>
						<p class="get-ratio" v-show="house.statusFlag==4"><b>中签率：</b><span>{{house.overallSuccessRate}}</span></p>
						<p class="start-time" v-show="house.statusFlag==4"><b>摇号时间：</b><span>{{house.yaohaoDate}}</span></p>
						<p class="phone"><b>售楼处电话：</b><span>{{house.telSales}}</span></p>
						<!--<p class="detail"><a target="_blank" :href="houseLinks(house.id)">查看楼盘详情</a></p>-->
					</div>
					<div class="section" v-show="house.statusFlag==4">
						<p><span class="round"></span>中签状态查询：</p>
						<van-cell-group>
						  <van-field
						    v-model="number"
						    label="登记编号"
						    icon="clear"
						    placeholder="请输入登记编号"
						    required
						    @click-icon="number = ''"
						  />
						
						  <van-field
						    v-model="tel"
						    label="手机号"
						    icon="clear"
						    placeholder="请输入手机号"
						    required
						    @click-icon="tel = ''"
						  />
						</van-cell-group>
						<van-button size="large" bottom-action @click="query">查询结果</van-button>
					</div>
					<div class="section">
						<div class="basic_detail">
							<p class="title"><span class="round"></span> 项目房源基本情况</p>
							<div class="introduce">
								<p v-html="house.info"></p>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				fixed:true,
				number:'',
				tel:''
				
			}
		},
		mounted(){
			this.onResize()
			this.check()
		},
		created(){
			
		},
		computed:{
			...mapGetters([
				'house'
			])
		},
		methods:{
			onBack(){
				this.$router.back(-1)
			},
			onResize(){
				var dw = document.body.clientWidth;
				this.$refs.imgs.$el.style['width'] = dw+'px'
				this.$refs.imgs.$el.style['height'] = dw*0.618+'px'
			},
			check(){
				if (!this.house.name) {
					this.$router.back(-1)
				}
			},
			houseLinks(links){
				return `http://xinpan.zzhz.zjol.com.cn/m/loupan/${links}.html`
			},
			 statusinfo:function(status){
				if(status==1){
					return "正在公示"
				}else if(status==2){
					return "正在报名"
				}else if(status==3){
					return "报名结束"
				}else if(status==4){
					return "摇号结束"
				}
			},
			klass:function(status){
				if(status==1){
					return "t1"
				}else if(status==2){
					return "t2"
				}else if(status==3||4){
					return "t3"
				}
			},
			otherOptions(status){
				
			},
			query(){
				var exp1 = /^1[3|4|5|8][0-9]\d{8}$/
				if (!exp1.test(this.tel)) {
					this.$toast('手机号错误！')
				}else{
					this.$http.get(
						`/house/zhongqian/?id=${this.house.id}&phone=${this.tel.trim()}&number=${this.number.trim()}`
					).then((data)=>{
						console.log(data.data)
						
						if (data.data.success == 1) {
							this.$dialog.alert({
								message:'恭喜中签'
							})
						} else if(data.data.success == 0){
							this.$dialog.alert({
								message:'很遗憾，您未中签！'
							})
						}
					}).catch((err)=>{
						console.log(err)
					})
				}
//				
			},
			swiperImg(img){
				return `http://10.100.202.162/newhouse${img}`
			}
		}
		
	}
</script>

<style scoped>
	.van-nav-bar__left{
		left: 30px;
	}
	.van-nav-bar__title{
		color: white;
	}
	.rightIn-enter-active {
	  transition: all .5s ease;
	}
	.rightIn-leave-active{
	  transition: all .3s ease;
	}
	.rightIn-enter,.rightIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  transform: translateX(100%);
	}
	
	.house_detail{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2999;
		background: #ffffff;
		overflow-y: scroll;
	}
	.van-nav-bar{
		background: transparent;
	}
	.van-nav-bar:after{
		border-bottom: none;
	}
	.van-swipe img{
		width: 100%;
		height: 100%;
	}
	.main-content{
		overflow-y: scroll;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.content{
		height: auto;
	}
	.section{
		width: 94%;
		padding: 5px 1%;
		text-align: left;
		margin: 10px 2%;
		border-radius: 8px;
		background: #F8F8FF;
	}
	.section p{
		font-size: 14px;
		margin: 8px 0;
	}
	.name{
		font-size: 16px !important;
		font-weight: bold;
		position: relative;
	}
	.position{
		padding-bottom: 8px;
		border-bottom: 1px solid grey;
		margin-bottom: 20px !important;
	}
	.b_red{
		font-size: 20px;
		color: red;
	}
	
	.tips{
		position: absolute;
		top: 1px;
		right: 0px;
		padding: 2px 10px;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		font-size: 12px;
		color: white;
		z-index: 2;
	}
	.t1{
		background: #20b2aa;
	}
	.t2{
		background: #00BB00;
	}
	.t3{
		background: #cd292e;
	}
	.detail{
		text-align: center;
		padding-top: 10px;
	}
	.detail a{
		background:#c9171d;
		padding: 3px 10px;
		border-radius: 5px;
		color: white;
	}
	.introduce p{
		text-align: justify;
		text-indent: 28px;
		line-height: 22px;
	}
	.round{
		display: inline-block;
		width: 10px ;
		height: 10px ;
		border-radius: 50%;
		margin-right: 5px;
		background: red;
		color: #ffffff;
	}
	
</style>