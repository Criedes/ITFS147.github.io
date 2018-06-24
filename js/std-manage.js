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
                table.append(studentTab(childData[i], pad(count_s), key));
            }
        }
        //     document.querySelector('#teacher-list')
        // .innerHTML += teacherCard(childData, count);
    });
    page();
});
function studentTab(student, id, key) {
    var html = '';
    html += '<tr>';
    html += '<td>' + student.user_id + '</td>';
    html += '<td>' + student.name + '</td>';
    html += '<td>' + student.surname + '</td>';
    html += '<td>' + 'Edit' + '</td>';
    html += '<td>' + '<a href="#" onclick = "deleteStd(this.id)" id="' + key + '-' + id + '">' + 'Delete' + '</a>' + '</td>';
    html += '</tr>';
    return html;
}

//pad number one length with zero
function pad(d) {
    return (d < 10) ? '00' + d.toString() : (d < 100) ? '0' + d.toString() : d.toString();
}


window.alert = function () {
    $("#myModal .modal-body").text(arguments[0]);
    $("#myModal").modal('show');
};

function signOut() {
    firebase.auth().signOut().then(function () {
        localStorage.clear();
        swal('ออกจากระบบ', 'เสร็จสิ้น!', "success").then(function (value) { window.location.href = 'index.html' });
    }).catch(function (error) {
        swal('กรุณาตรวจสอบ', 'เครือข่ายอินเทอร์เน็ต', "error");
        console.log(error);
    });
}

function resetPassword() {
    var email = localStorage.getItem('email');
    firebase.auth().sendPasswordResetEmail(email).then(
        function () {
            swal('กรุณาตรวจสอบข้อความ', 'ที่เข้าอีเมลของคุณเพื่อเปลี่ยนรหัสผ่าน', "success");
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

function deleteStd(id) {
    year = id.split("-")[0];
    std_id = id.split("-")[1];
    swal({
        title: "คำเตือน",
        text: "ถ้าคุณลบแล้วจะไม่สามารถกู้ข้อมูลกลับมาได้อีก",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                tdRef.child(year + '/user' + std_id).remove();
                swal("ข้อมูลนักษาคนนี้ถูกลบไปแล้ว", {
                    icon: "success",
                }).then(function(value){window.location.href = 'std-manage.html' });
            }
        });
}