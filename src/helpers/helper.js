let logUser = async(logType, userData) => {   // Common function to log a user during entry/exit.

    let token = JSON.parse(localStorage.getItem("user")||"").token;

    await fetch(`http://localhost:4000/auditors/logEntry/${logType}`,{
      method : 'POST',
      mode:'cors',
      headers: { 'Authorization': 'Bearer ' + token , 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
}

let logOutUser = async() => { // Common function to logout a user and delete localStorage item.
  let userData = JSON.parse(localStorage.getItem("user")||"");
  await logUser("Exit", userData);
  localStorage.removeItem("user");
}

export {logUser, logOutUser};
