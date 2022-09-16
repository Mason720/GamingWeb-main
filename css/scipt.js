const nav = document.querySelector('#main'); //選擇選單
let topOfNav = nav.offsetTop; //選單的最頂部

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav'); //滑到超過選單頂部後，新增一個屬性到body，再到CSS設定相關
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', fixNav);
