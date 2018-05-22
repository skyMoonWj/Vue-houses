<template>
	<div class="list">
		<van-list
		  v-model="loading"
		  :finished="finished"
		  @load="onLoad"
		  :offset='bottom'
		  :loading-text="loadingText"
		>
		 	<li v-for="(house,index) in houses" :key='index' @click="showDetail(house,index)">
		 		<div class="imgs">
			 		<img v-lazy="imgShow(house.image_url)" />
		 		</div>
		 			
		 		<div class="house_info">
					<p class="name">{{house.name}}</p>
					<p class="position">地址：<span>{{house.pro_address}}</span></p>
					<p class="type">户型：<span>{{house.houseArea}}</span></p>
					<p class="price">价格：<b>{{house.price}}</b></p>
					<p class="status">
						<span v-if="house.statusFlag==1"></span>
						<small v-else-if="house.statusFlag==2">报名时间：<span>{{house.bmDate}}</span></small>
						<button v-else-if="house.statusFlag == 4">中签名单</button>
					</p>
				</div>
				<span class="tips"  :status='house.statusFlag' :class="klass(house.statusFlag)">{{statusinfo(house.statusFlag)}}</span>
		 	</li>
		</van-list>
	</div>
	
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex'
	export default{
		data(){
			return{
				originData:[],
				loading: true,
      			finished: false,
      			house:{},
      			bottom:10,
      			loadingText:'加载中…',
      			index : 0
			}
		},
		computed:{
			...mapGetters([
				'houses'
			])
		},
		mounted(){
			this.getHouseList()
		},
		methods:{
			...mapMutations([
				'choseHouse',
				'choseHouses'
			]),
			getHouseList(){
				this.$http.get('/house/loupanlottery').then((data)=>{
		    		console.log(data)
		    		this.choseHouses(data.data)
		    		this.loading = !this.loading
		    		this.index ++
		    	}).catch((err)=>{
		    		console.log(err)
		    	})
		    	
			},
		    onLoad() {
		    	this.$http.get(`/house/loupanlottery?currpage=${this.index}`).then((data)=>{
		    		console.log(data.data)  
		    		this.index++
		    		if(data.data==''){
		    			this.loading = false
		    			this.finished = true
		    			this.$toast('已经到底啦！')
		    		}else{
		    			data.data.map((item)=>{
			    			this.houses.push(item)
			    		})
			    		this.loading = false
		    		}		    		
		    	}).catch((err)=>{
		    		console.log(err)
		    	})

		    },
		    showDetail(house,index){
		    	this.$router.push({
		    		path:`/list/${house.name}`
		    	})
		    	this.choseHouse(house)
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
			imgFirst(arr){
				return arr[0]
			},
			imgShow(img){
				return `http://10.100.202.162/newhouse${img}`
			}
		}
	}
</script>

<style scoped>
	.list{
		position: absolute;
		top: 86px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow-y: scroll;
	}
	.van-list{
		
	}
	.van-list li{
		list-style-type: none;
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		padding: 5px;
		border-bottom: 1px solid #E8E8E8;
		position: relative;
	}
	.imgs,
	.imgs img{
		width: 140px ;
		height: 96px ;
	}
	
	.house_info{
		max-width: 60%;
		text-align: left;
		margin-left: 15px;
	}
	.house_info p{
		font-size: 14px;
	}
	.name{
		font-size: 18px !important;
	}
	.price b{
		font-size: 14px;
		color:red;
	}
	.position{
		line-height: 19px;
	}
	.status button{
		outline: none;
		border-radius: 5px;
	    background: #ec2f34;
	    padding: 2px 8px;
	    color: white;
	    border: none;
	}
	.status small{
		color: red;
	}
	.tips{
		position: absolute;
		top: 7px;
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
	.detail-show{
		transform: translateX(-100%);
	}
	.scroll{
		height: 100%;
		overflow: hidden;
	}
</style>