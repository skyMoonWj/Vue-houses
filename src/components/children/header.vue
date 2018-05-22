<template>
	<div>
		<van-nav-bar>
		 	<img class='logo' slot='left' src="../../assets/img/logo.png"/>
		 	<form action="/" slot='title'>
		 		<van-search 
			 		placeholder="请输楼盘名或拼音" 
			 		v-model="option.value" 
	  				@search="onSearch"
	  				@focus='onFocus'
	  				:options='option.optionsNum'
	  				@click-icon="onCancel"
	  				>
			 	</van-search>
		 	</form>
		 	<van-icon name='wap-nav' slot='right' @click='barShow' />
		</van-nav-bar>
		 	
		
		<!--//侧边栏-->
		<div class="bar-over" >
			<div class="side-bar" id="barshow" :class="{barshow:barStatus}">
				<ul>
					<li v-for="bar in bars"><a :href="bar.links"><img :src="bar.imgs"/>{{bar.name}}</a></li>
				</ul>
			</div>
		</div>
	 	<div class="overly" v-show="barStatus" @click="barStatus=!barStatus"></div>
	</div>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex'
	export default{
		data(){
			return{
				option:{
					value:'',
					optionsNum:0
				},
				barStatus:false,
				bars:[
					{
						name:'楼盘',
						imgs:'http://77fynr.com1.z0.glb.clouddn.com/xp/mobile/css/tt6/y1.png',
						links:'http://xinpan.zzhz.zjol.com.cn/m/loupanlist/'
					},
					{
						name:'新闻',
						imgs:'http://77fynr.com1.z0.glb.clouddn.com/xp/mobile/css/tt6/y2.png',
						links:'http://xinpan.zzhz.zjol.com.cn/m/loupanlist/'
					},
					{
						name:'咨询',
						imgs:'http://77fynr.com1.z0.glb.clouddn.com/xp/mobile/css/tt6/y5.png',
						links:'http://xinpan.zzhz.zjol.com.cn/m/loupanlist/'
					},
					{
						name:'论坛',
						imgs:'http://77fynr.com1.z0.glb.clouddn.com/xp/mobile/css/tt6/y6.png',
						links:'http://zzhzbbs.zjol.com.cn/forum-2-1.html'
					}
				]
			}
		},
		computed:{
			...mapGetters([
				'options',
				'houses'
			])
		},
		methods:{
			onSearch(){
				this.choseOptions(this.option)
				this.$http.get(`/house/loupanlottery?keywords=${encodeURIComponent(encodeURIComponent(this.options[0]))}&area=${this.options[1]}&typeId=${this.options[2]}&price=${this.options[3]}&statusFlag=${this.options[4]}`).then((data)=>{
					this.choseHouses(data.data)
				})
			},
			onCancel(){
				this.choseOptions(this.option)
			},
			onFocus(){
				
			}, 
			barShow(){
		    	this.barStatus = !this.barStatus
		    },
		    ...mapMutations([
				'choseOptions',
				'choseHouses'
			])
		}
	}
</script>

<style scoped>
	.van-icon-clear,
	.van-icon-search{
		color: black !important;
	}
	.van-nav-bar{
		background: #00BB00;
		color: #ffffff;
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	.van-nav-bar__title{
		max-width: 70%;
		vertical-align: middle;
	}
	.van-search{
		background: transparent !important;
	}
	.van-icon-wap-nav{
		color: #ffffff !important;
	}
	.van-search__action{
		margin-left: 5px;
	}
	.logo{
		width: 36px;
		height: 26px;
		vertical-align: middle;
	}
	.side-bar{
		position: fixed;
		left: 0;
		top: 0;
		width: auto;
		height: 100%;
		background: #282828;
		z-index: 99;
		padding: 30px 0;
		transform: translateX(-118px);
		transition: all 0.3s ease;
	}
	.barshow{
		transform: translateX(0px) !important;
	}
	.side-bar ul li a{
		color: white;
		font-size: 14px;
		display: flex;
		display: -webkit-flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		padding: 10px 20px;
	}
	.side-bar ul li a img{
		width: 40px;
		height: 32px;
		margin-right: 10px;
	}
	.overly{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #F8F8F8;
		opacity: 0.5;
		z-index: 98;
	}
</style>