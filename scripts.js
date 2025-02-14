//set default degree (360*5)
var degree = 1800;
//number of clicks = 0
var clicks = 0;
var sections = [
  "key",
  "lesac",
  "lesac",
  "naha",
  "naha",
  "vinichy",
  "vinichy",
  "circle",
  "circle",
  "bell",
  "bell",
  "key",
];
$(document).ready(function () {
  // var spinSound = document.getElementById("spinSound");
  // var successSound = document.getElementById("successSound");

  /*WHEEL SPIN FUNCTION*/
  $("#spin").click(function () {
    //add 1 every click
    $("#spinSound")[0].play();
    clicks++;

    /*multiply the degree by number of clicks
	  generate random number between 1 - 360, 
    then add to the new degree*/
    var newDegree = degree * clicks;
    var extraDegree = Math.floor(Math.random() * (80 - 40 + 1)) + 40;
    // do {
    //   extraDegree = Math.floor(Math.random() * 360);
    // } while (extraDegree % 30 === 0 || extraDegree % 30 < 10 || extraDegree % 30 > 20); // Lặp lại nếu chia hết cho 30

    var totalDegree = newDegree + extraDegree;
    var finalDegree = totalDegree % 360;
    var sectionIndex = Math.floor(extraDegree / 30); // Mỗi phần chiếm 60 độ
    var result = sections[sectionIndex];
    $("#imgCongratulation").attr({
      src: `assets/${result}.png`,
      alt: `${result}.png`,
    });

    $("#wheel .sec").each(function () {
      var t = $(this);
      var noY = 0;

      var c = 0;
      var n = 700;
      var interval = setInterval(function () {
        if (c === 0) {
          $("canvas").css("display", "none");
        }
        c++;
        if (c === n) {
          $("#successSound")[0].play();
          clearInterval(interval);
        }
        if (c === 700) {
          $("#successSound")[0].play();
          $("canvas").fadeIn("fast"); 
          $(".btn-warning").click();
          happy();
        }

        var aoY = t.offset().top;
        $("#txt").html("Bạn quay trúng: " + result);
        // console.log(aoY);

        /*23.7 is the minumum offset number that 
				each section can get, in a 30 angle degree.
				So, if the offset reaches 23.7, then we know
				that it has a 30 degree angle and therefore, 
				exactly aligned with the spin btn*/
        if (aoY < 23.89) {
          // console.log("<<<<<<<<");
          // $('#spin').addClass('spin');
          // setTimeout(function () {
          //   $("#spin").removeClass("spin");
          // }, 100);
        }
      }, 10);

      $("#inner-wheel").css({
        transform: "rotate(" + totalDegree + "deg)",
        // transition: "transform 4s ease-out",
      });

      noY = t.offset().top;
    });
    // setTimeout(function () {
    //   // $("canvas").fadeIn("fast"); // Hiển thị hiệu ứng chúc mừng
    //   // $(".btn-warning").click();
    //   // happy();
    //   successSound.play();
    // }, 5000);
  });

  function happy() {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    canvas.style.pointerEvents = "none";
    const maxConfettis = 150;
    const particles = [];

    const possibleColors = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ];

    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function confettiParticle() {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11;
      this.color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;

      this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
      };
    }

    function Draw() {
      const results = [];

      // Magical recursive functional love
      requestAnimationFrame(Draw);

      context.clearRect(0, 0, W, window.innerHeight);

      for (var i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }

      let particle = {};
      let remainingFlakes = 0;
      for (var i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) remainingFlakes++;

        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let if re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }

      return results;
    }

    window.addEventListener(
      "resize",
      function () {
        W = window.innerWidth;
        H = window.innerHeight + 200;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      false
    );

    // Push new confetti objects to `particles[]`
    for (var i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }

    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
  }
}); //DOCUMENT READY
