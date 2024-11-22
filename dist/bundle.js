// Hello and God bless! Christ is King! https://github.com/i1li/i
const isMobile=window.matchMedia("(orientation: portrait)").matches||window.innerHeight>window.innerWidth||/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|kindle|playbook|silk|mobile|tablet|samsung|lg|htc|nokia|motorola|symbian|fennec|maemo|tizen|blazer|series60|ucbrowser|bada|micromessenger|webview/.test(navigator.userAgent.toLowerCase());if(!isMobile){let a=function(n,t=.85,e=1.15){if(Math.random()<.333){const r=Math.random()*(e-t)+t;return Math.round(n*r)}return Math.round(n)},i=function(n,t,e,r=1){return a(Math.random()*(e-t)+t)*r},g=function(n){return i(n,-3,3)},d=function(n){return i(n,3,15)},o=function(n){return i(n,87,185)},s=function(n){return i(n,.6,1)},h=function(n){return n?7*Math.ceil(Math.random()*3):a(Math.ceil(Math.random()*5)+2)},H=function(n,t){return n*t},l=function(n){const t=d(n);return{hueIncrement:g(n),intervalCount:0,intervalsTillNextChange:t,transitionProgress:0,transitionDuration:n?t*f:0,currentHueStep:h(n),currentContrast:100,currentBrightness:100,currentSaturation:100,currentOpacity:.75,targetHueStep:h(n),targetContrast:o(n),targetBrightness:o(n),targetSaturation:o(n),targetOpacity:s(n),hueShift:0}},B=function(n){return n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2},p=function(n,t,e=!1){const r=n.offsetWidth||n.clientWidth,m=n.offsetHeight||n.clientHeight,q=Math.sqrt(r*r+m*m)/(Math.max(r,m)*Math.sqrt(2))*100;let I=[];const P=t.currentHueStep,$=360/P;for(let u=0;u<P;u++){const T=u*$,A=50+50*Math.cos(T*Math.PI/180),D=50+50*Math.sin(T*Math.PI/180),y=e?u+t.currentHueStep:u;I.push(`radial-gradient(ellipse farthest-corner at ${A}% ${D}%, hsl(${H(y,$)}, 100%, 50%), transparent ${q}%)`)}n.style.backgroundImage=I.join(", "),n.style.opacity=t.currentOpacity,n.style.filter=`contrast(${t.currentContrast}%) brightness(${t.currentBrightness}%) saturate(${t.currentSaturation}%) hue-rotate(${t.hueShift}deg)`},M=function(n){const t=n-S;b+=t,C(w,!1,t),C(x,!0,t),p(E,w),p(N,x,!0),S=n,requestAnimationFrame(M)},C=function(n,t,e){n.intervalCount+=e,n.transitionProgress+=e/n.transitionDuration*(.2+Math.random()*.5),n.transitionProgress>1&&(n.transitionProgress=1);const r=B(n.transitionProgress);t&&(n.currentHueStep+=(n.targetHueStep-n.currentHueStep)*(r*5e-4)),n.currentContrast+=(n.targetContrast-n.currentContrast)*r,n.currentBrightness+=(n.targetBrightness-n.currentBrightness)*r,n.currentSaturation+=(n.targetSaturation-n.currentSaturation)*r,n.currentOpacity+=(n.targetOpacity-n.currentOpacity)*r,n.hueShift+=n.hueIncrement*(e/1e3),n.intervalCount>=n.intervalsTillNextChange*f&&(n.intervalCount=0,n.transitionProgress=0,n.hueIncrement=g(t),n.intervalsTillNextChange=d(t),n.transitionDuration=n.intervalsTillNextChange*f,n.targetHueStep=h(t),n.targetContrast=o(t),n.targetBrightness=o(t),n.targetSaturation=o(t),n.targetOpacity=s(t))};var randomlyModifyValue=a,getRandomInRange=i,getRandomHueIncrement=g,getIntervalsTillNextChange=d,getRandomFilterValue=o,getRandomOpacityValue=s,getRandomHueStep=h,getAdjustedHue=H,createLayerState=l,easeInOutCubic=B,setGradient=p,updateColors=M,updateLayerState=C;const E=document.getElementById("box"),N=document.getElementById("overlay");let c=!document.hidden;document.addEventListener("visibilitychange",()=>{c=!document.hidden,document.hidden||(S=performance.now(),b=0)}),window.addEventListener("focus",()=>c=!0),window.addEventListener("blur",()=>c=!1);const f=250;let w=l(!1),x=l(!0),S=performance.now(),b=0;c&&requestAnimationFrame(M)}(()=>{if(window.l){const l=window.l.search.slice(1).split("&").map(e=>e.replace(/~and~/g,"&")).join("?"),n=window.l.origin+window.l.pathname.slice(0,-1)+l+window.l.hash;window.history.replaceState(null,null,n),delete window.l}})();function shuffle(e,t=1/0){if(e.length===1)return e;if(e.length<Math.min(t*2,e.length)){const n=[],l=new Set;for(;l.size<Math.min(t,e.length);){const o=Math.floor(Math.random()*e.length);l.add(o)}for(const o of l)n.push(e[o]);return n}else{for(let n=e.length-1;n>0;n--){const l=Math.floor(Math.random()*(n+1));[e[n],e[l]]=[e[l],e[n]]}return e.slice(0,Math.min(t,e.length))}}const shuffleDiv=document.getElementById("shuffle"),elements=[...shuffleDiv.querySelectorAll("y-t")];let combinedElements=[],elementIdsMap=new Map;function processAndCombine(e,t){if(processedElements.has(t))return;const n=e.getAttribute("v");let l;elementIdsMap.has(t)?l=elementIdsMap.get(t):(l=n.split(","),elementIdsMap.set(t,l)),shuffle(l,3).forEach(s=>combinedElements.push(s.split("?")[0]));const c=shuffle(l,150);if(e.setAttribute("v",c.join(",")),processedElements.add(t),t<elements.length-1)processAndCombine(elements[t+1],t+1);else{const d=document.getElementById("combined-list").querySelector("y-t"),i=[...new Set(combinedElements)],m=shuffle(i,150);d.setAttribute("v",m.join(","))}}let processedElements=new Set;processAndCombine(elements[0],0);function shuffleAndDraw(){shuffle(elements);let e=0,t=document.getElementById("draw");const n=elements[e].cloneNode(!1);processAndCombine(n,e),t.appendChild(n),document.querySelector("#next").addEventListener("click",function(){e=(e+1)%elements.length,t.innerHTML="";const o=elements[e].cloneNode(!1);processAndCombine(o,e),t.appendChild(o)})}shuffleAndDraw();class YTEmbed extends HTMLElement{constructor(){super();const t=this.getAttribute("v"),[i,o]=t.split("?");this.id=i,this.params=o;const s=this.id.split(",");this.videoIds=s;let e,n;switch(this.throttledCheckViewport=this.checkViewport.bind(this),this.throttledCheckViewport=throttle(this.throttledCheckViewport,500),!0){default:this.classList.contains("no-link-embed")?(e=`https://www.youtube.com/watch?v=${this.id}${this.params?"&"+this.params+"&":"&"}autoplay=1`,n=`https://www.youtube-nocookie.com/embed/${this.id}${this.params?"?"+this.params+"&":"?"}autoplay=1`):this.classList.contains("no-embed")?e=`https://www.youtube.com/watch?v=${this.id}${this.params?"&"+this.params+"&":"&"}autoplay=1`:(e=`https://www.youtube-nocookie.com/embed/${this.id}${this.params?"?"+this.params+"&":"?"}autoplay=1`,n=e);break;case this.videoIds.length>1:this.classList.contains("no-link-embed")?(e=`https://www.youtube.com/watch_videos?video_ids=${this.videoIds.join(",")}&autoplay=1`,n=`https://www.youtube-nocookie.com/embed/?playlist=${this.videoIds.join(",")}&autoplay=1`):this.classList.contains("no-embed")?e=`https://www.youtube.com/watch_videos?video_ids=${this.videoIds.join(",")}&autoplay=1`:(e=`https://www.youtube-nocookie.com/embed/?playlist=${this.videoIds.join(",")}&autoplay=1`,n=e);break;case(this.id.length>11&&(this.id.startsWith("PL")||this.id.startsWith("TL")||this.id.startsWith("OL")||this.id.startsWith("FL")||this.id.startsWith("UU"))):this.classList.contains("no-link-embed")?(e=`https://www.youtube.com/playlist?list=${this.id}&autoplay=1`,n=`https://www.youtube-nocookie.com/embed/videoseries?list=${this.id}&autoplay=1`):this.classList.contains("no-embed")?e=`https://www.youtube.com/playlist?list=${this.id}&autoplay=1`:(e=`https://www.youtube-nocookie.com/embed/videoseries?list=${this.id}&autoplay=1`,n=e);break}this.linkUrl=e,this.embedUrl=n,this.link=document.createElement("a"),this.link.textContent=this.getAttribute("t")||"View Video",this.link.title="View video in new tab",this.link.href=this.linkUrl,this.button=document.createElement("button"),this.button.textContent="\u25B6\uFE0F Play",this.button.title="Play Video",this.button.className="showHideButton",this.classList.contains("no-embed")?(this.button.onclick=()=>window.open(this.linkUrl),this.appendChild(this.button),this.appendChild(this.link)):(this.button.onclick=()=>this.toggleVideo(),this.wrapper=document.createElement("div"),this.wrapper.className="yt-wrapper",this.appendChild(this.button),this.appendChild(this.link),this.appendChild(this.wrapper))}toggleVideo(){const t=this.wrapper.querySelector("iframe");if(t)this.wrapper.removeChild(t),this.wrapper.style.display="none",this.button.textContent="\u25B6\uFE0F Play",this.button.title="Play Video",this.removeAttribute("data-now-playing"),this.removeAttribute("data-video-path"),this.removeRemoteControl();else{this.closeOtherVideos();const i=document.createElement("iframe");i.src=this.embedUrl,i.allowFullscreen=!0,i.className="yt",this.wrapper.appendChild(i),this.wrapper.style.display="block",this.button.textContent="\u23F9\uFE0F Stop",this.button.title="Stop Video",this.setAttribute("data-now-playing","true");const o=this.closest("article"),s=this.closest("section");let e="/";o&&(e+=o.id,s&&(e+=`/${s.id}`)),this.setAttribute("data-video-path",e),this.createRemoteControl(),this.setupViewportCheck()}}closeOtherVideos(){document.querySelectorAll("y-t[data-now-playing]").forEach(i=>{if(i!==this){const o=i.querySelector("button.showHideButton");if(o&&o.textContent==="\u23F9\uFE0F Stop"){i.removeAttribute("data-now-playing"),i.removeAttribute("data-video-path");const s=i.querySelector(".yt-wrapper");if(s){const e=s.querySelector("iframe");e&&s.removeChild(e),s.style.display="none"}o.textContent="\u25B6\uFE0F Play",o.title="Play Video"}}})}createRemoteControl(){let t=document.getElementById("remote-control");if(!t){t=document.createElement("div"),t.id="remote-control",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t);const s=document.createElement("div");s.id="now-playing-text",s.innerHTML="\u{1F50A}Now<br>Playing:",s.style.opacity="0",s.style.pointerEvents="none",document.body.appendChild(s);const e=document.createElement("img");e.src="/yt/expand-icon.png",e.alt="Expand Remote Control",e.id="expand-icon",e.style.opacity="0",e.style.pointerEvents="none",document.body.appendChild(e);const n=()=>{t.style.opacity="0.7",t.style.pointerEvents="auto",e.style.opacity="0",e.style.pointerEvents="none",s.style.opacity="0",s.style.pointerEvents="none"};e.onclick=n,e.onmouseenter=n,t.onmouseleave=()=>{this.isOutOfViewport()&&(t.style.opacity="0",t.style.pointerEvents="none",e.style.opacity="0.2",e.style.pointerEvents="auto",s.style.opacity="0.55",s.style.pointerEvents="auto")}}t.innerHTML="";const i=this.button.cloneNode(!0);i.style="",i.onclick=()=>this.toggleVideo();const o=document.createElement("a");o.textContent="Go to video",o.style.marginTop="10px",o.onclick=s=>{s.preventDefault(),this.navigateToNowPlaying()},this.updateNowPlayingLink(o),t.appendChild(i),t.appendChild(o),this.checkViewport()}checkViewport(){const t=document.getElementById("remote-control"),i=document.getElementById("expand-icon"),o=document.getElementById("now-playing-text");this.isOutOfViewport()?(t&&(t.style.opacity="0",t.style.pointerEvents="none"),i&&(i.style.opacity="0.2",i.style.pointerEvents="auto"),o&&(o.style.opacity="0.55",o.style.pointerEvents="auto")):(t&&(t.style.opacity="0",t.style.pointerEvents="none"),i&&(i.style.opacity="0",i.style.pointerEvents="none"),o&&(o.style.opacity="0",o.style.pointerEvents="none"))}setupViewportCheck(){["scroll","touchmove","resize"].forEach(t=>window.addEventListener(t,this.throttledCheckViewport)),this.checkViewport()}isOutOfViewport(){const t=this.getBoundingClientRect();return t.bottom<=0||t.right<=0||t.left>=window.innerWidth||t.top>=window.innerHeight}updateNowPlayingLink(t){const i=this.getAttribute("data-video-path");i&&(t.href=`${i}#now-playing`)}navigateToNowPlaying(){const t=document.querySelector("y-t[data-now-playing]");if(t){const i=t.getAttribute("data-video-path");i&&(navigate(i.substring(1)),setTimeout(()=>{const o=t.getBoundingClientRect().top+window.pageYOffset-window.innerHeight*.1;window.scrollTo({top:o,behavior:"smooth"})},100))}}removeEventListeners(){["scroll","touchmove","resize"].forEach(t=>window.removeEventListener(t,this.throttledCheckViewport))}removeRemoteControl(){const t=document.getElementById("remote-control");t&&document.body.removeChild(t);const i=document.getElementById("expand-icon");i&&document.body.removeChild(i);const o=document.getElementById("now-playing-text");o&&document.body.removeChild(o),this.removeEventListeners()}}customElements.define("y-t",YTEmbed);function throttle(a,t){let i,o;return function(){const s=this,e=arguments;o?(clearTimeout(i),i=setTimeout(function(){Date.now()-o>=t&&(a.apply(s,e),o=Date.now())},Math.max(0,t-(Date.now()-o)))):(a.apply(s,e),o=Date.now())}}function applyDarkMode(e){document.body.classList.toggle("dark-mode",e),document.querySelectorAll("a, .article-content, .article-content-wrapper, #bg-wrapper, #draw").forEach(t=>{t.classList.toggle("dark-mode",e)})}function toggleDarkMode(){darkMode=!darkMode,applyDarkMode(darkMode),localStorage.setItem("darkMode",darkMode)}let darkMode;const userPrefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,userPrefersLight=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches,savedMode=localStorage.getItem("darkMode");savedMode!==null?darkMode=savedMode==="true":userPrefersDark?darkMode=!0:userPrefersLight?darkMode=!1:darkMode=!0,applyDarkMode(darkMode);const modeToggle=document.getElementById("mode-toggle");modeToggle.addEventListener("click",toggleDarkMode);function adjustZoom(o){const n=o?1.05:.95;document.querySelectorAll("html").forEach(function(e){let t=parseFloat(window.getComputedStyle(e).fontSize);t=t*n,e.style.fontSize=t+"px"});const c=parseFloat(window.getComputedStyle(document.documentElement).fontSize);localStorage.setItem("baseFontSize",c)}const savedFontSize=localStorage.getItem("baseFontSize");savedFontSize&&(document.documentElement.style.fontSize=savedFontSize+"px"),document.getElementById("zoom-in").addEventListener("click",function(){adjustZoom(!0)}),document.getElementById("zoom-out").addEventListener("click",function(){adjustZoom(!1)});const scrollTransition=50,header=document.querySelector("header"),toTop=document.getElementById("toTop");function goToTop(){window.scrollTo(0,0)}function handleScroll(){window.scrollY>50?header.classList.add("scrolled-down"):header.classList.remove("scrolled-down"),document.body.scrollTop>50*7||document.documentElement.scrollTop>50*7?(toTop.style.opacity="0.4",toTop.style.pointerEvents="auto"):(toTop.style.opacity="0",toTop.style.pointerEvents="none")}function updateURLOnScroll(){const e=document.querySelectorAll("article");let o,n;if(e.forEach(t=>{const c=t.getBoundingClientRect();if(c.top<=window.innerHeight/2&&c.bottom>=window.innerHeight/2){o=t;const i=t.querySelectorAll(".section-title");for(let l=i.length-1;l>=0;l--){const s=i[l];if(s.getBoundingClientRect().top<=window.innerHeight/2){n=s;break}}}}),o){let t=o.id;n&&(t+=`/${n.id}`),t!==lastUpdatedPath&&(history.replaceState(null,"",`/${t}`),lastUpdatedPath=t)}}["scroll","touchmove","resize"].forEach(e=>window.addEventListener(e,throttle(()=>{updateURLOnScroll(),handleScroll()},500)));let isInitialLoad=!0,lastUpdatedPath="";const path=window.location.pathname.substring(1),hash=window.location.hash.substring(1),articles=document.querySelectorAll("article"),welcome=document.getElementById("welcome"),observer=new IntersectionObserver(function(t,o){t.forEach(function(e){e.isIntersecting&&(e.target.querySelector(".article-content").style.display="block",o.unobserve(e.target))})});if(articles.forEach(function(t){observer.observe(t),t.querySelector(".article-content").style.display="none"}),path){const[t,o]=path.split("/");t&&document.getElementById(t)?showSingleArticle(t,o):showAllArticles()}else hash?handleHashNavigation(hash):showAllArticles();window.onpopstate=function(t){t.state&&t.state.articleId?showSingleArticle(t.state.articleId,t.state.sectionId):showAllArticles()};function showSingleArticle(t,o){articles.forEach(function(e){if(e.id===t){welcome.style.display="none",e.style.display="block";const l=e.querySelector(".article-content");l&&(l.style.display="block");const s=e.querySelector(".article-nav");if(s){let i=e.querySelector(".article-nav-bottom");i||(i=s.cloneNode(!0),i.classList.add("article-nav-bottom"),e.appendChild(i))}if(o){const i=e.querySelector(`.section-title#${o}`);i&&navigateToElement(i,!0)}else navigateToElement(e,!1);let n=`/${t}`;o&&(n+=`/${o}`),history.replaceState({articleId:t,sectionId:o},"",n)}else e.style.display="none"})}function showAllArticles(){articles.forEach(function(t,o){t.style.display="block",o!==0&&(t.querySelector(".article-content").style.display="none"),observer.observe(t);const e=t.querySelector(".article-nav-bottom");e&&e.remove()}),welcome.style.display="block",header.classList.remove("scrolled-down"),goToTop()}function navigateToElement(t,o=!1){if(o&&isInitialLoad)t.closest("article").scrollIntoView({block:"center"}),setTimeout(()=>{let l=t.getBoundingClientRect().top+window.scrollY;setTimeout(()=>{l=(t.getBoundingClientRect().top+t.getBoundingClientRect().bottom)/2+window.scrollY-window.innerHeight*.15,window.scrollBy({top:l-window.scrollY}),isInitialLoad=!1},200)},200);else if(isInitialLoad){let e=t.getBoundingClientRect().top+window.scrollY-window.innerHeight*.1;window.scrollTo({top:e}),isInitialLoad=!1}else{let e=t.getBoundingClientRect().top+window.scrollY-window.innerHeight*.2;window.scrollTo({top:e})}}function navigate(t){if(t.startsWith("#"))handleHashNavigation(t.substring(1));else{const[o,e]=t.split("/");o?showSingleArticle(o,e):(showAllArticles(),history.replaceState({},"",window.location.origin))}}function handleHashNavigation(t){if(t==="now-playing"||!document.getElementById(t))showAllArticles(),history.replaceState(null,"",window.location.pathname);else{const[o,e]=t.split("/");showSingleArticle(o,e)}}function handleLinks(t){const o=t.target.closest("a");if(o){const e=o.getAttribute("href");if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("//")){o.setAttribute("target","_blank"),o.setAttribute("rel","noreferrer");return}t.preventDefault(),navigate(e.substring(1))}}document.addEventListener("click",handleLinks),window.addEventListener("hashchange",()=>{const t=window.location.hash.substring(1);handleHashNavigation(t)});class SimpleToggle extends HTMLElement{constructor(){super(),this.button=document.createElement("button"),this.button.textContent="Show",this.button.className="showHideButton",this.button.onclick=()=>this.toggleContent(),this.content=document.createElement("div"),this.content.style.display="none",this.template=document.createElement("template"),this.template.innerHTML=this.getAttribute("c"),this.append(this.button,this.content)}toggleContent(){this.content.style.display==="none"?(this.content.appendChild(this.template.content.cloneNode(!0)),this.content.style.display="block",this.button.textContent="Hide"):(this.content.innerHTML="",this.content.style.display="none",this.button.textContent="Show")}}customElements.define("s-t",SimpleToggle);function openOverlay(e){var o=document.getElementById("fullScreenOverlay"),n=document.getElementById("overlayImage");o.style.display="block",n.src=e,document.body.style.overflow="hidden",document.addEventListener("keydown",closeOverlay)}function closeOverlay(){var e=document.getElementById("fullScreenOverlay");e.style.display="none",document.body.style.overflow="auto",document.removeEventListener("keydown",closeOverlay)}var images=document.querySelectorAll("img:not(.img-footer,.img-header,.to-top,.no-overlay)");images.forEach(function(e){e.addEventListener("click",function(){openOverlay(this.src)})});if(!isMobile){let n=function(){return Math.random()<.5?Math.floor(Math.random()*-270)-45:Math.floor(Math.random()*270)+46},a=function(){return Math.floor(Math.random()*5)+7},o=function(){return Math.floor(Math.random()*1e3)+333},g=function(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&e.right<=(window.innerWidth||document.documentElement.clientWidth)},i=function(t,e,r=!1){let l=n(),M=l,s=100,w=100,f=100,E=100,m=100,b=100,v=0,y=a();function I(){t.style.filter=` hue-rotate(${l}deg) saturate(${s}%) contrast(${f}%) brightness(${m}%) ${r?"drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))":""} `}return I(),setInterval(()=>{d&&g(t)&&(v++,v>=y&&(M+=n(),w=Math.random()*35+90,E=Math.random()*(r?90:40)+80,b=Math.random()*(r?50:20)+(r?85:90),v=0,y=a()),l+=(M-l)*(Math.random()*.015),s+=(w-s)*(Math.random()*.015),f+=(E-f)*(Math.random()*.015),m+=(b-m)*(Math.random()*.015),I())},e)},h=function(t,e){clearInterval(e),t.style.filter="none"};var getRandomDegree=n,getNewIntervalsTillNextChange=a,getRandomInterval=o,isElementInViewport=g,startShift=i,handleDisengage=h;const u=document.querySelectorAll("button, a, a.dark-mode, footer, .article-nav-bottom, #site-nav a, .section-nav a"),c=document.querySelectorAll("header, #site-nav .col, .section-nav .col, .article-header, footer, .article-title, #site-title, #toolbar");let d=!document.hidden;document.addEventListener("visibilitychange",()=>{d=!document.hidden}),window.addEventListener("focus",()=>d=!0),window.addEventListener("blur",()=>d=!1),c.forEach(t=>{t.intervalId=throttle(()=>i(t,o()),20)()}),u.forEach(t=>{let e,r;t.addEventListener("mouseover",throttle(()=>{e=i(t,o(),!0)},80)),t.addEventListener("click",()=>{clearInterval(e),e=i(t,o(),!0)}),t.addEventListener("touchstart",()=>{clearInterval(e),e=i(t,o(),!0),r=setTimeout(()=>h(t,e),888)}),t.addEventListener("mouseout",debounce(()=>{h(t,e)},20))})}function debounce(u,c){let n;return function(...a){clearTimeout(n),n=setTimeout(()=>{u.apply(this,a)},c)}}function search(){const e=document.getElementById("searchInput").value.toLowerCase(),d=document.querySelectorAll("article"),t=document.getElementById("searchResults");if(t.innerHTML="",e.length===0){t.innerHTML="<p>Enter a search term</p>",t.style.display="block";return}else if(e.length<3){t.style.display="none";return}t.style.display="block";let r=!1;if(d.forEach(function(n){const s=n.textContent.toLowerCase(),c=n.id||"",o=n.querySelector("h1, h2, h3"),u=o?o.textContent:"Untitled Article";if(s.includes(e)){r=!0;const a=s.indexOf(e),i=Math.max(0,a-50),h=Math.min(s.length,a+e.length+50),y=s.substring(i,h).replace(new RegExp(e,"gi"),p=>`<strong>${p}</strong>`),l=document.createElement("div");l.classList.add("search-result");const m=`${c}`;l.innerHTML=` <h3>${c?`<a href="/${m}" class="search-result-link">`:""}${u}${c?"</a>":""}</h3> <p>...${y}...</p> `,t.appendChild(l)}}),t.querySelectorAll(".search-result-link").forEach(n=>{n.addEventListener("click",function(s){closeSearchOverlay()})}),!r){const n=document.createElement("p");n.textContent="No results found.",t.appendChild(n)}}function openSearchOverlay(){document.getElementById("searchOverlay").style.display="block",document.getElementById("searchInput").focus(),document.body.style.overflow="hidden",document.addEventListener("keydown",handleKeyPress),search()}function closeSearchOverlay(){document.getElementById("searchOverlay").style.display="none",document.body.style.overflow="auto",document.removeEventListener("keydown",handleKeyPress),document.getElementById("searchInput").value="",document.getElementById("searchResults").innerHTML=""}function handleKeyPress(e){e.key==="Escape"&&closeSearchOverlay()}document.getElementById("search").addEventListener("click",function(e){e.preventDefault(),openSearchOverlay()}),document.getElementById("searchInput").addEventListener("input",throttle(function(){search()},500));