let logUser = async(logType, userData) => {

    let token = JSON.parse(localStorage.getItem("user")||"").token;

    await fetch(`http://localhost:4000/auditors/logEntry/${logType}`,{
      method : 'POST',
      mode:'cors',
      headers: { 'Authorization': 'Bearer ' + token , 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
}

let logOutUser = async() => {
  let userData = JSON.parse(localStorage.getItem("user")||"");
  await logUser("Exit", userData);
  localStorage.removeItem("user");
}

export {logUser, logOutUser};
