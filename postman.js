// Add "domain.com" to Cookie->WhiteList
// to allow access to the domain's cookies from scripts

pm.sendRequest({
    url:'domain.com/sanctum/csrf-cookie',
    method: 'GET',
    header: {
        'Accept': 'application/json'
    }
  },
  function (error, response) {
    if(!error){
        const cookieJar = pm.cookies.jar();

        cookieJar.get('domain.com', "XSRF-TOKEN", function(error, cookie){
                pm.environment.set("x-xsrf", cookie)
            }
        );
    }
  }
)


// const cookieJar = pm.cookies.jar();

// cookieJar.clear('domain.com', function (error) {
    
// });