//config to connect to firebase
var config = {
    apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
    authDomain: "math-web-kmitl.firebaseapp.com",
    databaseURL: "https://math-web-kmitl.firebaseio.com",
    projectId: "math-web-kmitl",
    storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);

//prepare to get student from firebase database
var tdRef = firebase.database().ref('student');
//load data once per refresh not realtime
tdRef.once('value', function (snapshot) {
    count = 5;
    year = 61;
    var table = $('#student-table tbody');
    //for in every child of data
    snapshot.forEach(function (childSnapshot) {
        count -= 1;
        count_s = 0;
        year -= 1;
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        if (key != 'year61') {
            for (i in childData) {
                count_s += 1;
                table.append(studentTab(childData[i], pad(count)));
            }
        }
        //     document.querySelector('#teacher-list')
        // .innerHTML += teacherCard(childData, count);
    });
    page();
});
function studentTab(student, id) {
    var html = '';
    html += '<tr>';
    html += '<td>' + student.user_id + '</td>';
    html += '<td>' + student.name + '</td>';
    html += '<td>' + student.surname + '</td>';
    html += '<td>' + 'Edit' + '</td>';
    html += '<td id="' + student.user_id + '">' + 'Delete' + '</td>';
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
    $('#student-table').DataTable();
}
