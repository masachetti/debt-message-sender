const authURL = `${process.env.REACT_APP_API_URL}oauth/token`;

function fetchToken() {
  const data = {
    client_id: process.env.REACT_APP_API_CLIENT_ID,
    client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
    username: process.env.REACT_APP_API_USERNAME,
    password: process.env.REACT_APP_API_PASSWORD,
    grant_type: "password",
  };
  return fetch(authURL, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => `Bearer ${data["access_token"]}`);
}

export { fetchToken };
