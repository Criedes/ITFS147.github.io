var config = {
  apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
  authDomain: "math-web-kmitl.firebaseapp.com",
  databaseURL: "https://math-web-kmitl.firebaseio.com",
  projectId: "math-web-kmitl",
  storageBucket: "math-web-kmitl.appspot.com",
};
if(sessionStorage.getItem('uid')){
  window.location.href = 'user.html';
}
firebase.initializeApp(config);
function Login() {
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (resp) {
      sessionStorage.setItem("uid", resp.uid);
       window.location.href = 'user.html';
      alert('เข้าสู่ระบบแล้ว');
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('รหัสผ่านไม่ถูกต้อง');
      } else {
        alert('โปรดตรวจสอบการเชื่อมต่อ');
      }

      console.log(error);
    });

}

