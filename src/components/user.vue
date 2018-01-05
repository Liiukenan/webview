<template>
	<div class="section">
		<v-url @userJson="getUser"></v-url>
		<form class="form-horizontal user-info col-md-6">
			<div class="par-15">
				<div class="border-gray">
					<legend>
						编辑用户数据
						<button type="button" class="btn btn-sm btn-default keyCode" @click="modifyAll">一键修改</button>
					</legend>
					<div class="user-box" v-for="(item,index) in userInfoJson.userInfo">
						<div class="form-group"> 
						    <label  class="col-sm-2 control-label">{{userData[index].title}}</label>
						    <div class="col-sm-10">
						      <input type="text" class="form-control num" maxlength="128" :placeholder="item.srcType" v-model="item.srcNum">
						      <button type="button" class="btn btn-default get" @click='userInfo(index)'>修改</button>
						    </div>
						</div>
					</div>
					<div class="chapter" v-show="false">
						<div class="table-responsive">
							<table class="table table-bordered text-center">
								<tbody>
									<tr>
										<td>
											<form class="form-inline">
											  <div class="form-group">
											    <label>通关至</label>
											    <select name=""  class="form-control input-sm" required="required">
													<option value="">第一章</option>
												</select>
											    <label>章节</label>
											    <select name=""  class="form-control input-sm" required="required">
													<option value="">第一关</option>
												</select>
											    <label>关</label>
											  </div>
											</form>
										</td>
										<td>
											<button type="button" class="btn input-sm btn-sm btn-success">确定</button>
										</td>
										<td>
											<form class="form-inline">
											<div class="form-group">
											    <label>使</label>
											    <select name=""  class="form-control input-sm" required="required">
													<option value="">第一章</option>
												</select>
											    <label>章节刷出</label>
											    <select name=""  class="form-control input-sm" required="required">
													<option value="">第一关</option>
												</select>
											    <label>任务</label>
											  </div>
											</form>
										</td>
										<td>
											<button type="button" class="btn input-sm btn-sm btn-success">确定</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="table-responsive">
							<table class="table table-bordered text-center">
								<tbody>
									<tr>
										<td>
											<form class="form-inline">
											  <div class="form-group pve">
											    <label>pve产出</label>
											    <select name=""  class="form-control input-sm" required="required">
													<option value="">活动一</option>
												</select>
											    <label>的倒数时间改为</label>
											    <input type="number" name=""  class="form-control input-sm" value="" required="required" pattern="" title=""><label>时</label>
											    <input type="number" name=""  class="form-control input-sm" value="" required="required" pattern="" title=""><label>分</label>
											    <input type="number" name=""  class="form-control input-sm" value="" required="required" pattern="" title=""><label>秒</label>
											  </div>
											</form>
										</td>
										<td>
											<button type="button" class="btn btn-success btn-sm get">确定</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="table-responsive">
							<table class="table table-bordered text-center">
								<tbody>
									<tr>
										<td>
											<form class="form-inline fl">
											  <div class="form-group">
											    <label>重置状态：</label>
											    <select name=""  class="form-control input-sm state-input" required="required">
													<option value="">选择突出重围</option>
													<option value="">成就id</option>
													<option value="">主线任务id</option>
												</select>
											 	<button type="button" class="btn btn-sm btn-success get">确定</button>
											  </div>
											</form>
										</td>
										<td>
											<form class="form-inline fl">
											  <div class="form-group">
											    <label>联赛等级：</label>
											    <select name=""  class="form-control input-sm state-input" required="required">
													<option value="">黄金三</option>
												</select>
												<input type="number" name=""  class="form-control btn-sm" value="" required="required" pattern="" title="">星
											 	<button type="button" class="btn btn-sm btn-success get" style="margin-left:15px;">修改</button>
											  </div>
											</form>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="brisk">
								<form class="form-inline col-md-4 time">
									<label>日常活跃：</label>
									<input type="number" name=""  class="form-control btn-sm" value="" required="required" pattern="" title="" style="width:80px;">点
									<button type="button" class="btn btn-sm btn-success modifier">修改</button>	
								</form>		
								<form class="form-inline col-md-4 time" v-for="(item,index) in league">
									  <div class="form-group">
									    <label>{{item.name}}：</label>
									    <select name=""  class="form-control input-sm state-input" required="required">
											<option value="" v-for="x in item.leagueList">{{x}}</option>
										</select>
									 	<button type="button" class="btn btn-sm btn-success get" style="margin-left:15px;">重置</button>
									  </div>
								</form> 

							</div>
						</div>

					</div>
				</div>
			</div>
		</form>
		<form class="form-horizontal user-info col-md-6">
			<div class="par-15">
				<div class="border-gray">
					<legend>
						修改道具
						<div class="pull-right" style="margin-right:15px;">
                            <form class="form-inline">
                                <div class="form-group">
									<button type="button" class="btn btn-sm btn-default keyCode" @click="userALL">一键修改</button>
									<input type="text" v-model="propNumSum" class="form-control input-sm" placeholder="道具数量">
								</div>
							</form>
						</div>
					</legend>
					<div class="user-box user-prop table-responsive" >
						<table class="table table-bordered text-center" v-if="userInfoJson.propInfo">
							<tbody>
								<tr>
                                    <th><input type="checkbox" name="" value="" @click="checkAll" v-model="checkedAll"></th>
									<th>道具名称</th>
									<th>道具id</th>
									<th>道具数量</th>
									<th>输入数量</th>
									<th>编辑</th>
								</tr>
								<tr v-for="(item,index) in userInfoJson.propInfo">
                                    <td><input type="checkbox" name=""  v-model="item.checked"></td>
									<td>{{item.propName}}</td>
									<td>{{item.protypeId}}</td>
									<td>{{item.propNum}}</td>
									<td>
										<input type="text"  class="form-control input-sm" required="required" v-model="item.propNum">
									</td>
									<td>
										<button type="button" class="btn btn-sm btn-success" @click="stageNum(index)">修改</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</form>
	</div>
    
