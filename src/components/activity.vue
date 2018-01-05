<template>
    <div class="section">
    	<v-url></v-url>
    	<form class="form-horizontal user-info">
			<div class="par-15">
				<div class="border-gray">
					<legend>突破重围</legend>
					<div class="table-responsive activity">
                        <table class="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>
                                        <label class="control-label" style="float:left;">关卡开始时间：</label>
                                        <form class="form-horizontal">
                                            <div class="form-group col-sm-4">
                                                <div class="year">
                                                  <input type="text" class="form-control col-sm-4" v-model="startTime[0].time" placeholder="年/月/日">
                                                </div>
                                            </div>
                                            <label class="col-sm-1 control-label" style="text-align:center">：</label>
                                            <div class="form-group col-sm-4">
                                                <div class="year">
                                                  <input type="text" class="form-control" placeholder="时:分:秒" v-model="startTime[1].time">
                                                </div>
                                            </div>
                                        </form>
                                    </td>
                                    <td>
                                         <label class="control-label" style="float:left;">关卡关闭时间：</label>
                                        <form class="form-horizontal">
                                            <div class="form-group col-sm-4">
                                                <div class="year">
                                                  <input type="text" class="form-control col-sm-4" v-model="endTime[0].time" placeholder="年/月/日">
                                                </div>
                                            </div>
                                            <div class="col-sm-1">
                                                <label class="control-label">:</label>
                                            </div>
                                            <div class="form-group col-sm-4">
                                                <div class="year">
                                                  <input type="text" class="form-control" v-model="endTime[1].time" placeholder="时:分:秒">
                                                </div>
                                            </div>
                                        </form>
                                    </td>
                                    <td>
                                        <form class="form-horizontal">
                                            <div class="form-group">
                                                 <button type="button" class="btn btn-success"  @click="newTime()">确认</button>
                                             </div>
                                         </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
						<table class="table table-bordered text-center">
							<tbody>
								<tr>
									<td v-for="item in resets" colspan="4">
										<form class="form-horizontal">
											<div class="form-group">
												<label  class="col-sm-3 control-label">{{item.title}}</label>
												<div class="col-sm-7">
													<select  class="form-control">
											     	 	<option v-for="x in item.select">{{x}}</option>
											   		</select >
												</div>
												<button type="button" class="col-sm-2  btn btn-success">确认</button>
											</div>
										</form>
									</td>
								</tr>
							</tbody>
						</table>
                        <table class="table table-bordered text-center">
                            <tbody>
                                <tr>
                                    <td>
                                        <form class="form-horizontal">
                                            <div class="form-group">
                                                <label class="col-sm-1 control-label">修改出口id</label>
                                                <div class="col-sm-5">
                                                    <select  class="form-control">
                                                        <option>出口1</option>
                                                    </select >
                                                </div>
                                                <label class="col-sm-1 control-label tc">为</label>
                                                <div class="col-sm-5">
                                                    <select  class="form-control">
                                                        <option>关卡id</option>
                                                    </select >
                                                </div>
                                            </div>
                                        </form>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-success">确认</button>
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
	import newUrl from './url.vue';	
    export default{
    	data(){
    		return{
    			startTime:[
    				{
    					time:'',
    				},
                    {
                        time:12345
                    }
                    
    			],
                endTime:[
                    {
                        time:12345,
                    },
                    {
                        time:12345
                    }
                    
                ],
    			resets:[
    				{
    					title:'重置关卡id',
    					select:[
    						65000,
    						65222,
    						65333
    					]
    				},
    				{
    					title:'重置',
    					select:[
    						'所有死亡战舰'
    					]

    				},
    				{
    					title:'刷新通关奖励',
    					select:[
    						123425,
    						12341,
    						23432
    					]

    				}

    			]
    		}
    	},
    	components:{
    		'v-url':newUrl
    	},
        mounted(){
            this.ajaxTime();
        },
        methods:{
            format(d){
                var date=new Date(d*1000);
                var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;
                var secounds = date.getSeconds();
                secounds = secounds < 10 ? ('0' + secounds) : secounds;
                return y + '/' + m + '/' + d+' '+h+':'+minute+':'+secounds;  
            },
            dateReg(reg,reg2){
                var dateReg = /^(\d{4})\/(\d{2})\/(\d{2})$/;
                var timeReg = /^(\d{2}):(\d{2}):(\d{2})$/;
                if(reg!='' && reg2!=''){
                    if (!dateReg.test(reg) || !timeReg.test(reg2)) {      
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    alert('请填写时间')
                }
            },
            newTime(){
                var startTime=parseInt(new Date(this.startTime[0].time+' '+this.startTime[1].time).getTime()/1000);
                var endTime=parseInt(new Date(this.endTime[0].time+' '+this.endTime[1].time).getTime()/1000);
                var nowTime=parseInt(new Date().getTime()/1000);
                if(this.dateReg(this.startTime[0].time,this.startTime[1].time) && this.dateReg(this.endTime[0].time,this.endTime[1].time)){
                    if(!(nowTime>endTime || startTime>endTime)){
                        this.$http.post(localStorage.getItem("addUrl")+'/skynet_sync/bkot', {
                                    "op":"mod_time",
                                    "startTime":startTime,
                                    "stopTime":endTime
                            })
                        .then(response=> {
                            if(response.data.data=="success"){
                                alert('修改成功')
                            }
                            }).catch(function (error) {
                            
                            });
                        }
                    else{
                        alert('关闭时间必须比开始时间和现在时间晚');
                        this.ajaxTime();
                    }
                    
                  }
                },
            ajaxTime(){
                this.$http.post(localStorage.getItem("addUrl")+'/skynet_sync/bkot', {
                        "op":"info"
                    })
                  .then(response=> {
                    var newTime=response.data.data.startTime;
                    var oldTime=response.data.data.stopTime;
                    this.startTime[0].time=this.format(newTime).split(' ')[0];
                    this.startTime[1].time=this.format(newTime).split(' ')[1];
                    this.endTime[0].time=this.format(oldTime).split(' ')[0];
                    this.endTime[1].time=this.format(oldTime).split(' ')[1];
                  }).catch(function (error) {
                    alert('网络错误！')
                  });
            }

        }
    }
</script>

<style rel="stylesheet" lang="scss">
    .activity{
    	padding:0 15px;
    	.form-horizontal{
    		.form-group{
    			margin:0;
                .tc{
                    text-align:center;
                }
    		}
            .year{
                padding:0;
                input{
                    text-align:center;
                }
            }
    	}
    }
</style>