//config to connect to firebase
var config = {
  apiKey: "AIzaSyDHN6epAFTpGwywxeqKpc1vzNERGLYfguE",
  authDomain: "math-web-kmitl.firebaseapp.com",
  databaseURL: "https://math-web-kmitl.firebaseio.com",
  projectId: "math-web-kmitl",
  storageBucket: "math-web-kmitl.appspot.com",
};
firebase.initializeApp(config);
//prepare to get image from firebase storage
var stRef = firebase.firestore();
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
    $('#teacher-list').append(teacherCard(childData, pad(count)));
    //     document.querySelector('#teacher-list')
    // .innerHTML += teacherCard(childData, count);
  });
  //retreive data for president
  var president = snapshot.child('user01').val();
  $('#president').append(teacherCard(president, pad(1)));
});

var ofRef = firebase.database().ref('officer');
//load data once per refresh not realtime
ofRef.once('value', function (snapshot) {
  count = 24;
  //for in every child of data
  snapshot.forEach(function (childSnapshot) {
    count += 1;
    var key = childSnapshot.key;
    var childData = childSnapshot.val();
    $('#officer-list').append(officerCard(childData, pad(count)));
    //     document.querySelector('#teacher-list')
    // .innerHTML += teacherCard(childData, count);
  });
});

