<template>
  <div id="app">
	  <keep-alive>
	    <router-view/>
	  </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
	margin: 0;
	padding: 0;	
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.van-nav-bar__text{
	color: white !important;
}
.van-nav-bar .van-icon-arrow{
	color: white;
}

.van-dialog__message{
	text-align: center !important;
}
</style>
