<template>
		<div class="headUrl">
	    	<div class="btn-group text-center webService">
				<button  type="button" class="btn btn-default" :class="{'btn-warning':index==urlActive}" v-for="(item,index) in urlString" @click="getUrl(index)">
					{{item.name}}
				</button>
			</div>
			<form class="form-inline account" onsubmit="return false;">
			  <div class="form-group">
			    <label class="sr-only" for="exampleInputAmount"></label>
			    <div class="input-group">
			      <div class="input-group-addon">账号</div>
			      <input type="number" class="form-control" id="exampleInputAmount" placeholder="account" v-model="account">
			    </div>
			  </div>
			  <button type="submit" class="btn btn-success gain" @click="getJson()">获取</button>
			</form>
            <div class="clearit"></div>
		</div>
</template>

<script type="ecmascript-6">
    export default{
    	name:'url',
    	data(){
    		return{
    			accress:[
    				{name:'/skynet_sync/btsp'},
    				{name:'/skynet_sync/user'}
    			],
    			urlString:[
    				{name:'8885',url:'http://192.168.1.201:11002'},
                    {name:'8889',url:'http://192.168.1.201:11001'},
    				{name:'stage',url:'http://123.59.40.19:11001'}
    			],
    			urlActive:'',
    			account:localStorage.getItem("account")
    		}
    	},
    	mounted(){
    		localStorage.setItem("addUrl",'http://192.168.1.201:11002');
    	},
    	methods:{
    		getUrl(index){
                if(index!=this.urlActive){
                    var emptyData='';
                    this.$emit('bortJson','');
                    this.$emit('userJson','');

                }
    			this.urlActive=index;
    			localStorage.setItem("addUrl",this.urlString[index].url);
    		},
    		ajax(n){
                var acc=parseInt(this.account);
                if(acc){
                    this.$axios.post(localStorage.getItem("addUrl")+this.accress[n].name, {
                        "op":"info",
                        "uin":acc
                    })
                  .then(response=> {
                    if(response.data.ret=="-103"){
                        alert('没有找到数据！')
                    }else{
                        localStorage.setItem("account", acc);
                        if(n==0){
                        var newData=response.data.data;
                        for(var x in newData){
                                newData[x].checked=false;
                            }

                        localStorage.setItem("myBortJson", JSON.stringify(newData));
                        this.$emit('bortJson',newData);
                        }
                        if(n==1){
                            var newUserJson=response.data.data;
                            for (var i = 0; i < newUserJson.propInfo.length; i++) {

                                newUserJson.propInfo[i].num='';
                                newUserJson.propInfo[i].checked=false; 
                                
                            }
                            localStorage.setItem("myUserJson", JSON.stringify(newUserJson));
                            this.$emit('userJson',newUserJson);

                        }

                    }
                    
                  }).catch(function (error) {
                    
                  });
                }else{
                    alert('请输入账号');
                };
    			
    		},
    		getJson(){
                var pathname=this.$route.path;
                switch(pathname){
                    case '/user':
                        this.ajax(1);
                        break;
                    case '/warship':
                        this.ajax(0);
                        break;
                    default:
                    return false;
                }
                
            }
    	}
    }
</script>

<style rel="stylesheet" lang="scss">
	.headUrl{
		>.webService{
    		margin-bottom: 20px;
    		float: left;
	    }
	    >.account{
	    		float: left;
	    		margin-left: 15px;
	    	}
	    
	}
    
</style>