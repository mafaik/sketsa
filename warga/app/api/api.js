
export function get(url,callback) {  
  
  fetch(url)
  .then(response => response.json() )
  .then( data => {
    //console.log(data);
    callback(data);
  })
  .catch((error) => {
    console.log(url);
    console.log(error);
  });
  
  //return;
}


export function post(url,body,callback) {  
  
  fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body
  })
  .then(response => response.json() )
  .then( data => {
    callback(data);
  })
  .catch((error) => {
    console.log(url);
    console.log(body);
    console.log(error);
  });

  //return;
  
}


export function postJson(url,body,callback) {

  fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
  })
  .then((response) => response.json() )
  .then( data => {
    callback(data);
  })
  .catch((error) => {
    console.log(url);
    console.log(body);
    console.log(error);
  });

  
}

