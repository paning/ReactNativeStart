let NetUtil = {
  postJson(url, data, callback){
      //var body = {"username": "admin", "password", "123"},
        var fetchOptions = {
          method: 'post',
          body: data
        };

let formdata = new FormData();
formdata.append("username", 'admin'),
formdata.append("password", '123'),
        fetch(url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'username=admin&password=123'
        })
        .then((response) => response.text())
        .then((responseText) => {
         //  callback(JSON.parse(responseText));
           callback(responseText);
        }).done();
  },
}
export default NetUtil;