</template>
<script type="ecmascript-6">
import newUrl from '@components/url.vue';
    export default{
    	name:'user',
    	data(){
    		return{
    			userData:[
    				{
    					title:'用户昵称'
    				},
    				{
    					title:'等级'
    				},
    				{
    					title:'金币'
    				},
    				{
    					title:'矿石'
    				},
    				{
    					title:'木材'
    				},
    				{
    					title:'系统钻石'
    				},
    				{
    					title:'内购钻石'
    				},
    				{
    					title:'石头'
    				},
    				{
    					title:'钢铁'
    				}
    				
    			],
    			userList:[],
    			stage:[
    				{title1:'碎片包',title2:'选择品质',num:1}
    			],
    			userInfoJson:'',
    			league:[
    				{name:'活跃任务id',leagueList:[1,2,3]},
    				{name:'主线任务id',leagueList:[1,2,4]},
    				{name:'成就任务id',leagueList:[1,2,5]}
    			],
    			checked:false,
                checkedAll:false,
                sumCard:[],
                propNumSum:''
    			
    		}
    	},
    	methods:{
    		userALL(){
    			var account=parseInt(localStorage.getItem("account"));
    			var sumCard=this.sumCard;
    			var propNumSum=parseInt(this.propNumSum);
    			for(let x of this.userInfoJson.propInfo){
                       if(x.checked==true){
                            sumCard.push(x.protypeId);
                        }
                }
                if(!propNumSum){
                	alert('请输入道具数量');
                }else if(sumCard.length==0){
                	alert('请选择道具');
                }else{
                	this.$http.post(localStorage.getItem("addUrl")+'/skynet_sync/prop', {
                        "op":"batch_update_prop",
                        "uin":account,
                        "propProtypeIds":sumCard,
						"propNum":propNumSum
                    })
                  .then(response=>{
                  	for(let x of this.userInfoJson.propInfo){
                        if(x.checked==true){
                            x.propNum=propNumSum;
                        }
                    }
                  	alert('提交成功');
                  	var newJson=JSON.stringify(this.userInfoJson);
                  	localStorage.setItem("myUserJson",newJson);
                  }).catch(function (error) {
                    alert('网络错误');
                  });
              }
                

    		},
    		checkAll(){
				if (this.checkedAll) {
 					for(let x of this.userInfoJson.propInfo){
                       x.checked=false;
                    }
                }else{
                	
                   for(let x of this.userInfoJson.propInfo){
                       x.checked=true;
                    }
                }

    		},
    		modifyAll(){
    			var account=parseInt(localStorage.getItem("account"));
    			var addressUrl=localStorage.getItem("addUrl");
    			var userInfo=this.userInfoJson.userInfo;
				for (var i = 0; i < userInfo.length; i++) {
					var srcValue=this.regNum(i);
					if(srcValue || srcValue===0){
						this.userList.push({srcType:userInfo[i].srcType,srcValue:srcValue});
					}else{
						alert('请输入正整数');
						return false;
					}
    			}
    			var userList=this.userList;
    			this.newAjax(addressUrl,account,userList);
    		},
    		regNum(index){
    			var srcValue='';
    			var r = /^([1-9]\d*|[0]{1,1})$/;
    			srcValue=this.userInfoJson.userInfo[index].srcNum;
    			if(index==0){
	    				return srcValue;
	    			}else{
	    				if(r.test(srcValue)){
							srcValue=parseInt(this.userInfoJson.userInfo[index].srcNum);
							return srcValue;
	    				}else{
	    					return false;
	    				}
						
	    			}
    		},
    		infoAjax(index){
    			this.userList=[];
    			var account=parseInt(localStorage.getItem("account"));
    			var addressUrl=localStorage.getItem("addUrl");
    			var srcType=this.userInfoJson.userInfo[index].srcType;
    			var srcValue=this.regNum(index);
				this.userList.push({srcType:srcType,srcValue:srcValue});
    			if (srcValue || srcValue===0){
    				var userList=this.userList;
    				this.newAjax(addressUrl,account,userList);
    			}else{
    				this.userInfoJson.userInfo[index].srcNum='';
    				alert('请输入正整数');
    				return false;
    			}
    			

    			
    		},
    		newAjax(addressUrl,account,userList){
    			this.$http.post(addressUrl+'/skynet_sync/urif', {
                        "op":"update_user_info",
                        "uin":account,
                        "updateList":userList
	                    })
	                  .then(response=>{
	                  	var newJson=JSON.stringify(this.userInfoJson);
                  		localStorage.setItem("myUserJson",newJson);
	                  	alert('提交成功');
	                  }).catch(function (error) {
	                    
	                  });
    		},
    		userInfo(index){
    			this.infoAjax(index);
    		},
    		stageNum(index){
    			var account=parseInt(localStorage.getItem("account"));
    			var num=this.userInfoJson.propInfo[index].propNum;
    			var proId=parseInt(this.userInfoJson.propInfo[index].protypeId);
    			var r = /(^[1-9]\d*$)/;
    			if(r.test(num)==false){
    				this.userInfoJson.propInfo[index].propNum='';
	                alert('请输入正整数');
    			}else{

    				this.$http.post(localStorage.getItem("addUrl")+'/skynet_sync/prop', {
                        "op":"update_prop",
                        "uin":account,
                        "propNum":parseInt(num),
						"protypeId":proId
                    })
                  .then(response=>{
                  	this.userInfoJson.propInfo[index].propNum=num;
                  	var newJson=JSON.stringify(this.userInfoJson);
                  	localStorage.setItem("myUserJson",newJson);
                  	alert('提交成功');


                  }).catch(function (error) {
                    alert('网络错误');
                  });
    			}
    		},
    		getUser(msg){
    			this.userInfoJson=msg;
    		},
    		myJson(){
    			var newJson=localStorage.getItem("myUserJson");
	    		if (newJson) {
	    			this.userInfoJson=JSON.parse(newJson);
	    		}
    		}
    	},
    	mounted(){
    		this.myJson();
    	},
    	components:{
    		'v-url':newUrl
    	}


    }
