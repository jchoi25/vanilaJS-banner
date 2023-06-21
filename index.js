fetch('https://placekitten.com/400/100?image=1', {mode: 'cors'})
    .then(response => response.blob())
    .then(blob => {
        document.getElementById('img-one').src = URL.createObjectURL(blob)
    });
fetch('https://placekitten.com/400/100?image=2', {mode: 'cors'})
    .then(response => response.blob())
    .then(blob => {
        document.getElementById('img-two').src = URL.createObjectURL(blob)
    });
fetch('https://placekitten.com/400/100?image=3', {mode: 'cors'})
    .then(response => response.blob())
    .then(blob => {
        document.getElementById('img-three').src = URL.createObjectURL(blob)
    });

const slide = document.querySelector(".image");
let slideWidth = slide.clientWidth;

let slideItems = document.querySelectorAll(".imgs");
const maxSlide = slideItems.length;

let currSlide = 1;

const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("img");
const endElem = document.createElement("img");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);
slideItems = document.querySelectorAll(".imgs");
let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

function nextMove() {
  currSlide++;
  if (currSlide <= maxSlide) {
    const offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide++;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
  }
}

function prevMove() {
  currSlide--;
  if (currSlide > 0) {
    const offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide--;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
      });
    }, 0);
  }
}

window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
});

let startPoint = 0;
let endPoint = 0;


// mobile touch
slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX;
});
slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});


//slide loop start
let loopInterval = setInterval(() => {
  nextMove();
}, 3000);


// check for readyState
if (document.readyState === 'complete') {
  console.log('모든 리소스가 로드되었습니다');
} else if (document.readyState === 'interactive') {
  console.log('페이지가 구성되었습니다');
} else {
  window.addEventListener("DOMContentLoaded", () => {
    console.log('페이지가 구성되었습니다');
  });

  window.addEventListener("load", () => {
    console.log('모든 리소스가 로드되었습니다');
  });
}