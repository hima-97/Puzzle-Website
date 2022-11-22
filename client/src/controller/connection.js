/*const axios = require('axios').default;

axios.get('/sign-up').then(response => {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
}).then(function() {
    console.log('expected');
});
*/

/*
//get example
axios.get('/user?ID=12345')
    .then(function (response) {
        //handle success
        console.log(response);
        console.log("response");
    })
    .catch(function (error) {
        //handle error
        console.log(error);
        console.log("error");
    })
    .then(function () {
        //always executed
        console.log("expected");
    });

//post example
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flinstone'
})
.then(function (response) {
    console.log(response);  
})
.catch(function (error) {
    console.log(error);
});

//multiple concurrent requests example
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('user/12345/permissions')
}

Promise.all([getUserAccount(), getUserPermissions()])
.then(function (results) {
    const acct = results[0];
    const perm = results[1];
});

//creating instance of axios
//url - server url used for request
//method - defaulted to get
//baseURL - will be prepended(added to beginning) of url unless url is absolute
//transformRequest - allows changes to the data before its sent to the server. put,post,patch,delete. last thing in array must return a string, or an instance of buffer, arraybuffer, formdata, or stream
//transformResponse - allows changes to the returned data before it is passed to the then/catch
//'headers' - custom headers to be sent
//'params' - the url params to be sent with the request. Must be a plain object, or URLSearchParams object. Any params that are Null or undefined are not rendered in the URL
//'data' - data to be sent as the request body. put, post, delete, patch
//'timeout' - number of milliseconds before the request times out. If the request is longer than timeout then it is aborted.
const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
*/
