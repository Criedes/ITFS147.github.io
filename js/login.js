var config = {
  apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
  authDomain: "math-web-kmitl.firebaseapp.com",
  databaseURL: "https://math-web-kmitl.firebaseio.com",
  projectId: "math-web-kmitl",
  storageBucket: "math-web-kmitl.appspot.com",
};
if(localStorage.getItem('uid')){
  window.location.href = 'user.html';
}
firebase.initializeApp(config);
var tdRef = firebase.database().ref('teacher');
function Login() {
  var email = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (resp) {
      localStorage.setItem("uid", resp.uid);
      localStorage.setItem("email", resp.email)
      tdRef.once('value', function (snapshot) {
        count = 0;
        //for in every child of data
        snapshot.forEach(function (childSnapshot) {
            count += 1;
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if (childData.uid == localStorage.getItem('uid')) {
                if(childData.status == 'teacher'){
                  window.location.href = 'user.html';
                }
                else if(childData.status == 'staff'){
                  window.location.href = 'admin.html';
                }
            }
            //     document.querySelector('#teacher-list')
            // .innerHTML += teacherCard(childData, count);
        });
        //retreive data for president
    });
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

