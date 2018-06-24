//config to connect to firebase
var config = {
    apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
    authDomain: "math-web-kmitl.firebaseapp.com",
    databaseURL: "https://math-web-kmitl.firebaseio.com",
    projectId: "math-web-kmitl",
    storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);

//prepare to get teacher from firebase database
var tdRef = firebase.database().ref('teacher');
//load data once per refresh not realtime
tdRef.once('value', function (snapshot) {
  count = 0;
  //for in every child of data
  snapshot.forEach(function (childSnapshot) {
    count += 1;
    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    var table = $('#teacher-table tbody');
    table.append(teacherTab(childData, pad(count)));
  });
  page();
});

function teacherTab(teacher, id){
    var html = '';
    html += '<tr>';
    html += '<td>'+teacher.name+'</td>';
    html += '<td>'+teacher.surname+'</td>';
    html += '<td>'+teacher.email_login+'</td>';
    html += '<td>'+teacher.uid+'</td>';
    html += '</tr>';
    return html;
}

//pad number one length with zero
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }
  
  window.alert = function () {
    $("#myModal .modal-body").text(arguments[0]);
    $("#myModal").modal('show');
};

function signOut() {
    firebase.auth().signOut().then(function () {
        localStorage.clear();
        swal('ออกจากระบบ', 'เสร็จสิ้น!',"success").then(function (value){window.location.href = 'index.html'});
    }).catch(function (error) {
        swal('กรุณาตรวจสอบ', 'เครือข่ายอินเทอร์เน็ต', "error");
        console.log(error);
    });
}

function resetPassword() {
    var email = localStorage.getItem('email');
    firebase.auth().sendPasswordResetEmail(email).then(
        function () {
            swal('กรุณาตรวจสอบข้อความ', 'ที่เข้าอีเมลของคุณเพื่อเปลี่ยนรหัสผ่าน',"success");
        }).catch(
            function (error) {
                swal('กรุณาตรวจสอบ', 'เครือข่ายอินเทอร์เน็ต', "error");
                console.log(error);
            }
        )
}

function page() {
    $('#teacher-table').DataTable();
}