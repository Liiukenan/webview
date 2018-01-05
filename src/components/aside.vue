<template>
	<div class="aside">
		<ul class="aside-list">
			<li v-for="x in dataset">
					<a href="javascript:void(0)" class="title active">
					<i class="iconfont  icon-before" :class="x.icon"></i>
						{{x.title}}
					<i class="iconfont icon-jiantou icon-after"></i>
					</a>
					<ul class="listNum">
						<router-link tag="li" v-for="(item,index) in x.child" :to="item.link" :key="index" >
							<a href="javascript:void(0)" class="title-list">
									<i class="iconfont icon-jiantou icon-after"></i>
									{{item.title}}
							</a>
						</router-link>
					</ul>
			</li>
		</ul>
	</div>
</template>

<script type="ecmascript-6">
    export default{
    	name:'aside',
    	data(){
    		return{
    			dataset:[
	    			{
			        	title:'用户数据',
			        	icon:'icon-yonghu',
			        	child:[
			        		{title:'用户信息',link:'/user'},
			                {title:'战舰',link:'/warship'},
			                {title:'活动',link:'/activity'}
			                  ]
			        }
                ],
                isActive:false
    		}
    	}
    }
</script>

<style rel="stylesheet" lang="scss">
.aside{
	width: 200px;
	position: fixed;
	top: 52px;
	bottom: 0px;
	left: 0px;
	background: #eee;
	.aside-list{
			.title{
				transition: background 0.3s,color 0.3s;
				-webkit-transition: background 0.3s,color 0.3s;color: #767676; 
				display:block;padding:0 20px;
				height:48px;
				line-height:48px;
				font-size: 14px;
				background: #1BB7A0;color: #fff;
				.icon-after{
					float: right;
					font-size: 12px;
					transition: transform 0.5s;
					-webkit-transition: transform 0.5s;
					background: #1BB7A0;color: #fff;
					transform: rotate(90deg);
				}
				.icon-before{
					float: left;
					font-size: 16px;
					color: #767676;
					margin-right: 15px;
					background: #1BB7A0;color: #fff;
				}
			}	
			.listNum{
				li{
					
					height: 48px;
					line-height: 48px;
					.icon-after{
						float: left;
						margin-right: 15px;
						color: #767676;
						font-size:12px;

					}
					>a{
						display:block;
						width:100%;
						padding:0 20px;
						font-size:12px;
						color:#333;

					}
					&:hover{
						cursor:pointer;
						background: #e4e4e4;
					}
					&:hover{
						a,.icon-after{
							color:#1BB7A0;
						}
					}
					&.list-active{
						.icon-after,a{
							color: #1BB7A0;
						}
					}
					.listNum{
						a{
							display: block;
							width: 100%;
						}
						
					}
					.active{
						background: #1BB7A0;color: #fff;
						
					}
				}
			}
			
	}
}
</style>