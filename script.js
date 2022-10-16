const apiUrl = "https://randomuser.me/api/?results=50&";
const listElm = document.getElementById("list");
let userList = [];
const fetchUsers = (query) => {
  fetch(apiUrl + query)
    .then((response) => response.json())
    .then((data) => {
      userList = data.results;
      display(data.results);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchUsers();

const display = (users) => {
  let str = "";

  users.map((user, i) => {
    str += `
    <div class="card shadow" style="width: 18rem">
    <img
      src="${user.picture.large}"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${user.name.title} ${user.name.first} ${
      user.name.last
    }</h5>
      <p class="card-text">
      <ul class = "list-unstyled">
      <li ><i class="fa-solid fa-phone"></i> ${user.phone}</li>
      <li>${user.email}</li>
      <li>${user.dob.date.substr(0, 10)}</li>
      <li>${user.location.street.number}/${user.location.street.name}, ${
      user.location.city
    }, ${user.location.state} ${user.location.postcode}, ${
      user.location.country
    }</li>
      </ul>

      </p>
 
    </div>
  </div>`;
  });

  listElm.innerHTML = str;
  document.getElementById("count").innerText = users.length;
};

const handelOnscreen = (e) => {
  const value = e.value;
  console.log(e);
  const filteruduser = userList.filter((user) => {
    const name = user.name.first + user.name.last;
    return name.toLowerCase().includes(value.toLowerCase());
  });

  display(filteruduser);
};

const handelonchange = (e) => {
  const val = e.value;
  const query = "gender=" + val;

  fetchUsers(query);
};
