ttoApp.config(function($mdThemingProvider, $routeProvider, RestangularProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
//    .primaryPalette('indigo')
//    .primaryPalette('blue')
//    .primaryPalette('blue-grey')
    .accentPalette('red')
		.warnPalette('deep-orange') ;
//		.backgroundPalette('grey');

  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');
        
 	$routeProvider
    .when('/', {
      templateUrl: 'controller/home/home.html',
      controller: 'homeCtrl'
    })
    .when('/register', {
      templateUrl: 'page/register/register.html',
    })
    .when('/profile', {
      templateUrl: 'page/profile/profile.html',
    })
    .when('/coin', {
      templateUrl: 'page/coin/coin.html',
      controller: 'coinCtrl'
    })
    .when('/category', {
      templateUrl: 'page/category/category.html',
      controller: 'categoryCtrl'
    })
    .when('/user-category', {
      templateUrl: 'page/user-category/user-category.html',
      controller: 'userCategoryCtrl'
    })
    .when('/user-category/user/:userId', {
      templateUrl: 'page/user-category/user-category.html',
      controller: 'userCategoryCtrl'
    })
    .when('/user-category/:categoryId/course', {
      templateUrl: 'page/user-course/user-course.html',
      controller: 'userCourseCtrl'
    })
    .when('/user-category/:categoryId/course/user/:userId', {
      templateUrl: 'page/user-course/user-course.html',
      controller: 'userCourseCtrl'
    })
    .when('/add-user-course-item/:userCourseId', {
      templateUrl: 'controller/add-user-course-item/add-user-course-item.html',
      controller: 'addUserCourseItemCtrl'
    })
    .when('/user-course-section/:courseId', {
      templateUrl: 'controller/user-course-section/user-course-section.html',
      controller: 'userCourseSectionCtrl'
    })
    .when('/user-section-item/:courseSectionId', {
      templateUrl: 'controller/user-section-item/user-section-item.html',
      controller: 'userSectionItemCtrl'
    })
    .when('/user-item-detail/:courseItemId', {
      templateUrl: 'controller/user-item-detail/user-item-detail.html',
      controller: 'userItemDetailCtrl'
    })
    .when('/user-course-item/:userCourseId', {
      templateUrl: 'controller/user-course-item/user-course-item.html',
      controller: 'userCourseItemCtrl'
    })
    .when('/user-course-item-detail/:userCourseItemId', {
      templateUrl: 'controller/user-course-item-detail/user-course-item-detail.html',
      controller: 'userCourseItemDetailCtrl'
    })
    .when('/group', {
      templateUrl: 'controller/group/group.html',
      controller: 'groupCtrl'
    })
    .when('/course', {
      templateUrl: 'controller/course/course.html',
      controller: 'courseCtrl'
    })
    .when('/notification', {
      templateUrl: 'controller/notification/notification.html',
      controller: 'notificationCtrl'
    })
    //Admin page
    .when('/create-item', {
      templateUrl: 'controller/create-item/create-item.html',
      controller: 'createItemCtrl'
    })
    .when('/add-course-item', {
      templateUrl: 'controller/add-course-item/add-course-item.html',
      controller: 'addCourseItemCtrl'
    })
    .when('/coin-admin', {
      templateUrl: 'controller/coin-admin/coin-admin.html',
      controller: 'coinAdminCtrl'
    })
    .when('/user-course-admin', {
      templateUrl: 'controller/user-course-admin/user-course-admin.html',
      controller: 'userCourseAdminCtrl'
    })
    .when('/add-user-course-item-admin/:userId/:userCourseId', {
      templateUrl: 'controller/add-user-course-item-admin/add-user-course-item-admin.html',
      controller: 'addUserCourseItemAdminCtrl'
    })
    .when('/user-course-item-admin/:userId/:userCourseId', {
      templateUrl: 'controller/user-course-item-admin/user-course-item-admin.html',
      controller: 'userCourseItemAdminCtrl'
    })
    .when('/user-course-item-detail-admin/:userId/:userCourseItemId', {
      templateUrl: 'controller/user-course-item-detail-admin/user-course-item-detail-admin.html'
      //controller: 'userCourseItemDetailAdminCtrl'
    })
    // Test page
    .when('/test-admin', {
      templateUrl: 'controller/test-admin/test-admin.html',
      controller: 'testAdminCtrl'
    })
    //Default page
    .otherwise({
      redirectTo: '/'      
    })
  ;
  
  RestangularProvider.setBaseUrl(appInfo.apiPath);
});
