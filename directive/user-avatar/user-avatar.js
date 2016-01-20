ttoApp.directive('userAvatar', function () {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
			if ($attrs.size !== undefined) {
			  size = $attrs.size;
			} else {
		  	size = 64;
			}
      ngModel.$render = function () {
        var avatarId = ngModel.$viewValue;
	    	var html = '<svg class="user-avatar" viewBox="0 0 128 128" height="' + size + '" width="' + size +
	    						 '" pointer-events="none" display="block">' + ttoAvatar(avatarId) + '</svg>';
	      $elem.html(html);
      };
    }
  };
  
}
);