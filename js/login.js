var config = {
  apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
  authDomain: "math-web-kmitl.firebaseapp.com",
  databaseURL: "https://math-web-kmitl.firebaseio.com",
  projectId: "math-web-kmitl",
  storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);
function Login() {
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (resp) {
      localStorage.setItem("uid", resp.uid);
      localStorage.setItem("email", resp.email);
      localStorage.setItem("pass", password);
      console.log(resp);
       window.location.href = 'user.html';
      alert('Logged in');
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong Password');
      } else {
        alert('errorMessage');
      }

      console.log(error);
    });

}

