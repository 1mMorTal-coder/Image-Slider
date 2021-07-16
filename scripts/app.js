let circle = document.getElementsByClassName('circle');
let movingCircle = document.getElementsByClassName('moving_circle')[0];
circle = Array.from(circle);
let circleGap = document.getElementsByClassName('1')[0].offsetLeft;
let circleCount = 0;
let arrowCount = 0;
circle.forEach(element => {
  element.addEventListener('click', (e) => {
    cancelAnimationFrame(requestId);
    movingCircle.style.transform = `translateX(${e.target.offsetLeft}px)`;
    arrowCount = circleCount = Number(e.target.classList[1]);
    imageContainer.style.transform = `translateX(calc(-100% / 6 * ${arrowCount}))`;
    requestId = window.requestAnimationFrame(step);
    start = 0;
  })
});

let leftArrow = document.getElementsByClassName('left_arrow')[0];
let rightArrow = document.getElementsByClassName('right_arrow')[0];
let imageContainer = document.getElementsByClassName('container_img')[0];


let containerWidth = document.getElementsByClassName('container')[0].offsetWidth;
rightArrow.addEventListener('click', arrowClicked);
leftArrow.addEventListener('click', arrowClicked);

function arrowClicked(direction) {
  let calledClass;
  cancelAnimationFrame(requestId);
  if (this.classList)
    calledClass = this.classList[0];
  if (calledClass === 'right_arrow' || direction === 'right') {
    if (arrowCount === 5) {
      arrowCount = 0; circleCount = 0;
    }
    else {
      ++circleCount; ++arrowCount;
    }
  }
  else {
    if (arrowCount === 0) {
      arrowCount = 5; circleCount = 5;
    }
    else {
      --circleCount; --arrowCount;
    }
  }
  imageContainer.style.transform = `translateX(calc(-100% / 6 * ${arrowCount}))`;
  movingCircle.style.transform = `translateX(${circleCount * circleGap}px)`;
  requestId = window.requestAnimationFrame(step);
  start = 0;
}

let requestId;
let box = document.getElementsByClassName('box')[0];
let start;
function step(timestamp) {
  if (start === undefined || start === 0)
    start = timestamp;
  const elapsed = timestamp - start;
  if (elapsed >= 5000) {
    start = timestamp;
    arrowClicked('right');
  }
  requestId = window.requestAnimationFrame(step)
}

requestId = window.requestAnimationFrame(step);







// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback) {

  var imageContainer = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 100, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 200, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) { }

  imageContainer.addEventListener('touchstart', function (e) {
    var touchobj = e.changedTouches[0]
    swipedir = 'none'
    dist = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime() // record time when finger first makes contact with surface
    e.preventDefault()
  }, false)

  imageContainer.addEventListener('touchmove', function (e) {
    e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  imageContainer.addEventListener('touchend', function (e) {
    var touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
    elapsedTime = new Date().getTime() - startTime // get time elapsed
    if (elapsedTime <= allowedTime) { // first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
        (distX < 0) ? arrowClicked('left') : arrowClicked('right'); // if dist traveled is negative, it indicates left swipe
      }
      // else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
      //   swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
      // }
    }
    handleswipe(swipedir)
    e.preventDefault()
  }, false)
}

//USAGE:

var el = document.getElementById('swipezone');
swipedetect(imageContainer);
