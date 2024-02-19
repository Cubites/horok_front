import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Test() {
  return <div onClick={Axiosss}>Test</div>;
}

async function Axiosss() {
  const response = await axios
    .get('http://192.168.0.70:8080/acTest')
    .then(function (response) {
      //location.href = '/login';
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);

      window.location.href =
        '/login?redirect_uri=' +
        window.location.pathname +
        window.location.search;
    });
}

export default Test;
