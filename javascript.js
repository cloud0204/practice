// 控制FAQ的+-號
function togglebtn(number) {
    // var btn=document.getElementById("btn-"+number);
    // if (btn.style.maxHeight) {
    //     btn.style.maxHeight = null;
    //   } else {
    //     btn.style.maxHeight = btn.scrollHeight + "px";
    //   } 
    // btn.classList.toggle("hide");
    var change = document.getElementById("change-" + number);
    // if(change.innerHTML=="+")change.innerHTML="-";
    // else change.innerHTML="";

    // if(change.classList.contains("fa-plus")){
    // change.classList.remove("fa-plus");
    // change.classList.add("fa-minus");
    change.classList.toggle("fa-plus");
    change.classList.toggle("fa-minus");
}
//控制計數器
// var see = document.getElementById("number");
// see.addEventListener("mouseenter", myFunction);
// 滾動觸發計數
const major = [".navbar", ".banner", ".home", ".about", ".counter", ".FAQ", ".price", ".gallery", ".blog", ".form", ".footer"];
var y = [];
var sum = 0;
var position = [];
var selector = [];
for (let i = 0; i < major.length; i++) {
    selector[i] = document.querySelector(major[i]);
    // position[i]=0;
    if (selector[i]) {
        y[i] = selector[i].clientHeight;
        sum += y[i];
        position[i] = sum;

    }
    else {

        position[i] = position[i - 1];
    }

}
window.onload = jump;
// 觸發高度
function jump() {
    for (let i = 0; i < major.length; i++) {
        if (window.scrollY > position[i - 1] - screen.height) {
            if (selector[i] !== null) {
                selector[i].classList.add("show");

            };
            if (selector[i] && major[i] === ".counter") aaa();
        }

    }
}
//     let jumpheight = position[0] + position[1] + position[2];//觸發高度
//     document.querySelector(".counter").classList.add("show");
//     if (window.scrollY > position[2]) aaa();
// }
window.addEventListener('scroll', jump);
// 累加
var counter = document.getElementsByClassName("number");
var a = [];
var af = [];
for (var i = 0; i < counter.length; i++) {
    a[i] = 0;
    af[i] = [counter[i].dataset.number];
    // console.log("kkkkkk" + af[i]);
}
var speed = 0;

function aaa() {
    for (var i = 0; i < counter.length; i++) {
        // console.log("kkkkkk" + i);
        bbb(i);
    }
}
function bbb(i) {
    if (af[i] <= 1000) speed = 1000;
    if (af[i] > 1000) speed = 100;
    var set = setTimeout(`bbb(${i})`, speed);
    counter[i].innerHTML = a[i];
    if (a[i] == af[i]) return;
    // console.log("pppp"+i);
    if (a[i] == af[i]) { clearTimeout(set) };
    a[i] += 1;
}
// play youtube 
$(document).ready(function () {
    $('.play').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});
// gallery圖庫
$(document).ready(function () {
    $('.gallery-box').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by google</small>';
            }
        }
    });
});
// nav的toggle
function move() {
    var body = document.getElementsByTagName("body");
    if (body[0].style.width == "80%") {
        body[0].removeAttribute("style", "width:100%;position:relative;left:0;");
    }
    else {
        body[0].setAttribute("style", "width:80%;position:relative;left:20%;");
    }
    // body.style.color = "blue";
    // alert(body.clientHeight);
    // alert("5454645445");
    // console.log("543453544");
}    