window.NexT||(window.NexT={}),function(){const e={};let n={};const t=t=>{const o=document.querySelector(`.next-config[data-name="${t}"]`);if(!o)return;const c=(i=o.text,JSON.parse(i||"{}"));var i;"main"===t?Object.assign(e,c):n[t]=c};t("main"),window.CONFIG=new Proxy({},{get(o,c){let i;if(c in e?i=e[c]:(c in n||t(c),i=n[c]),
// For unset override and mixable existing
c in o||"object"!=typeof i||(
// Get ready to mix.
o[c]={}),c in o){const e=o[c];
// When mixable
return"object"==typeof e&&"object"==typeof i?new Proxy({...i,...e},{set:(n,t,o)=>(n[t]=o,e[t]=o,!0)}):e}
// Only when not mixable and override hasn't been set.
return i}}),document.addEventListener("pjax:success",()=>{n={}})}();;
/* global CONFIG */
window.addEventListener("tabs:register",()=>{let{activeClass:t}=CONFIG.comments;if(CONFIG.comments.storage&&(t=localStorage.getItem("comments_active")||t),t){const e=document.querySelector(`a[href="#comment-${t}"]`);e&&e.click()}}),CONFIG.comments.storage&&window.addEventListener("tabs:click",t=>{if(!t.target.matches(".tabs-comment .tab-content .tab-pane"))return;const e=t.target.classList[1];localStorage.setItem("comments_active",e)});;
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
t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},getScript:function(e,t={},n){if("function"==typeof t)return this.getScript(e,{condition:n}).then(t);const{condition:o=!1,attributes:{id:a="",async:r=!1,defer:c=!1,crossOrigin:i="",dataset:s={},...l}={},parentNode:d=null}=t;return new Promise((t,n)=>{if(o)t();else{const o=document.createElement("script");if(a&&(o.id=a),i&&(o.crossOrigin=i),o.async=r,o.defer=c,Object.assign(o.dataset,s),Object.entries(l).forEach(([e,t])=>{o.setAttribute(e,String(t))}),o.onload=t,o.onerror=n,"object"==typeof e){const{url:t,integrity:n}=e;o.src=t,n&&(o.integrity=n,o.crossOrigin="anonymous")}else o.src=e;(d||document.head).appendChild(o)}})},loadComments:function(e,t){return t?this.loadComments(e).then(t):new Promise(t=>{const n=document.querySelector(e);if(!CONFIG.comments.lazyload||!n)return void t();new IntersectionObserver((e,n)=>{e[0].isIntersecting&&(t(),n.disconnect())}).observe(n)})}};;
/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{const e="right"===CONFIG.sidebar.position,i={};function t(){const e=document.querySelector(".footer"),i=document.querySelector(".header").offsetHeight+document.querySelector(".main").offsetHeight+e.offsetHeight;e.classList.toggle("footer-fixed",i<=window.innerHeight)}({lines:document.querySelector(".sidebar-toggle"),init:function(){window.addEventListener("mousedown",this.mousedownHandler),window.addEventListener("mouseup",this.mouseupHandler.bind(this)),document.querySelector(".sidebar-dimmer").addEventListener("click",this.clickHandler.bind(this)),document.querySelector(".sidebar-toggle").addEventListener("click",this.clickHandler.bind(this)),window.addEventListener("sidebar:show",this.showSidebar),window.addEventListener("sidebar:hide",this.hideSidebar)},mousedownHandler:function(e){i.X=e.pageX,i.Y=e.pageY},mouseupHandler:function(e){const t=e.pageX-i.X,d=e.pageY-i.Y;
// Fancybox has z-index property, but medium-zoom does not, so the sidebar will overlay the zoomed image.
(Math.hypot(t,d)<20&&e.target.matches(".main")||e.target.matches("img.medium-zoom-image"))&&this.hideSidebar()},clickHandler:function(){document.body.classList.contains("sidebar-active")?this.hideSidebar():this.showSidebar()},showSidebar:function(){document.body.classList.add("sidebar-active");const i=e?"fadeInRight":"fadeInLeft";document.querySelectorAll(".sidebar .animated").forEach((e,t)=>{e.style.animationDelay=100*t+"ms",e.classList.remove(i),setTimeout(()=>{
// Trigger a DOM reflow
e.classList.add(i)})})},hideSidebar:function(){document.body.classList.remove("sidebar-active")}}).init(),t(),window.addEventListener("resize",t),window.addEventListener("scroll",t,{passive:!0})});;
/* global NexT, CONFIG */
NexT.boot={},NexT.boot.registerEvents=function(){NexT.utils.registerScrollPercent(),NexT.utils.registerCanIUseTag(),
// Mobile top menu bar.
document.querySelector(".site-nav-toggle .toggle").addEventListener("click",e=>{e.currentTarget.classList.toggle("toggle-close");const t=document.querySelector(".site-nav");t&&(t.style.setProperty("--scroll-height",t.scrollHeight+"px"),document.body.classList.toggle("site-nav-on"))});document.querySelectorAll(".sidebar-nav li").forEach((e,t)=>{e.addEventListener("click",()=>{if(e.matches(".sidebar-toc-active .sidebar-nav-toc, .sidebar-overview-active .sidebar-nav-overview"))return;const i=document.querySelector(".sidebar-inner"),o=document.querySelector(".sidebar-panel-container"),r=["sidebar-toc-active","sidebar-overview-active"];window.anime({duration:200,targets:o,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{
// Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
i.classList.replace(r[1-t],r[t]),window.anime({duration:200,targets:o,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})})}),window.addEventListener("resize",NexT.utils.initSidebarDimension),window.addEventListener("hashchange",()=>{const e=location.hash;if(""!==e&&!e.match(/%\S{2}/)){const t=document.querySelector(`.tabs ul.nav-tabs li a[href="${e}"]`);t&&t.click()}})},NexT.boot.refresh=function(){
/**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'scripts/helpers/next-config.js' file.
   */
CONFIG.prism&&window.Prism.highlightAll(),CONFIG.fancybox&&NexT.utils.wrapImageWithFancyBox(),CONFIG.mediumzoom&&window.mediumZoom(".post-body :not(a) > img, .post-body > img",{background:"var(--content-bg-color)"}),CONFIG.lazyload&&window.lozad(".post-body img").observe(),CONFIG.pangu&&window.pangu.spacingPage(),CONFIG.exturl&&NexT.utils.registerExtURL(),NexT.utils.registerCopyCode(),NexT.utils.registerTabsTag(),NexT.utils.registerActiveMenuItem(),NexT.utils.registerLangSelect(),NexT.utils.registerSidebarTOC(),NexT.utils.registerPostReward(),NexT.utils.wrapTableWithBox(),NexT.utils.registerVideoIframe()},NexT.boot.motion=function(){
// Define Motion Sequence & Bootstrap Motion.
CONFIG.motion.enable&&NexT.motion.integrator.add(NexT.motion.middleWares.header).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar).add(NexT.motion.middleWares.footer).bootstrap(),NexT.utils.updateSidebarPosition()},document.addEventListener("DOMContentLoaded",()=>{NexT.boot.registerEvents(),NexT.boot.refresh(),NexT.boot.motion()});;
/* global NexT, CONFIG, Pjax */
const pjax=new Pjax({selectors:["head title",'script[type="application/json"]',".main-inner",".post-toc-wrap",".languages",".pjax"],analytics:!1,cacheBust:!1,scrollTo:!CONFIG.bookmark.enable});document.addEventListener("pjax:success",()=>{pjax.executeScripts(document.querySelectorAll("script[data-pjax]")),NexT.boot.refresh(),
// Define Motion Sequence & Bootstrap Motion.
CONFIG.motion.enable&&NexT.motion.integrator.init().add(NexT.motion.middleWares.subMenu).add(NexT.motion.middleWares.postList).bootstrap();const e=document.querySelector(".post-toc");document.querySelector(".sidebar-inner").classList.toggle("sidebar-nav-active",e),document.querySelector(e?".sidebar-nav-toc":".sidebar-nav-overview").click(),NexT.utils.updateSidebarPosition()});;
/* global CONFIG, pjax */
document.addEventListener("DOMContentLoaded",()=>{if(!CONFIG.path)
// Search DB path
return void console.warn("`hexo-generator-searchdb` plugin is not installed!");
// Popup Window
let e,t=!1;const n=document.querySelector(".search-input"),r=(e,t,n=!1)=>{const r=[],o=new Set;return e.forEach(e=>{if(CONFIG.localsearch.unescape){const t=document.createElement("div");t.innerText=e,e=t.innerHTML}const s=e.length;if(0===s)return;let c=0,l=-1;for(n||(t=t.toLowerCase(),e=e.toLowerCase());(l=t.indexOf(e,c))>-1;)r.push({position:l,word:e}),o.add(e),c=l+s}),
// Sort index by position of keyword
r.sort((e,t)=>e.position!==t.position?e.position-t.position:t.word.length-e.word.length),[r,o]},o=(e,t,n)=>{let r=n[0],{position:o,word:s}=r;const c=[],l=new Set;for(;o+s.length<=t&&0!==n.length;){l.add(s),c.push({position:o,length:s.length});const e=o+s.length;
// Move to next position of hit
for(n.shift();0!==n.length&&(r=n[0],o=r.position,s=r.word,e>o);)n.shift()}return{hits:c,start:e,end:t,count:l.size}},s=(e,t)=>{let n="",r=t.start;for(const{position:o,length:s}of t.hits)n+=e.substring(r,o),r=o+s,n+=`<mark class="search-keyword">${e.substr(o,s)}</mark>`;return n+=e.substring(r,t.end),n},c=()=>{if(!t)return;const c=n.value.trim().toLowerCase(),l=c.split(/[-\s]+/),i=document.querySelector(".search-result-container");let a=[];if(c.length>0&&(
// Perform local searching
a=(t=>{const n=[];return e.forEach(({title:e,content:c,url:l})=>{
// The number of different keywords included in the article.
const[i,a]=r(t,e),[h,u]=r(t,c),d=new Set([...a,...u]).size,p=i.length+h.length;if(0===p)return;const g=[];0!==i.length&&g.push(o(0,e.length,i));let f=[];for(;0!==h.length;){const e=h[0],{position:t}=e,n=Math.max(0,t-20),r=Math.min(c.length,t+80);f.push(o(n,r,h))}
// Sort slices in content by included keywords' count and hits' count
f.sort((e,t)=>e.count!==t.count?t.count-e.count:e.hits.length!==t.hits.length?t.hits.length-e.hits.length:e.start-t.start);
// Select top N slices in content
const m=parseInt(CONFIG.localsearch.top_n_per_article,10);m>=0&&(f=f.slice(0,m));let C="";(l=new URL(l,location.origin)).searchParams.append("highlight",t.join(" ")),0!==g.length?C+=`<li><a href="${l.href}" class="search-result-title">${s(e,g[0])}</a>`:C+=`<li><a href="${l.href}" class="search-result-title">${e}</a>`,f.forEach(e=>{C+=`<a href="${l.href}"><p class="search-result">${s(c,e)}...</p></a>`}),C+="</li>",n.push({item:C,id:n.length,hitCount:p,includedCount:d})}),n})(l)),1===l.length&&""===l[0])i.classList.add("no-result"),i.innerHTML='<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>';else if(0===a.length)i.classList.add("no-result"),i.innerHTML='<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';else{a.sort((e,t)=>e.includedCount!==t.includedCount?t.includedCount-e.includedCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id);const e=CONFIG.i18n.hits.replace(/\$\{hits}/,a.length);i.classList.remove("no-result"),i.innerHTML=`<div class="search-stats">${e}</div>\n        <hr>\n        <ul class="search-result-list">${a.map(e=>e.item).join("")}</ul>`,"object"==typeof pjax&&pjax.refresh(i)}},l=()=>{const n=!CONFIG.path.endsWith("json");fetch(CONFIG.path).then(e=>e.text()).then(r=>{
// Get the contents from search data
t=!0,e=n?[...(new DOMParser).parseFromString(r,"text/xml").querySelectorAll("entry")].map(e=>({title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent})):JSON.parse(r),
// Only match articles with non-empty titles
e=e.filter(e=>e.title).map(e=>(e.title=e.title.trim(),e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"",e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),e)),
// Remove loading animation
c()})},i=()=>{const e=new URL(location.href).searchParams.get("highlight"),t=e?e.split(" "):[],n=document.querySelector(".post-body");if(!t.length||!n)return;const s=document.createTreeWalker(n,NodeFilter.SHOW_TEXT,null),c=[];for(;s.nextNode();)s.currentNode.parentNode.matches("button, select, textarea")||c.push(s.currentNode);c.forEach(e=>{const[n]=r(t,e.nodeValue);if(!n.length)return;((e,t,n)=>{const r=e.nodeValue;let o=t.start;const s=[];for(const{position:e,length:c}of t.hits){const t=document.createTextNode(r.substring(o,e));o=e+c;const l=document.createElement("mark");l.className=n,l.appendChild(document.createTextNode(r.substr(e,c))),s.push(t,l)}e.nodeValue=r.substring(o,t.end),s.forEach(t=>{e.parentNode.insertBefore(t,e)})})(e,o(0,e.nodeValue.length,n),"search-keyword")})};i(),CONFIG.localsearch.preload&&l(),"auto"===CONFIG.localsearch.trigger?n.addEventListener("input",c):(document.querySelector(".search-icon").addEventListener("click",c),n.addEventListener("keypress",e=>{"Enter"===e.key&&c()})),
// Handle and trigger popup window
document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.classList.add("search-active"),
// Wait for search-popup animation to complete
setTimeout(()=>n.focus(),500),t||l()})});
// Monitor main search box
const a=()=>{document.body.classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{e.target===document.querySelector(".search-pop-overlay")&&a()}),document.querySelector(".popup-btn-close").addEventListener("click",a),document.addEventListener("pjax:success",()=>{i(),a()}),window.addEventListener("keyup",e=>{"Escape"===e.key&&a()})});;
/* global NexT, CONFIG, mermaid */
document.addEventListener("page:loaded",()=>{const e=document.querySelectorAll(".mermaid");e.length&&NexT.utils.getScript(CONFIG.mermaid.js,{condition:window.mermaid}).then(()=>{e.forEach(e=>{const t=document.createElement("div");t.innerHTML=e.innerHTML,t.className=e.className,e.parentNode.replaceChild(t,e)}),mermaid.init({theme:CONFIG.mermaid.theme,logLevel:3,flowchart:{curve:"linear"},gantt:{axisFormat:"%m/%d/%Y"},sequence:{actorMargin:50}},".mermaid")})});