<template>
	<div class="section">
		<v-url @bortJson="getBortJson"></v-url>
		<form class="form-horizontal user-info">
			<div class="par-15">
				<div class="border-gray">
					<legend>
                        全部战舰
                        <div class="pull-right" style="margin-right:15px;">
                            <form class="form-inline">
                                <div class="form-group">
                                    <button type="button" class="btn btn-sm btn-default keyCode" @click="modification">一键修改</button>
                                    <input type="text" v-model="modificationNum" class="form-control input-sm" placeholder="碎片数量">
                                </div>
                            </form>  
                        </div>
                    </legend>
					<div class="allBort table-responsive" v-if="bstp">
						<table class="table table-bordered text-center">
							<tbody>
								<tr>
                                    <th><input type="checkbox" name="" value="" @click="checkAll" v-model="checkedAll"></th>
									<th>名称</th>
									<th>等级</th>
									<th>现拥有碎片数量</th>
									<th>是否拥有战舰</th>
									<th>修改碎片数量</th>
									<th>编辑</th>
								</tr>
								<tr v-for="(item,index) in bstp" v-if="bstp">
                                    <td><input type="checkbox" name="" value="" v-model="item.checked"></td>
									<td>{{item.name}}</td>
									<td>{{item.level}}</td>
									<td>{{item.cardNumber}}</td>
									<td>{{item.isHave==0?'无':'有'}}</td>
									<td><input type="text" name=""  class="form-control"  min="0" step="" required="required" title="" v-model="item.cardNumber"></td>
									<td><button type="button" class="btn btn-success btn-sm" @click="amendCardNum(index)">修改</button></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</form>
	</div>
	
</template>

<script type="ecmascript-6" rel="stylesheet">
	import newUrl from '@components/url.vue';
    export default{
    	name:'warship',
    	data(){
    		return{
    			bstp:'',
    			cardNumber:'',
    			val:'',
                data:'',
                sumCard:[],
                modificationNum:'',
                checked:false,
                checkedAll:false
    		}
    	},
    	components:{
    		'v-url':newUrl
    	},
    	methods:{
            checkAll(){
                if (this.checkedAll) {
                    for(let x in this.bstp){
                        this.bstp[x].checked=false;
                    }
                }else{
                     for(let x in this.bstp){
                       this.bstp[x].checked=true;
                    }
                }
            },
            myJson(){
                var newJson=localStorage.getItem("myBortJson");
                if (newJson) {
                    this.bstp=JSON.parse(newJson);
                }
            },
            modification(){

                for(let x in this.bstp){
                    if(this.bstp[x].checked==true){
                        this.sumCard.push(this.bstp[x].protypeId);
                    }
                }

                if(this.sumCard.length==0){
                        alert('请先选择战舰然后修改');
                }else if(!this.modificationNum){
                        alert('请填写碎片数量');
                }else{
                var uin=parseInt(localStorage.getItem("account"));
                var modificationNum=parseInt(this.modificationNum);
                var sumCard=this.sumCard;
                this.$http.post(localStorage.getItem("addUrl")+'/skynet_sync/btsp', {
                            "op": "batch_update_card_num",
                            "uin": uin,
                            "shipProtypeIds": sumCard,
                            "cardNumber": modificationNum
                        })
                      .then(response=> {
                        for(let x of this.bstp){
                            if(x.checked==true){
                                x.cardNumber=modificationNum;
                            }
                        }
                        var newJson=JSON.stringify(this.bstp);
                        localStorage.setItem("myBortJson",newJson);
                        alert('修改成功');

                      }).catch(function (error) {
                        alert('网络错误');
                      });
                  }
                
            },
    		getBortJson(msg){
                var newMsg=[];
                for(var x in msg){
                    newMsg.push(msg[x])
                }
                newMsg.sort(function(a,b){
                    return b.isHave-a.isHave;
                })
    			this.bstp=newMsg;
    		},
    		amendCardNum(index){
    			var v=parseInt(this.bstp[index].cardNumber);
                var r = /(^[1-9]\d*$)/;
                var uin=parseInt(localStorage.getItem("account"));
                var index=parseInt(this.bstp[index].protypeId);
                if(r.test(v)==false){
                    alert('请输入正整数');
                }else{
        			this.$http.post(localStorage.getItem("addUrl")+'/skynet_sync/btsp', {
                            "op": "update_card_num",
    					    "uin": uin,
    					    "protypeId": index,            
    					    "cardNumber": v
                        })
                      .then(response=> {
                        alert('修改成功');
                        var newJson=JSON.stringify(this.bstp);
                        localStorage.setItem("myBortJson",newJson);
                      }).catch(function (error) {
                        alert('网络错误');
                      });
              }
    		}
    	},
        mounted(){
             this.myJson();
        }


    }
</script>

<style rel="stylesheet" lang="scss">

    .allBort{
    	th{
			text-align:center;
    	}
    	table tr td{
    		vertical-align:middle;
    	}
    	height:620px;
    	padding:0 15px;
    	overflow-y:auto;
    }
</style>