// Add "domain.com" to Cookie->WhiteList
// to allow access to the domain's cookies from scripts

const backend = pm.environment.get("host")
const sanctumCookie = pm.environment.get("sanctum_csrf")

if(pm.request.method === 'POST'){
    pm.sendRequest({
        url: backend + '/' + sanctumCookie,
        method: 'GET',
        header: {
            'Accept': 'application/json'
        }
    },
    function (error, response) {
        if(!error){
            const cookieJar = pm.cookies.jar();

            cookieJar.get(backend, "XSRF-TOKEN", function(error, cookie){
                    pm.environment.set("x-xsrf", cookie)
                }
            );
        }
    }
    )
}


// const cookieJar = pm.cookies.jar();

// cookieJar.clear('domain.com', function (error) {
    
// });