//teacher card 
function teacherCard(teacher, count) {
  var html = '';
  var fileName = 'user' + count + '.jpg';
  var imagesRef = 'user_pic%2F' + fileName;
  var urlIm = 'https://firebasestorage.googleapis.com/v0/b/math-web-kmitl.appspot.com/o/' + imagesRef + '?alt=media';
  // var urlIm  = stRef.child(imagesRef).getDownloadURL().then(function(url) {
  //     console.log(url); }).catch(function(error){console.log("Fuck you"); });
  html += '<div class="col-md-8 col-lg-4 m-l-r-auto p-b-30">';
  html += '<div class="blo5 pos-relative p-t-60">';
  html += '<div class="pic-blo5 size14 bo4 wrap-cir-pic hov-img-zoom ab-c-t">';
  html += '<img src="' + urlIm + '" alt="IGM-AVATAR">';
  html += '<div class="overlay-item-gallery trans-0-4 flex-c-m">';
  html += '<a class="btn-show-gallery flex-c-m fa fa-search" href="' + urlIm + '" data-lightbox="gallery">';
  html += '</a>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="text-blo5 size34 t-center bo-rad-10 bo7 p-t-90 p-l-35 p-r-35 p-b-30">';
  html += '<div class="txt34 dis-block p-b-6">' + teacher.title + ' ' + teacher.name + ' ' + teacher.surname + '</div>';
  html += '<p class="t-center">';
  var tel = teacher.tel;
  html += tel[0] + '<BR>';
  var email = teacher.email;
  html += email[0] + '<BR>';
  html += teacher.room + '</p>';
  html += '<button onclick="teacherModal(this.id)" class="t-center more-info" id="teacher-' + count + '" value = "' + count + '" data-toggle="modal"' + 'data-target="#modal-teacher' + count + '"' + '">';
  html += 'ดูข้อมูลเพิ่มเติม<i class="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i>';
  html += '</button>'
  html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

//Modal when you click more info
function teacherModal(id) {
  tdRef.on('value', function (snapshot) {
    var x = document.getElementById(id).getAttribute("value");
    var childData = snapshot.child('user' + x).val();
    $('#modal-every-teacher').append(createModal(childData, x));
  });
  function createModal(teacher, count) {
    var html = '';
    var fileName = 'user' + count + '.jpg';
    var imagesRef = 'user_pic%2F' + fileName;
    var urlIm = 'https://firebasestorage.googleapis.com/v0/b/math-web-kmitl.appspot.com/o/' + imagesRef + '?alt=media';
    html += '<div class="modal fade modal-teacher" id="modal-teacher'+count+'" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">';
    html += '<div class="modal-dialog modal-lg" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<h5 class="modal-title" id="myLargeModalLabel">ข้อมูลบุคลากร</h5>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<div class="row">';
    html += '<div class="col-md-12">';
    html += '<B>ชื่อ-นามสกุล</B>';
    html += '<div class="row">';
    html += '<div class="col-md-4">';
    html += '<img src="' + urlIm + '" id="img-person">';
    html += '</div>';
    html += ('<div class="col-sm-8">' + teacher.title + ' ' + teacher.name + ' ' + teacher.surname + '<BR>' + teacher.title_en + ' ' + teacher.name_en + ' ' + teacher.surname_en + '<BR>');
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="row"><div class="col-md-12"><B>อีเมล์ </B><div class="row"><div class="col-sm-8">';
    var email = teacher.email;
    for(i=0;i<email.length;i++){
      html += ' - '+email[i]+'<BR>';
    }
    html += '</div></div></div></div>';
    html += '<div class="row"><div class="col-md-12"><B>โทรศัพท์</B><div class="row"><div class="col-sm-8">';
    var tel = teacher.tel;
    for(i=0;i<tel.length;i++){
      html += ' - '+tel[i]+'<BR>';
    }
    html += '</div></div></div></div >';
    html += '<div class="row"><div class="col-md-12"><B>ห้องพัก </B><div class="row"><div class="col-sm-8">';
    html +=  ' - '+teacher.room;
    html += '</div></div></div ></div >';
    html += '<div class="row"><div class="col-md-12"><B>โฮมเพจ </B><div class="row"><div class="col-sm-8">';
    if(teacher.homepage == '-'){
      html +=  ' - ';
    }
    else{
      html +=  ' - '+teacher.homepage;
    }
    html += '</div></div></div ></div >';
    html += '<div class="row"><div class="col-md-12"><B>การศึกษา </B><div class="row"><div class="col-sm-12">';
    var education = teacher.education;
    for(i=0;i<education.length;i++){
      if(education[i] != '-')
        html += ' - '+education[i]+'<BR>';
    }
    html += '</div></div></div ></div >';
    html += '<div class="row"><div class="col-md-12"><B>สาขาที่เชี่ยวชาญ/สนใจ </B><div class="row"><div class="col-sm-12">';
    var specialized_interests = teacher.specialized_interests;
    for(i=0;i<specialized_interests.length;i++){
      if(specialized_interests[i] != '-')
        html += ' - '+specialized_interests[i]+'<BR>';
    }
    html += '</div></div></div ></div >';
    html += '<div class="row"><div class="col-md-12"><B>งานวิจัย/สิ่งตีพิมพ์ </B><div class="row"><div class="col-sm-12">';
    var research = teacher.research;
    for(i=0;i<research.length;i++){
      if(research[i] != '-')
        html += ' - '+research[i]+'<BR>';
    }
    html += '</div></div></div ></div >';
    html += '<div class="row"><div class="col-md-12"><B>รายวิชาที่รับผิดชอบ </B><div class="row"><div class="col-sm-8">';
    var responsible_course = teacher.responsible_course;
    for(i=0;i<responsible_course.length;i++){
      if(responsible_course[i] != '-')
        html += ' - '+responsible_course[i]+'<BR>';
    }
    html += '</div></div></div ></div >';
    html += '</div>';
    html += '<div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">ปิด</button></div>';
    html += '</div></div></div>';
    return html;
  }

}

//officer card 
function officerCard(teacher, count) {
  var html = '';
  var fileName = 'user' + count + '.jpg';
  var imagesRef = 'user_pic%2F' + fileName;
  var urlIm = 'https://firebasestorage.googleapis.com/v0/b/math-web-kmitl.appspot.com/o/' + imagesRef + '?alt=media';
  // var urlIm  = stRef.child(imagesRef).getDownloadURL().then(function(url) {
  //     console.log(url); }).catch(function(error){console.log("Fuck you"); });
  html += '<div class="col-md-8 col-lg-4 m-l-r-auto p-b-30">';
  html += '<div class="blo5 pos-relative p-t-60">';
  html += '<div class="pic-blo5 size14 bo4 wrap-cir-pic hov-img-zoom ab-c-t">';
  html += '<img src="' + urlIm + '" alt="IGM-AVATAR">';
  html += '<div class="overlay-item-gallery trans-0-4 flex-c-m">';
  html += '<a class="btn-show-gallery flex-c-m fa fa-search" href="' + urlIm + '" data-lightbox="gallery">';
  html += '</a>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="text-blo5 size34 t-center bo-rad-10 bo7 p-t-90 p-l-35 p-r-35 p-b-30">';
  html += '<div class="txt34 dis-block p-b-6">' + teacher.name + ' ' + teacher.surname + '</div>';
  html += '<p class="t-center">';
  var tel = teacher.tel;
  html += tel[0] + '<BR>';
  var email = teacher.email;
  html += email[0] + '<BR>';
  html += teacher.room + '</p>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

//pad number one length with zero
function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
