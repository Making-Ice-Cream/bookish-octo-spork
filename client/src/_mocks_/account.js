// ----------------------------------------------------------------------

const account = {

  displayName: JSON.parse(localStorage.getItem("name")) === undefined ? "Deepak Yadav" : JSON.parse(localStorage.getItem("name")),
  email: JSON.parse(localStorage.getItem("user_email")) ,
  photoURL:  '/static/mock-images/avatars/avatar_18.jpg'
};


localStorage.setItem("image" , JSON.stringify("/static/mock-images/avatars/avatar_18.jpg"))

export default account;
