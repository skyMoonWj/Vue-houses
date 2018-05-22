import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Detail from '@/components/detail'
Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
	  {
	   	path:'/',
	   	redirect:'/list'
	  },
    {
      path: '/list',
      name: 'Main',
      component: Main,
      children:[
	      {path:':name',
	    	name:'Detail',
	    	component:Detail}
      ]
    }
  ]
})
