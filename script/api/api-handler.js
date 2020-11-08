//Json Response
let json = (res) => {
  return res.json();
};
//Json Response

//EventListener
const apiHandler = (selector, event, handler) => {
  document.querySelector("body").addEventListener(event, (evt) => {
    if (evt.target.matches(selector)) handler(evt);
  });
};
//EventListener

//Status Response
let status = (res) => {
  if (res.status !== 200) {
    console.log(`Error : ${res.status}`);
    return Promise.reject(new Error(res.statusText()));
  } else {
    return Promise.resolve(res);
  }
};
export { json, apiHandler, status };

//Status Response
