'use strict';

// **
// * 360px以下、1401px以上のデバイスはviewportの書き換えで対応
// *

!(function () {
  // metaタグの内、name属性が"viewport"である要素を取得する
  const viewport = document.querySelector('meta[name="viewport"]');

  // viewportのwidthを変更するための関数を定義する
  function switchViewport() {
    // ブラウザウィンドウの外側の幅を取得する
    const width = window.outerWidth;

    // 幅が360px以下の場合、'width=360'
    // 幅が1400pxより大きい場合、'width=1400'
    // それ以外の場合、'width=device-width,initial-scale=1'を設定する
    const value = width <= 360 ? 'width=360' : width > 1400 ? 'width=1400' : 'width=device-width,initial-scale=1';

    // viewportのcontent属性がvalueと異なる時のみ更新する
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }

  //リサイズイベントを監視し、switchViewport関数を呼び出す
  addEventListener('resize', switchViewport, false);
  switchViewport(); // 初期化
})();

// **
// * Internet Explorer判定
// *

!(function () {
  const browser = window.navigator.userAgent.toLowerCase();
  const root = document.documentElement;
  // IEからアクセスされた場合、html要素に`class="ua-ie"`を付与する
  if (browser.indexOf('msie') > 0 || browser.indexOf('trident') > 0) {
    root.classList.add('ua-ie');
  }
})();

// **
// * ヒーローヘッダーを画面の高さいっぱいに表示
// *

const heroHeaderHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// ブラウザリサイズ時も発動する
window.addEventListener('resize', heroHeaderHeight);
heroHeaderHeight(); // 初期化

// **
// * headerとfooterの高さを取得し、main要素の高さも算出する
// *

const resizeHeroHeight = () => {
  // headerとfooterの要素のそれぞれの高さを取得する
  const { offsetHeight: headerHeight } = document.querySelector('header');
  const { offsetHeight: footerHeight } = document.querySelector('footer');

  // 取得したそれぞれの高さをCSS変数に反映する
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
};

window.addEventListener('resize', resizeHeroHeight);
resizeHeroHeight(); // 初期化

// **
// * 現在の西暦を取得し、出力する
// *

const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// **
// * 現在の時刻を取得し、出力する
// *

// 前回の時刻を保持
let previousHour = null;
let previousMinute = null;

// 日本の現在時刻を取得
const updateTime = () => {
  const options = {};
  options.timeZone = 'Asia/Tokyo';
  options.hour12 = false;

  const date = new Date();
  let hour = date.getHours().toString().padStart(2, '0');
  let minute = date.getMinutes().toString().padStart(2, '0');

  // 時刻が変わっていない場合は更新処理を行わない
  if (hour !== previousHour || minute !== previousMinute) {
    if (hour.length === 1) {
      hour = '0' + hour;
    }
    if (minute.length === 1) {
      minute = '0' + minute;
    }

    const colon = '<span class="c-blink-animation">:</span>';

    document.getElementById('currentTime').innerHTML = hour + colon + minute;
    previousHour = hour;
    previousMinute = minute;
  }
};

updateTime();
setInterval(updateTime, 1000);

// **
// * Gradient.js
// *

import { Gradient } from 'whatamesh';

const gradient = new Gradient();
gradient.initGradient('#gradient-canvas');

// **
// * ホバー時に画像を表示する
// *

const revealLink = document.querySelectorAll('.js-reveal-link');
const revealElm = document.querySelectorAll('.js-reveal-elm');
const revealImage = document.querySelectorAll('.js-reveal-img');

function setupRevealElems(revealLink, revealElm) {
  for (let i = 0; i < revealLink.length; i++) {
    // ホバー時
    revealLink[i].addEventListener('mousemove', () => {
      revealElm[i].style.opacity = 1;
    });

    // ホバーが外れた時
    revealLink[i].addEventListener('mouseleave', () => {
      revealElm[i].style.opacity = 0;
    });

    // フォーカスした時
    revealLink[i].addEventListener('focus', () => {
      revealElm[i].style.opacity = 1;
    });

    // フォーカスが外れた時
    revealLink[i].addEventListener('blur', () => {
      revealElm[i].style.opacity = 0;
    });
  }
}

setupRevealElems(revealLink, revealElm, revealImage);

// **
// * スクロール連動アニメーション
// *

const showElem = document.querySelectorAll('.js-show-elm');

// オプションを定義する
const options = {
  root: null,
  rootMargin: '-25% 0px',
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('-show');
      observer.unobserve(entry.target);
    }
  });
}, options);

showElem.forEach((element) => {
  observer.observe(element);
});
