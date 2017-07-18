(function(angular){
   angular.module('todoApp.serv',[])
        .service('myService',['$window',function($window){
			var localStorage = $window.localStorage;
			var info = JSON.parse(localStorage.getItem('todo'))||[];
			var that = this;
			//getInfo
			that.getInfo=function(){
				return info;
			}
			//unfinished num
			that.items=function (){
				var num = 0;
				info.forEach(function(v,i){
					if(!v.statu)
					num++
				})
				return num
			}
			//saveInfo
			that.saveInfo=function(){
				localStorage.setItem('todo',JSON.stringify(info))
			}
			//addInfo
			that.addInfo=function(newinfo){
				if(newinfo.trim()===''){
					return
				}else {
					info.push({
						id:info[info.length-1]&&info[info.length-1].id+1||0,
						name:newinfo,
						statu:false
					})
				}
				that.saveInfo()
			}
			//deleteInfo
			that.del=function(id){
				info.splice(id,1)
				that.saveInfo()
			}
			//choose all or not
			that.allSelect=function(bool){
				if(bool){
					info.forEach(function(v){
						v.statu=false;
					});	
				}else{
					info.forEach(function(v){
						v.statu=true;
					});	
				}
			}
			//clear all 
			that.clearAll=function(){
				var num =0;
				clear()
				function clear(){
					for(var i=num;i<info.length;i++){
						if(info[i].statu){info.splice(i,1);num=i;clear();
							return;
						}
					}
				}
				that.saveInfo();
			}
			that.isShow=function(){
				return info.some(function(v){return v.statu === true;})
			}
		}])
}(angular))