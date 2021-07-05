const setCookies = (response, extraDays) => {
  // ------------------------making keyValues for cookies----------------
  // eslint-disable-next-line
  let idKV = "id" + "=" + response.data.id;
  // eslint-disable-next-line
  let authenticatedKV = "authenticated" + "=" + response.data.authenticated;
  console.log("1 ) " + idKV);
  console.log("2 ) " + authenticatedKV);
  // ---------------------------expiry for the cookies--------------------
  let timeNow = new Date();
  timeNow.setTime(timeNow.getTime() + extraDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + timeNow.toUTCString();

  // -----------------------------------creating cookies------------------
  // Cookie String
  let cookie1 = authenticatedKV + ";path=/;" + expires;
  let cookie2 = idKV + ";path=/;" + expires;

  // Create cookie
  document.cookie = cookie1;
  document.cookie = cookie2;
};

// getting values from the cookies
const getCookieValue = (cookieKey) => {
  let cookiesList = document.cookie.split(";").map((cookie) => {
    return cookie.trim();
  });

  for (let i = 0; i < cookiesList.length; i++) {
    let cookie = cookiesList[i].split("=");
    let key = cookie[0];
    let value = cookie[1];
    if (key === cookieKey) {
      return value;
    }
  }
  return undefined;
};

const getCookieObj = () => {
  if (
    getCookieValue("id") === undefined ||
    getCookieValue("authenticated") === undefined
  ) {
    return null;
  } else {
    return (
      '{ "data" : { "id" : "' +
      getCookieValue("id") +
      '" ,' +
      '"authenticated" : ' +
      getCookieValue("authenticated") +
      "}}"
    );
  }
};

module.exports = {
  setCookies,
  getCookieObj,
  getCookieValue,
};
