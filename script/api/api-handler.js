//Json Response
const json = (res) => {
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
<<<<<<< HEAD
  if (res.status != 200) {
=======
  if (res.status !== 200) {
>>>>>>> update all
    console.log(`Error : ${res.status}`);
    return Promise.reject(new Error(res.statusText()));
  } else {
    return Promise.resolve(res);
  }
};
//Status Response

export { json, apiHandler, status };
