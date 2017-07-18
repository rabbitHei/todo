(function(angular){
   angular.module('todoApp.ctrl',[])
        .controller('todoController',['$scope','$window','myService',todoHandler])
		function todoHandler($scope,$window,myService){
			// render data
			var info = myService.getInfo();
			$scope.info=info;
			//
			$scope.$watch('info',function(newinfo,oldinfo){
				$scope.num= myService.items()
			},true)
			
			// add new data
			$scope.newInfo='';
			$scope.add = function(){
				myService.addInfo($scope.newInfo)
				$scope.newInfo='';
			}

			// delete data
			$scope.delete=myService.del;

			//choose all or not
			$scope.allSelect=myService.allSelect

			//clear all completed
			$scope.clearAll=myService.clearAll;
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
			$scope.isCompelted=undefined;
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
		}
}(angular))