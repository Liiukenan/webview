import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import user from '@components/user.vue';
import warship from '@components/warship.vue';
import activity from '@components/activity.vue';
export default new VueRouter({
	linkActiveClass:'list-active',
	routes:[
	{
		path:'/',
		redirect:'/user',
		component:user
	},
	{
		path:'/user',
		component:user
	},
	{
		path:'/warship', 
		component:warship
	},
	{
		path:'/activity', 
		component:activity
	}
	]
})