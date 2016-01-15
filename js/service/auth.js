function authService () {
  var currentUser = null;
  var authorized = false;

  var initialState = true;

  return {
      initialState:function () {
          return initialState;
      },
      login:function () {
          //currentUser = name;
          authorized = true;
          initialState = false;
      },
      logout:function () {
          currentUser = null;
          authorized = false;
      },
      isLoggedIn:function () {
          return authorized;
      },
      currentUser:function () {
          return currentUser;
      },
      authorized:function () {
          return authorized;
      }
  };
}
