// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzVJSL21thNbV1A9fouwQmMFE5BV8UJxI",
  authDomain: "hello-5308b.firebaseapp.com",
  databaseURL: "https://hello-5308b.firebaseio.com",
  projectId: "hello-5308b",
  storageBucket: "hello-5308b.appspot.com",
  messagingSenderId: "457671988471",
  appId: "1:457671988471:web:4ef1cf0cca7f482efd6ff2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// https://firebase.google.com/docs/auth/web/auth-state-persistence
//ブラウザ ウィンドウを閉じたり React Native でアクティビティが破棄されたりした場合でも、状態が維持されることを示します。この状態をクリアするには、明示的なログアウトが必要です。Firebase Auth のウェブ セッションは単一のホストを生成元とするため、単一のドメインでのみ永続化されることに注意してください。
firebase.auth.Auth.Persistence.LOCAL; //そのまま貼り付けOK

//ログイン
$("#btn_login").on("click", function () {
  var email = $("#email").val(); //メール変数
  var password = $("#password").val(); //パスワード変数
  if (email != "" && password != "") { //空っぽはダメ
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    var result = firebase.auth().signInWithEmailAndPassword(email, password); //メール、パスワードのお決まり

    result.catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("Message : " + errorMessage);
    })
  } else {
    window.alert("Please form complete."); //フォームいれて！
  }
});

//ログアウト
$("#btn_logout").on("click", function () {
  //https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=ja#signout
  firebase.auth().signOut();
});

//サインアップ

$("#btn_signup").on("click", function () {
  var email = $("#email").val(); //メール変数
  var password = $("#password").val(); //パスワード変数
  var confirmPassword = $("#confirmPassword").val(); //パスワード変数
  if (email != "" && password != "" && confirmPassword != "") { //空っぽはダメ
    if (password == confirmPassword) {
      //https://firebase.google.com/docs/auth/web/password-auth?hl=ja
      var result = firebase.auth().createUserWithEmailAndPassword(email, password); //メール、パスワードのお決まり

      result.catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      })
    } else {
      window.alert("同じパスワードを入力して下さい。"); //パスワード同じにして！
    }
  } else {
    window.alert("フォームを入力して下さい。"); //フォームいれて！
  }
});

//リセットアカウント
$("#btn_resetPassword").on("click", function () {
  var auth = firebase.auth();
  var email = $("#email").val();
  if (email != "") {
    //https://firebase.google.com/docs/auth/web/manage-users?hl=ja
    auth.sendPasswordResetEmail(email).then(function () {
      window.alert("メール送ったから確認してみて！");
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("Message : " + errorMessage);
    })
  } else {
    window.alert("メールを入力して下さい"); //メールアドレスいれて！
  }
});


//アカウント設定
$("#btn_update").on("click", function () {
  var fName = $("#firstName").val(); //名前変数
  var lName = $("#lastName").val(); //名字変数
  var country = $("#country").val(); //国変数
  var phone = $("#phone").val(); //電話変数
  var gender = $("#gender").val(); //性別変数
  var address = $("#address").val(); //アドレス変数
  var biography = $("#biography").val(); //略歴変数

  var rootRef = firebase.database().ref().child("Users");
  // https://firebase.google.com/docs/auth/web/manage-users?hl=ja
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);

  if (fName != "" && lName != "" && country != "" && phone != "" && gender != "" && address != "" && biography != "") {
    var userData = {
      "firstName": fName,
      "lastName": lName,
      "country": country,
      "phone": phone,
      "gender": gender,
      "addless": address,
      "biography": biography,
    };

    usersRef.set(userData, function (error) {
      if (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);

        window.alert("Message : " + errorMessage);
      } else {
        window.location.href = "main.html";
      }
    });
  } else {
  }
});

function switchView(view) {
  $.get({
    url:view,
    cache:false
  })
  .then(function(data){
    $("#container").html(data);
  });
}