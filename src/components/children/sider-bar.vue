<template>
	<div class="bar-over" >
		<div class="side-bar">
			<ul>
				<li v-for="bar in bars"><a :href="bar.links"><img :src="bar.imgs"/>{{bar.name}}</a></li>
			</ul>
		</div>
		<div class="overly">
			
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
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
						links:'http://xinpan.zzhz.zjol.com.cn/m/loupanlist/'
					}
				]
			}
		},
		props:['barshows']
	}
</script>

<style>
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
	.bar-show{
		transform: translateX(118px);
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
		background: #C4C4C4;
		opacity: 0.5;
		z-index: 98;
		display: none;
	}
</style>