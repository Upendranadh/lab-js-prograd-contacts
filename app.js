//Enter your code here..
//Uploaded ti git
//Dom elements
const button = document.getElementById("btnGet");
const message = document.getElementById("message");

// Function which makes an API call
const apiCall = () => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.addEventListener("readystatechange", () => {
      if (request.status == 200 && request.readyState === 4) {
        resolve(request.response);
      } else if (request.readyState === 4) {
        reject("Error fetching the data");
      }
    });
    request.onerror = () => {
      reject("erorr from the server");
    };
    // request.onerror(() => {
    //   reject("erorr from the server");
    // });

    request.send();
  });
};

button.addEventListener("click", () => {
  let promise = apiCall();
  promise
    .then((data) => {
      let parsedData = JSON.parse(data);
      console.log(parsedData);
      let player = "";
      parsedData.forEach((user) => {
        player += `<div class="player">
          <div class="strength">Name : ${user.name}</div>
          <div>Email   : ${user.email}</div>
          <div>Phone   : ${user.phone}</div>
          <div>Website : ${user.website}</div>
          <div>Company : ${user.company.name}</div>
          <div>City    : ${user.address.city}</div>
          <div>Zipcode : ${user.address.zipcode}</div>
         </div>`;
      });
      message.insertAdjacentHTML("beforeend", player);
      return apiCall();
    })
    .then((data) => {
      let parsedData = JSON.parse(data);
      console.log(parsedData);
    }) //if i want to chain promises
    .catch((error) => {
      console.log(error);
    });
});
