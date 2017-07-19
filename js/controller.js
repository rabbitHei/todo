(function(angular){
   angular.module('todoApp.ctrl',[])
        .controller('todoController',['$scope','$window','myService',todoHandler])
		function todoHandler($scope,$window,myService){
			// render data
			var info = myService.getInfo();
			$scope.info=info;

			// add new data
			$scope.newInfo='';
			$scope.add = function(){
				myService.addInfo($scope.newInfo)
				$scope.allCheck=myService.statu()
				$scope.newInfo='';
			}

			// delete data
			$scope.delete=function(id){
				myService.del(id);
				$scope.allCheck=myService.statu();
			};

			//choose all or not
			$scope.allCheck=myService.statu()	
			$scope.allSelect=myService.allSelect

			//clear all completed
			$scope.clearAll=function(){
				myService.clearAll();
				$scope.allCheck=myService.statu()	
			}
			
			$scope.isShow=myService.isShow;

			//edit data
			$scope.editid=-9999;
			$scope.edit=function(id){
				$scope.editid=id;
				return false;
			}
			$scope.blur=function(){
				$scope.editid=-9999;
				myService.saveInfo()
			}
			$scope.editSave=function(){
				$scope.editid=-9999;
				myService.saveInfo()
			}

			// hash change
			hashChange();
			$window.addEventListener('hashchange',function(){
				$scope.$apply(function(){
					hashChange()
				})
			});
			function hashChange(){
				var hash = $window.location.hash
				switch(hash){
					case '#/':
					$scope.isCompelted=undefined;
					break;
					case '#/active':
					$scope.isCompelted=false;
					break;
					case '#/completed':
					$scope.isCompelted=true;
					break;
					default:
					$scope.isCompelted=undefined;
				}
			}

			//unfinished num
			$scope.num= function(){
				$scope.allCheck=myService.statu()	
				return	myService.items($scope.allCheck)
			}
		}
}(angular))