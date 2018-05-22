<template>
	<div class="main" >
		<!--//搜索框-->
		<navheader></navheader>
		
		<!--//选择提示-->
		<navoption></navoption>
		
		<list></list>			
		
		<router-view></router-view>
	</div>
</template>

<script>
	import Header from '@/components/children/header'
	import Options from '@/components/children/option'
	import List from '@/components/children/list'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			'navheader':Header,
			'navoption':Options,
			'list':List
		}
	}
</script>

<style scoped>
	.main{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 11;
		background: #ffffff;
	}
</style>