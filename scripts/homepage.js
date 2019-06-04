//Handle UI changes for logged in user
function successLoginHandle(name) {
  //Remove login button
  $("#navitem li")
    .last()
    .remove();
  $("#mobnavitem li")
    .last()
    .remove();
  //Add logout button
  $("#navitem").append(
    '<li><a class="logout"><i class="material-icons left">exit_to_app</i>登出 ' +
      name +
      "</a></li>"
  );
  $("#mobnavitem").append(
    '<li><a class="logout"><i class="material-icons left">exit_to_app</i>登出 ' +
      name +
      "</a></li>"
  );
  //Show username
  $("#username").html(name);

  //Init logout button
  $(".logout").click(function() {
    $.get("/logout", function(content) {
      successLogoutHandle();
    });
  });
}

//Handle UI changes for logged out user
function successLogoutHandle() {
  //Remove Logout button
  $("#navitem li")
    .last()
    .remove();
  $("#mobnavitem li")
    .last()
    .remove();
  //Add login button
  $("#navitem").append(
    '<li><a href="#loginpage" class="modal-trigger"><i class="material-icons left">person</i>登入</a></li>'
  );
  $("#mobnavitem").append(
    '<li><a href="#loginpage" class="modal-trigger"><i class="material-icons left">person</i>登入</a></li>'
  );
  //Change user name to guest
  $("#username").html("未登入");
  //Direct to home page
  $.get("shop.html", function(content) {
    $("#content").html(content);
  });
}

$(document).ready(function() {
  //Load homepage content
  $.get("shop.html", function(content) {
    $("#content").html(content);
    $.getScript("/scripts/shop.js");
  });

  //Check logged in
  $.get("/login", function(content) {
    if (content.user != "NOT") {
      successLoginHandle(content.user);
      console.log("Great!");
    } else {
      //Guest
      console.log("Guest!");
    }
  });

  //Sidenav, modal init
  $(".sidenav").sidenav();
  $(".modal").modal();

  //Goto different page
  $(".backend").click(function() {
    $.get("backend.html", function(content) {
      $("#content").html(content);
    });
  });

  $(".home").click(function() {
    $.get("shop.html", function(content) {
      $("#content").html(content);
    });
  });

  //Create account
  $("#createAccount").click(function() {
    if (
      $("#newname").val().length < 4 ||
      $("#newname").val().length > 20 ||
      $("#newpassword").val().length < 4 ||
      $("#newpassword").val().length > 20
    ) {
      $("#message").html("帳號及密碼長度需為4-20");
      $("#messagemodal").modal("open");
    } else {
      $.post(
        "/newAccount",
        {
          loginId: $("#newname").val(),
          password: $("#newpassword").val()
        },
        function(data) {
          $("#newname").val("");
          $("#newpassword").val("");
          $("#newname").removeClass("valid");
          $("#newpassword").removeClass("valid");
          $("#labelnewname").removeClass("active");
          $("#labelnewpassword").removeClass("active");
          $("#message").html(data);
          $("#messagemodal").modal("open");
          $("#newaccount").modal("close");
        }
      );
    }
  });

  //Login
  $("#loginButton").click(function() {
    var u_id = $("#name").val();

    $.post(
      "/checkUser",
      {
        id: $("#name").val(),
        pw: $("#password").val()
      },
      //Bad coding, try to fix it
      function(data) {
        if (data == "0") {
          $("#loginpage").modal("close");
          $("#name").val("");
          $("#password").val("");
          $("#name").removeClass("valid");
          $("#password").removeClass("valid");
          $("#labelname").removeClass("active");
          $("#labelpassword").removeClass("active");
          successLoginHandle(u_id);
        } else if (data == "1") {
          $("#message").html("密碼錯誤, 請重試");
          $("#messagemodal").modal("open");
        } else if (data == "2") {
          $("#message").html("沒此帳號, 請重試");
          $("#messagemodal").modal("open");
        } else {
          $("#message").html("系統錯誤, 請聯絡我們");
          $("#messagemodal").modal("open");
        }
      }
    );
  });
});