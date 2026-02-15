/* global NexT, CONFIG */
HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},
// https://caniuse.com/mdn-api_element_classlist_replace
"function"!=typeof DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=function(e,t){this.remove(e),this.add(t)}),function(){const e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:!0}));"loading"===document.readyState?document.addEventListener("readystatechange",e,{once:!0}):e(),document.addEventListener("pjax:success",e)}(),NexT.utils={
/**
   * Wrap images with fancybox.
   */
wrapImageWithFancyBox:function(){document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach(e=>{const t=$(e),n=t.attr("data-src")||t.attr("src"),o=t.wrap(`<a class="fancybox fancybox.image" href="${n}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?o.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?o.attr("data-fancybox","group").attr("rel","group"):o.attr("data-fancybox","default").attr("rel","default");const a=t.attr("title")||t.attr("alt");a&&(o.append(`<p class="image-caption">${a}</p>`),
// Make sure img title tag will show correctly in fancybox
o.attr("title",a).attr("data-caption",a))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},
/**
   * One-click copy code support.
   */
registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");0===e.length&&(e=document.querySelectorAll("pre:not(.mermaid)")),e.forEach(e=>{if(e.querySelectorAll(".code .line span").forEach(e=>{e.classList.forEach(t=>{e.classList.replace(t,"hljs-"+t)})}),!CONFIG.copycode)return;e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const t=e.querySelector(".copy-btn");t.addEventListener("click",()=>{const n=(e.querySelector(".code")||e.querySelector("code")).innerText;if(navigator.clipboard)
// https://caniuse.com/mdn-api_clipboard_writetext
navigator.clipboard.writeText(n).then(()=>{t.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{t.querySelector("i").className="fa fa-times-circle fa-fw"});else{const e=document.createElement("textarea");e.style.top=window.scrollY+"px",// Prevent page scrolling
e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=n,document.body.append(e),e.select(),e.setSelectionRange(0,n.length),e.readOnly=!1;const o=document.execCommand("copy");t.querySelector("i").className=o?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),// For iOS
t.blur(),document.body.removeChild(e)}}),e.addEventListener("mouseleave",()=>{setTimeout(()=>{t.querySelector("i").className="fa fa-copy fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);const n=Number(e.width),o=Number(e.height);n&&o&&(t.style.paddingTop=o/n*100+"%")}})},registerScrollPercent:function(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");
// For init back to top in sidebar if page was scrolled after page refresh.
window.addEventListener("scroll",()=>{if(e||t){const n=document.body.scrollHeight-window.innerHeight,o=n>0?Math.min(100*window.scrollY/n,100):0;e&&(e.classList.toggle("back-to-top-on",Math.round(o)>=5),e.querySelector("span").innerText=Math.round(o)+"%"),t&&t.style.setProperty("--progress",o.toFixed(2)+"%")}if(!Array.isArray(NexT.utils.sections))return;let n=NexT.utils.sections.findIndex(e=>e&&e.getBoundingClientRect().top>10);-1===n?n=NexT.utils.sections.length-1:n>0&&n--,this.activateNavByIndex(n)},{passive:!0}),e&&e.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},
/**
   * Tabs tag listener (without twitter bootstrap).
   */
registerTabsTag:function(){
// Binding `nav-tabs` & `tab-content` by real time permalink changing.
document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",t=>{
// Prevent selected tab to select again.
if(t.preventDefault(),e.classList.contains("active"))return;
// Add & Remove active class on `nav-tabs` & `tab-content`.
[...e.parentNode.children].forEach(t=>{t.classList.toggle("active",t===e)});
// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
const n=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));[...n.parentNode.children].forEach(e=>{e.classList.toggle("active",e===n)}),
// Trigger event
n.dispatchEvent(new Event("tabs:click",{bubbles:!0}))})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){
// Get responsive height passed from iframe.
window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],n=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(n,10)+5+"px"}},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),
// Disable Pjax to force refresh translation of menu item
window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map(e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));
// TOC item animation navigate.
return e.addEventListener("click",n=>{n.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o,complete:()=>{history.pushState(null,document.title,e.href)}})}),t})},registerPostReward:function(){const e=document.querySelector(".reward-container button");e&&e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(!t||t.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),t.classList.add("active","active-current");let n=t.parentNode;for(;!n.matches(".post-toc");)n.matches("li")&&n.classList.add("active"),n=n.parentNode;
// Scrolling to center active TOC element if TOC content is taller then viewport.
const o=document.querySelector(".sidebar-panel-container");window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+t.getBoundingClientRect().top-o.getBoundingClientRect().top})},
/**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
initSidebarDimension:function(){const e=document.querySelector(".sidebar-nav"),t=document.querySelector(".sidebar-inner .back-to-top"),n=e?e.offsetHeight:0,o=t?t.offsetHeight:0,a=CONFIG.sidebar.offset||12;let r=2*CONFIG.sidebar.padding+n+o;"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(r+=2*a);
// Initialize Sidebar & TOC Height.
const c=document.body.offsetHeight-r+"px";document.documentElement.style.setProperty("--sidebar-wrapper-height",c)},updateSidebarPosition:function(){if(NexT.utils.initSidebarDimension(),window.innerWidth<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;
// Expand sidebar on post detail page by default, when post has a toc.
const e=document.querySelector(".post-toc");let t=CONFIG.page.sidebar;"boolean"!=typeof t&&(
// There's no definition sidebar in the page front-matter.
t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},getScript:function(e,t={},n){if("function"==typeof t)return this.getScript(e,{condition:n}).then(t);const{condition:o=!1,attributes:{id:a="",async:r=!1,defer:c=!1,crossOrigin:i="",dataset:s={},...l}={},parentNode:d=null}=t;return new Promise((t,n)=>{if(o)t();else{const o=document.createElement("script");if(a&&(o.id=a),i&&(o.crossOrigin=i),o.async=r,o.defer=c,Object.assign(o.dataset,s),Object.entries(l).forEach(([e,t])=>{o.setAttribute(e,String(t))}),o.onload=t,o.onerror=n,"object"==typeof e){const{url:t,integrity:n}=e;o.src=t,n&&(o.integrity=n,o.crossOrigin="anonymous")}else o.src=e;(d||document.head).appendChild(o)}})},loadComments:function(e,t){return t?this.loadComments(e).then(t):new Promise(t=>{const n=document.querySelector(e);if(!CONFIG.comments.lazyload||!n)return void t();new IntersectionObserver((e,n)=>{e[0].isIntersecting&&(t(),n.disconnect())}).observe(n)})}};