</script>
<style rel="stylesheet" lang="scss">
    .section{
    	.user-info{
    		padding:0;margin-bottom: 15px;
    		.btn-group{
    			margin-left: 15px;
    		}
	    	.par-15{
	    		padding-right: 15px;
	    	}
	    	.num{
	    		width: 85%;
	    		float: left;
	    	}
	    	.get{
	    		float: right;
	    	}
	    	.user-box{
	    		padding:0 8px;
	    		
	    		tbody{
	    			th{
		    			text-align: center;
		    			vertical-align: middle;
	    			}
	    			tr{
	    				td{
	    					vertical-align:middle;
	    				}
	    			}
	    		}
	    		&.user-prop{
	    			max-height:592px;
	    			overflow-y:auto;
	    			overflow-x:hidden;
	    		}
	    	}
	    	.table-list{
	    		margin:0;
	    	}

    	}
    	.chapter{
    		padding:0 40px 20px;
    		>form{
    			margin-bottom:15px;
    		}
    		.state-input{
    			margin:0 15px;
    		}
    		.pve{
    			input{
    				width:110px;
    				margin:0 5px;
    			}
    		}
    		.brisk{
    			.time{
    				padding:0;
    				height:55px;
    			

    				.form-group{
    					margin:0;
    				}

    			}
    			.modifier{
    				margin-left:10px;
    			}
    		}

    	}

    	
    }

</style>