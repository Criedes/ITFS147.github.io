//config to connect to firebase
var config = {
    apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
    authDomain: "math-web-kmitl.firebaseapp.com",
    databaseURL: "https://math-web-kmitl.firebaseio.com",
    projectId: "math-web-kmitl",
    storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);
var tdRef = firebase.database().ref('teacher');
//load data once per refresh not realtime
tdRef.once('value', function (snapshot) {
  count = 0;
  //for in every child of data
  snapshot.forEach(function (childSnapshot) {
    count += 1;
    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    localStorage.setItem('id', pad(count+1))
  });
});

function signOut() {
    firebase.auth().signOut().then(function () {
        localStorage.clear();
        alert('ออกจากระบบเสร็จสิ้น');
        window.location.href = 'index.html';
    }).catch(function (error) {
        console.log(error);
    });
}

function resetPassword() {
    var email = localStorage.getItem('email');
    firebase.auth().sendPasswordResetEmail(email).then(
        function () {
            alert('กรุณาตรวจสอบข้อความที่เข้าอีเมลของคุณเพื่อเปลี่ยนรหัสผ่าน');
        }).catch(
            function (error) {
                alert('กรุณาตรวจสอบเครือข่ายอินเทอร์เน็ต');
                console.log(error);
            }
        )
}

function createAccount(){
    var email = document.getElementById('email_login').value;
    var password = document.getElementById('pass').value;
    var ver_password = document.getElementById('ver_pass').value;
    var teacher = tdRef.child('user' + localStorage.getItem('id'));
    if(password.lenght < 8){
        alert('พาสเวิร์ดต้องมีความยาว 8 ตัวอักษรขึ้นไป');
    }else if(password == ver_password){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(resp){
            teacher.set(JSON.parse(createJSON(resp.uid))).then(function (resp2) {
                // alert('success');
                alert('อัพเดทข้อมูลเสร็จสิ้น');
            }).catch(function (error) {
                alert('ข้อมูลผิดพลาดโปรดตรวจสอบ');
                // console.log(error);
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorMessage);
          });  
    }
 
}

function createJSON(uid) {
    var email = document.getElementById('email_login').value;
    var json_str = "";
    json_str += '{';
    json_str += '"uid":"'+uid+'",';
    json_str += '"education" : [""],';
    json_str += '"email" : [""],';
    json_str += '"tel" : [""],';
    json_str += '"specialized_interests" : [""],';
    json_str += '"research" : [""],';
    json_str += '"responsible_course" : [""],';
    json_str += '"status":"teacher",';
    json_str += '"email_login":"'+email+'"';
    json_str += '}';
    return json_str;
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  
  window.alert = function () {
    $("#myModal .modal-body").text(arguments[0]);
    $("#myModal").modal('show');
};