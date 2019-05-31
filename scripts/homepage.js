$(document).ready(function() {
  /*//Load homepage content
  $.get("introduction.html", function(content) {
    $("#content").html(content);
  });

  //Check logged in
  $.get("/login", function(content) {
    if (content.user != "NOT") {
      successLoginHandle(content.user);
    } else {
      //Guest
    }
  });*/

  //Sidenav, modal init
  $(".sidenav").sidenav();
  $(".modal").modal();

  /*//Goto different page
  $(".practice").click(function() {
    $.get("practice.html", function(content) {
      $("#content").html(content);
      $.getScript("/scripts/practice.js");
    });
  });

  $(".home").click(function() {
    $.get("introduction.html", function(content) {
      $("#content").html(content);
    });
  });

  $(".rank").click(function() {
    $.get("rank.html", function(content) {
      $("#content").html(content);

      //Dynamically generate rank content
      $.get("/rankinghit", function(content) {
        $("#rankitem").html(content);
        $("#currentsort").html("HIT");
        $(".rank").removeClass("disabled");
        $("#hitranking").addClass("disabled");
      });

      $("#hitranking").click(function() {
        $.get("/rankinghit", function(content) {
          $("#rankitem").html(content);
          $("#currentsort").html("HIT");
          $(".rank").removeClass("disabled");
          $("#hitranking").addClass("disabled");
        });
      });

      $("#cpmranking").click(function() {
        $.get("/rankingcpm", function(content) {
          $("#rankitem").html(content);
          $("#currentsort").html("CPM");
          $(".rank").removeClass("disabled");
          $("#cpmranking").addClass("disabled");
        });
      });

      $("#wpmranking").click(function() {
        $.get("/rankingwpm", function(content) {
          $("#rankitem").html(content);
          $("#currentsort").html("WPM");
          $(".rank").removeClass("disabled");
          $("#wpmranking").addClass("disabled");
        });
      });

      $("#scoreranking").click(function() {
        $.get("/rankingscore", function(content) {
          $("#rankitem").html(content);
          $("#currentsort").html("SCORE");
          $(".rank").removeClass("disabled");
          $("#scoreranking").addClass("disabled");
        });
      });
    });
  });

  //Create account
  $("#createAccount").click(function() {
    if (
      $("#name2").val().length < 4 ||
      $("#name2").val().length > 20 ||
      $("#password2").val().length < 4 ||
      $("#password2").val().length > 20
    ) {
      $("#message").html("Id and password must be 4-20 characters");
      $("#messagemodal").modal("open");
    } else {
      $.post(
        "/newAccount",
        {
          loginId: $("#name2").val(),
          password: $("#password2").val()
        },
        function(data) {
          $("#name2").val("");
          $("#password2").val("");
          $("#name2").removeClass("valid");
          $("#password2").removeClass("valid");
          $("#labelname2").removeClass("active");
          $("#labelpassword2").removeClass("active");
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
          $("#message").html("Wrong password. Please try again.");
          $("#messagemodal").modal("open");
        } else if (data == "2") {
          $("#message").html("Wrong Id. Please try again.");
          $("#messagemodal").modal("open");
        } else {
          $("#message").html("Unintended Error! Contact us.");
          $("#messagemodal").modal("open");
        }
      }
    );
  });*/
});