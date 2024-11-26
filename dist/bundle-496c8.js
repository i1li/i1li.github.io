// Hello and God bless! Christ is King! https://github.com/i1li/i
let isWindowActive=!document.hidden,lastUpdateTime=performance.now();const updateWindowStatus=throttle(()=>{const n=isWindowActive;isWindowActive=!document.hidden||document.hasFocus(),isWindowActive&&!n&&(lastUpdateTime=performance.now())},500);window.addEventListener("focus",updateWindowStatus),window.addEventListener("blur",updateWindowStatus),document.addEventListener("visibilitychange",updateWindowStatus);const isMobile=window.matchMedia("(orientation: portrait)").matches||window.innerHeight>window.innerWidth||/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|kindle|playbook|silk|mobile|tablet|samsung|lg|htc|nokia|motorola|symbian|fennec|maemo|tizen|blazer|series60|ucbrowser|bada|micromessenger|webview/.test(navigator.userAgent.toLowerCase());function debounce(n,o){let t;return function(...e){clearTimeout(t),t=setTimeout(()=>{n.apply(this,e)},o)}}function throttle(n,o){let t,e;return function(){const a=this,i=arguments;e?(clearTimeout(t),t=setTimeout(function(){Date.now()-e>=o&&(n.apply(a,i),e=Date.now())},Math.max(0,o-(Date.now()-e)))):(n.apply(a,i),e=Date.now())}}function metaRecursiveEaseNoise(n,o=0,t=Math.ceil(Math.random()*300)+33){if(o>=t){const u=easingFunctions[Math.floor(Math.random()*easingFunctions.length)];return u(n)}const e=easingFunctions[Math.floor(Math.random()*easingFunctions.length)],a=noiseFunctions[Math.floor(Math.random()*noiseFunctions.length)],i=Math.random(),r=Math.random()/2,s=e(n),c=metaRecursiveNoise(n*i,o+1,t,a)*r;return Math.max(0,Math.min(1,s+c))}function metaRecursiveNoise(n,o=0,t=Math.ceil(Math.random()*300)+33,e){if(o>=t)return e(n);const a=Math.floor(n)&255;n-=Math.floor(n);const i=metaRecursiveEaseNoise(fade(n),o+1,t);return lerp(i,grad(p[a],n),grad(p[a+1],n-1))}const easingFunctions=[n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2,n=>n<.5?2*n*n:-1+(4-2*n)*n,n=>n<.5?(1-Math.sqrt(1-4*n*n))/2:(Math.sqrt(1-Math.pow(-2*n+2,2))+1)/2],noiseFunctions=[n=>perlinNoise(n),n=>Math.sin(n*10)*.5+.5,n=>Math.exp(-Math.pow(n-.5,2)/.05),n=>Math.pow(Math.sin(n*Math.PI),3)],permutation=[...Array(256)].map(()=>Math.floor(Math.random()*256)),p=[...permutation,...permutation];function fade(n){return n*n*n*(n*(n*6-15)+10)}function lerp(n,o,t){return o+n*(t-o)}function grad(n,o){const t=n&15,e=1+(t&7);return(t&8?-e:e)*o}function perlinNoise(n){const o=Math.floor(n)&255;n-=Math.floor(n);const t=fade(n);return lerp(t,grad(p[o],n),grad(p[o+1],n-1))}if(!isMobile){let u=function(r){const i=document.querySelectorAll('[id^="shift-layer"]').length,n=r.id.match(/shift-layer(\d+)/);return{currentLayer:n?parseInt(n[1]):null,totalLayers:i}},l=function(r,t=.85,i=1.15){if(Math.random()<.333){const n=Math.random()*(i-t)+t;return Math.round(r*n)}return Math.round(r)},e=function(r,t,i=1,n){if(!n.id.startsWith("shift-layer"))return(Math.random()*(t-r)+r)*i;const{currentLayer:a,totalLayers:s}=u(n);for(let f=1;f<=s;f++)if(a===f)return l(Math.random()*(t-r)+r)*i},h=function(r){const t=e(8e3,33e3,1,r);return Math.round(t)},C=function(r){const t=e(-180,180,1,r);return Math.round(t*10)/10},o=function(r){const t=e(87,185,1,r);return Math.round(t*10)/10},d=function(r){const t=e(65,95,1,r);return Math.round(t*10)/10},L=function(r){const t=e(.26,.4,1,r);return Math.round(t*1e3)/1e3},O=function(r){const{currentLayer:t}=u(r);return t===2?7*Math.ceil(Math.random()*3):l(Math.ceil(Math.random()*5)+2)},G=function(r){const{currentLayer:t}=u(r);return{transitionCurrentTime:0,transitionProgress:0,transitionDuration:t===2?5e3:8e3,currentGradientSteps:t===2?7:14,currentContrast:100,currentBrightness:100,currentSaturation:100,currentOpacity:.75,currentHueShift:0,targetGradientSteps:O(r),targetContrast:o(r),targetBrightness:o(r),targetSaturation:o(r),targetOpacity:d(r),targetHueShift:C(r)}},b=function(r){let t;return r.id==="bg"?t=.33:t=1,{transitionCurrentTime:0,transitionProgress:0,transitionDuration:h(r),currentOpacity:t,targetOpacity:L(r)}},P=function(r,t){const{currentLayer:i}=u(r);function n(c,y){return c*y}const a=r.offsetWidth||r.clientWidth,s=r.offsetHeight||r.clientHeight,q=Math.sqrt(a*a+s*s)/(Math.max(a,s)*Math.sqrt(2))*100;let T=[];const A=t.currentGradientSteps,I=360/A;for(let c=0;c<A;c++){const y=c*I,E=50+50*Math.cos(y*Math.PI/180),V=50+50*Math.sin(y*Math.PI/180),W=c+t.currentGradientSteps;T.push(`radial-gradient(ellipse farthest-corner at ${Math.round(E*10)/10}% ${Math.round(V*10)/10}%, hsl(${n(W,I)}, 100%, 50%), transparent ${Math.round(q*10)/10}%)`)}r.style.backgroundImage=T.join(", "),r.style.filter=`opacity(${t.currentOpacity}%) contrast(${t.currentContrast}%) brightness(${t.currentBrightness}%) saturate(${t.currentSaturation}%) hue-rotate(${t.currentHueShift}deg)`},m=function(r,t,i){r.transitionCurrentTime+=i,r.transitionProgress+=i/r.transitionDuration,r.transitionProgress>1&&(r.transitionProgress=1);const n=()=>metaRecursiveEaseNoise(r.transitionProgress),{currentLayer:a}=u(t);a===1?r.currentGradientSteps+=Math.round((r.targetGradientSteps-r.currentGradientSteps)*(n()*5e-5)*Math.random()*10)/10:r.currentGradientSteps+=Math.round((r.targetGradientSteps-r.currentGradientSteps)*(n()*.05)*Math.random()*10)/10,a===1?r.currentHueShift+=Math.round((r.targetGradientSteps-r.currentHueShift)*(n()*.2)*Math.random()*10)/10:r.currentHueShift+=Math.round((r.targetGradientSteps-r.currentHueShift)*(n()*5e-4)*Math.random()*10)/10,r.currentContrast+=Math.round((r.targetContrast-r.currentContrast)*n()*10)/10,r.currentBrightness+=Math.round((r.targetBrightness-r.currentBrightness)*n()*10)/10,r.currentSaturation+=Math.round((r.targetSaturation-r.currentSaturation)*n()*10)/10,r.currentOpacity+=Math.round((r.targetOpacity-r.currentOpacity)*n()*10)/10,r.transitionCurrentTime>=r.transitionDuration&&(r.transitionCurrentTime=0,r.transitionProgress=0,r.transitionDuration=h(t),r.targetHueShift=C(t),r.targetGradientSteps=O(t),r.targetContrast=o(t),r.targetBrightness=o(t),r.targetSaturation=o(t),r.targetOpacity=d(t))},D=function(r,t,i){r.transitionCurrentTime+=i,r.transitionProgress+=i/r.transitionDuration*Math.random(),r.transitionProgress>1&&(r.transitionProgress=1);const n=()=>metaRecursiveEaseNoise(r.transitionProgress);r.currentOpacity+=Math.round((r.targetOpacity-r.currentOpacity)*n()*(Math.random()*.1)*1e3)/1e3,r.transitionCurrentTime>=r.transitionDuration&&(r.transitionCurrentTime=0,r.transitionProgress=0,r.transitionDuration=h(t),r.targetOpacity=t.id==="bg"?L(t):d(t))},g=function(r){if(!isWindowActive){requestAnimationFrame(g);return}const t=r-lastUpdateTime;lastUpdateTime=r,m(H,M,t),m(B,p,t),P(M,H),P(p,B),D($,S,t),S.style.opacity=$.currentOpacity,requestAnimationFrame(g)};var getShiftLayerInfo=u,randomlyModifyValue=l,getRandomInRange=e,getRandomTransitionDuration=h,getRandomHueShift=C,getRandomFilterValue=o,getRandomOpacityValue=d,getRandomOpacityValue2=L,getRandomGradientSteps=O,createLayerState=G,createBgLayerState=b,setGradient=P,updateLayerState=m,updateBgLayerState=D,updateColors=g;const M=document.getElementById("shift-layer1"),p=document.getElementById("shift-layer2"),S=document.getElementById("bg");let H=G(M),B=G(p),$=b(S);requestAnimationFrame(g)}if(window.SPA404Redirect){const e=window.SPA404Redirect.search.slice(1).split("&").map(d=>d.replace(/~and~/g,"&")).join("?"),i=window.SPA404Redirect.origin+window.SPA404Redirect.pathname.slice(0,-1)+e+window.SPA404Redirect.hash;window.history.replaceState(null,null,i),delete window.SPA404Redirect}function shuffle(e,t=1/0){if(e.length===1)return e;if(e.length<Math.min(t*2,e.length)){const n=[],l=new Set;for(;l.size<Math.min(t,e.length);){const o=Math.floor(Math.random()*e.length);l.add(o)}for(const o of l)n.push(e[o]);return n}else{for(let n=e.length-1;n>0;n--){const l=Math.floor(Math.random()*(n+1));[e[n],e[l]]=[e[l],e[n]]}return e.slice(0,Math.min(t,e.length))}}const shuffleDiv=document.getElementById("shuffle"),elements=[...shuffleDiv.querySelectorAll("y-t")];let combinedElements=[],elementIdsMap=new Map;function processAndCombine(e,t){if(processedElements.has(t))return;const n=e.getAttribute("v");let l;elementIdsMap.has(t)?l=elementIdsMap.get(t):(l=n.split(","),elementIdsMap.set(t,l)),shuffle(l,3).forEach(s=>combinedElements.push(s.split("?")[0]));const c=shuffle(l,150);if(e.setAttribute("v",c.join(",")),processedElements.add(t),t<elements.length-1)processAndCombine(elements[t+1],t+1);else{const d=document.getElementById("combined-list").querySelector("y-t"),i=[...new Set(combinedElements)],m=shuffle(i,150);d.setAttribute("v",m.join(","))}}let processedElements=new Set;processAndCombine(elements[0],0);function shuffleAndDraw(){shuffle(elements);let e=0,t=document.getElementById("draw");const n=elements[e].cloneNode(!1);processAndCombine(n,e),t.appendChild(n),document.querySelector("#next").addEventListener("click",function(){e=(e+1)%elements.length,t.innerHTML="";const o=elements[e].cloneNode(!1);processAndCombine(o,e),t.appendChild(o)})}shuffleAndDraw();class YTEmbed extends HTMLElement{constructor(){super();const t=this.getAttribute("v"),[e,o]=t.split("?");this.id=e,this.params=o;const s=this.id.split(",");this.videoIds=s;let i,n;switch(this.throttledCheckViewport=this.checkViewport.bind(this),this.throttledCheckViewport=throttle(this.throttledCheckViewport,500),!0){default:this.classList.contains("no-link-embed")?(i=`https://www.youtube.com/watch?v=${this.id}${this.params?"&"+this.params+"&":"&"}autoplay=1`,n=`https://www.youtube-nocookie.com/embed/${this.id}${this.params?"?"+this.params+"&":"?"}autoplay=1`):this.classList.contains("no-embed")?i=`https://www.youtube.com/watch?v=${this.id}${this.params?"&"+this.params+"&":"&"}autoplay=1`:(i=`https://www.youtube-nocookie.com/embed/${this.id}${this.params?"?"+this.params+"&":"?"}autoplay=1`,n=i);break;case this.videoIds.length>1:this.classList.contains("no-link-embed")?(i=`https://www.youtube.com/watch_videos?video_ids=${this.videoIds.join(",")}&autoplay=1`,n=`https://www.youtube-nocookie.com/embed/?playlist=${this.videoIds.join(",")}&autoplay=1`):this.classList.contains("no-embed")?i=`https://www.youtube.com/watch_videos?video_ids=${this.videoIds.join(",")}&autoplay=1`:(i=`https://www.youtube-nocookie.com/embed/?playlist=${this.videoIds.join(",")}&autoplay=1`,n=i);break;case(this.id.length>11&&(this.id.startsWith("PL")||this.id.startsWith("TL")||this.id.startsWith("OL")||this.id.startsWith("FL")||this.id.startsWith("UU"))):this.classList.contains("no-link-embed")?(i=`https://www.youtube.com/playlist?list=${this.id}&autoplay=1`,n=`https://www.youtube-nocookie.com/embed/videoseries?list=${this.id}&autoplay=1`):this.classList.contains("no-embed")?i=`https://www.youtube.com/playlist?list=${this.id}&autoplay=1`:(i=`https://www.youtube-nocookie.com/embed/videoseries?list=${this.id}&autoplay=1`,n=i);break}this.linkUrl=i,this.embedUrl=n,this.link=document.createElement("a"),this.link.textContent=this.getAttribute("t")||"View Video",this.link.title="View video in new tab",this.link.href=this.linkUrl,this.button=document.createElement("button"),this.button.textContent="\u25B6\uFE0F Play",this.button.title="Play Video",this.button.className="showHideButton",this.classList.contains("no-embed")?(this.button.onclick=()=>window.open(this.linkUrl),this.appendChild(this.button),this.appendChild(this.link)):(this.button.onclick=()=>this.toggleVideo(),this.wrapper=document.createElement("div"),this.wrapper.className="yt-wrapper",this.appendChild(this.button),this.appendChild(this.link),this.appendChild(this.wrapper))}toggleVideo(){const t=this.wrapper.querySelector("iframe");if(t)this.wrapper.removeChild(t),this.wrapper.style.display="none",this.button.textContent="\u25B6\uFE0F Play",this.button.title="Play Video",this.removeAttribute("data-now-playing"),this.removeAttribute("data-video-path"),this.removeRemoteControl();else{this.closeOtherVideos();const e=document.createElement("iframe");e.src=this.embedUrl,e.allowFullscreen=!0,e.className="yt",this.wrapper.appendChild(e),this.wrapper.style.display="block",this.button.textContent="\u23F9\uFE0F Stop",this.button.title="Stop Video",this.setAttribute("data-now-playing","true");const o=this.closest("article"),s=this.closest("section");let i="/";o&&(i+=o.id,s&&(i+=`/${s.id}`)),this.setAttribute("data-video-path",i),this.createRemoteControl(),this.setupViewportCheck()}}closeOtherVideos(){document.querySelectorAll("y-t[data-now-playing]").forEach(e=>{if(e!==this){const o=e.querySelector("button.showHideButton");if(o&&o.textContent==="\u23F9\uFE0F Stop"){e.removeAttribute("data-now-playing"),e.removeAttribute("data-video-path");const s=e.querySelector(".yt-wrapper");if(s){const i=s.querySelector("iframe");i&&s.removeChild(i),s.style.display="none"}o.textContent="\u25B6\uFE0F Play",o.title="Play Video"}}})}createRemoteControl(){let t=document.getElementById("remote-control");if(!t){t=document.createElement("div"),t.id="remote-control",t.style.opacity="0",t.style.pointerEvents="none",document.body.appendChild(t);const s=document.createElement("div");s.id="now-playing-text",s.innerHTML="\u{1F50A}Now<br>Playing:",s.style.opacity="0",s.style.pointerEvents="none",document.body.appendChild(s);const i=document.createElement("div");i.id="expand-icon",i.setAttribute("aria-label","Expand Remote Control"),document.body.appendChild(i);const n=()=>{t.style.opacity="0.7",t.style.pointerEvents="auto",i.style.opacity="0",i.style.pointerEvents="none",s.style.opacity="0",s.style.pointerEvents="none"};i.onclick=n,i.onmouseenter=n,t.onmouseleave=()=>{this.isOutOfViewport()&&(t.style.opacity="0",t.style.pointerEvents="none",i.style.opacity="0.2",i.style.pointerEvents="auto",s.style.opacity="0.55",s.style.pointerEvents="auto")}}t.innerHTML="";const e=this.button.cloneNode(!0);e.style="",e.onclick=()=>this.toggleVideo();const o=document.createElement("a");o.textContent="Go to video",o.style.marginTop="10px",o.onclick=s=>{s.preventDefault(),this.navigateToNowPlaying()},this.updateNowPlayingLink(o),t.appendChild(e),t.appendChild(o),this.checkViewport()}checkViewport(){const t=document.getElementById("remote-control"),e=document.getElementById("expand-icon"),o=document.getElementById("now-playing-text");this.isOutOfViewport()?(t&&(t.style.opacity="0",t.style.pointerEvents="none"),e&&(e.style.opacity="0.2",e.style.pointerEvents="auto"),o&&(o.style.opacity="0.55",o.style.pointerEvents="auto")):(t&&(t.style.opacity="0",t.style.pointerEvents="none"),e&&(e.style.opacity="0",e.style.pointerEvents="none"),o&&(o.style.opacity="0",o.style.pointerEvents="none"))}setupViewportCheck(){["scroll","touchmove","resize"].forEach(t=>window.addEventListener(t,this.throttledCheckViewport)),this.checkViewport()}isOutOfViewport(){const t=this.getBoundingClientRect();return t.bottom<=0||t.right<=0||t.left>=window.innerWidth||t.top>=window.innerHeight}updateNowPlayingLink(t){const e=this.getAttribute("data-video-path");e&&(t.href=`${e}#now-playing`)}navigateToNowPlaying(){const t=document.querySelector("y-t[data-now-playing]");if(t){const e=t.getAttribute("data-video-path");e&&(navigate(e.substring(1)),setTimeout(()=>{const o=t.getBoundingClientRect().top+window.pageYOffset-window.innerHeight*.2;window.scrollTo({top:o,behavior:"smooth"})},20))}}removeEventListeners(){["scroll","touchmove","resize"].forEach(t=>window.removeEventListener(t,this.throttledCheckViewport))}removeRemoteControl(){const t=document.getElementById("remote-control");t&&document.body.removeChild(t);const e=document.getElementById("expand-icon");e&&document.body.removeChild(e);const o=document.getElementById("now-playing-text");o&&document.body.removeChild(o),this.removeEventListeners()}}customElements.define("y-t",YTEmbed);function applyDarkMode(e){document.body.classList.toggle("dark-mode",e),document.querySelectorAll("a, .article-content, .article-content-wrapper, #bg-wrapper, #draw").forEach(t=>{t.classList.toggle("dark-mode",e)})}function toggleDarkMode(){darkMode=!darkMode,applyDarkMode(darkMode),localStorage.setItem("darkMode",darkMode)}let darkMode;const userPrefersDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,userPrefersLight=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches,savedMode=localStorage.getItem("darkMode");savedMode!==null?darkMode=savedMode==="true":userPrefersDark?darkMode=!0:userPrefersLight?darkMode=!1:darkMode=!0,applyDarkMode(darkMode);const modeToggle=document.getElementById("mode-toggle");modeToggle.addEventListener("click",toggleDarkMode);function adjustZoom(o){const n=o?1.05:.95;document.querySelectorAll("html").forEach(function(e){let t=parseFloat(window.getComputedStyle(e).fontSize);t=t*n,e.style.fontSize=t+"px"});const c=parseFloat(window.getComputedStyle(document.documentElement).fontSize);localStorage.setItem("baseFontSize",c)}const savedFontSize=localStorage.getItem("baseFontSize");savedFontSize&&(document.documentElement.style.fontSize=savedFontSize+"px"),document.getElementById("zoom-in").addEventListener("click",function(){adjustZoom(!0)}),document.getElementById("zoom-out").addEventListener("click",function(){adjustZoom(!1)});const scrollTransition=50,header=document.querySelector("header"),toTop=document.getElementById("toTop");function goToTop(){window.scrollTo(0,0)}function handleScroll(){window.scrollY>50?header.classList.add("scrolled-down"):header.classList.remove("scrolled-down"),document.body.scrollTop>50*7||document.documentElement.scrollTop>50*7?(toTop.style.opacity="0.4",toTop.style.pointerEvents="auto"):(toTop.style.opacity="0",toTop.style.pointerEvents="none")}function updateURLOnScroll(){const e=document.querySelectorAll("article");let o,n;if(e.forEach(t=>{const c=t.getBoundingClientRect();if(c.top<=window.innerHeight/2&&c.bottom>=window.innerHeight/2){o=t;const i=t.querySelectorAll(".section-title");for(let l=i.length-1;l>=0;l--){const s=i[l];if(s.getBoundingClientRect().top<=window.innerHeight/2){n=s;break}}}}),o){let t=o.id;n&&(t+=`/${n.id}`),t!==lastUpdatedPath&&(history.replaceState(null,"",`/${t}`),lastUpdatedPath=t)}}["scroll","touchmove","resize"].forEach(e=>window.addEventListener(e,throttle(()=>{updateURLOnScroll(),handleScroll()},500)));let isInitialLoad=!0,lastUpdatedPath="";const path=window.location.pathname.substring(1),hash=window.location.hash.substring(1),articles=document.querySelectorAll("article"),welcome=document.getElementById("welcome"),observer=new IntersectionObserver(function(t,o){t.forEach(function(e){e.isIntersecting&&(e.target.querySelector(".article-content").style.display="block",o.unobserve(e.target))})});if(articles.forEach(function(t){observer.observe(t),t.querySelector(".article-content").style.display="none"}),path){const[t,o]=path.split("/");t&&document.getElementById(t)?showSingleArticle(t,o):showAllArticles()}else hash?handleHashNavigation(hash):showAllArticles();window.onpopstate=function(t){t.state&&t.state.articleId?showSingleArticle(t.state.articleId,t.state.sectionId):showAllArticles()};function showSingleArticle(t,o){articles.forEach(function(e){if(e.id===t){welcome.style.display="none",e.style.display="block";const l=e.querySelector(".article-content");l&&(l.style.display="block");const s=e.querySelector(".article-nav");if(s){let i=e.querySelector(".article-nav-bottom");i||(i=s.cloneNode(!0),i.classList.add("article-nav-bottom"),e.appendChild(i))}if(o){const i=e.querySelector(`.section-title#${o}`);i&&navigateToElement(i,!0)}else navigateToElement(e,!1);let n=`/${t}`;o&&(n+=`/${o}`),history.replaceState({articleId:t,sectionId:o},"",n)}else e.style.display="none"})}function showAllArticles(){articles.forEach(function(t,o){t.style.display="block",o!==0&&(t.querySelector(".article-content").style.display="none"),observer.observe(t);const e=t.querySelector(".article-nav-bottom");e&&e.remove()}),welcome.style.display="block",header.classList.remove("scrolled-down"),goToTop()}function navigateToElement(t,o=!1){if(o&&isInitialLoad)t.closest("article").scrollIntoView({block:"center"}),setTimeout(()=>{let l=t.getBoundingClientRect().top+window.scrollY;setTimeout(()=>{l=(t.getBoundingClientRect().top+t.getBoundingClientRect().bottom)/2+window.scrollY-window.innerHeight*.15,window.scrollBy({top:l-window.scrollY}),isInitialLoad=!1},200)},200);else if(isInitialLoad){let e=t.getBoundingClientRect().top+window.scrollY-window.innerHeight*.1;window.scrollTo({top:e}),isInitialLoad=!1}else{let e=t.getBoundingClientRect().top+window.scrollY-window.innerHeight*.2;window.scrollTo({top:e})}}function navigate(t){if(t.startsWith("#"))handleHashNavigation(t.substring(1));else{const[o,e]=t.split("/");o?showSingleArticle(o,e):(showAllArticles(),history.replaceState({},"",window.location.origin))}}function handleHashNavigation(t){if(t==="now-playing"||!document.getElementById(t))showAllArticles(),history.replaceState(null,"",window.location.pathname);else{const[o,e]=t.split("/");showSingleArticle(o,e)}}function handleLinks(t){const o=t.target.closest("a");if(o){const e=o.getAttribute("href");if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("//")){o.setAttribute("target","_blank"),o.setAttribute("rel","noreferrer");return}t.preventDefault(),navigate(e.substring(1))}}document.addEventListener("click",handleLinks),window.addEventListener("hashchange",()=>{const t=window.location.hash.substring(1);handleHashNavigation(t)});class SimpleToggle extends HTMLElement{constructor(){super(),this.button=document.createElement("button"),this.button.textContent="Show",this.button.className="showHideButton",this.button.onclick=()=>this.toggleContent(),this.content=document.createElement("div"),this.content.style.display="none",this.template=document.createElement("template"),this.template.innerHTML=this.getAttribute("c"),this.append(this.button,this.content)}toggleContent(){this.content.style.display==="none"?(this.content.appendChild(this.template.content.cloneNode(!0)),this.content.style.display="block",this.button.textContent="Hide"):(this.content.innerHTML="",this.content.style.display="none",this.button.textContent="Show")}}customElements.define("s-t",SimpleToggle);function openOverlay(e){var o=document.getElementById("fullScreenOverlay"),n=document.getElementById("overlayImage");o.style.display="block",n.src=e,document.body.style.overflow="hidden",document.addEventListener("keydown",closeOverlay)}function closeOverlay(){var e=document.getElementById("fullScreenOverlay");e.style.display="none",document.body.style.overflow="auto",document.removeEventListener("keydown",closeOverlay)}var images=document.querySelectorAll("img:not(.img-footer,.img-header,.to-top,.no-overlay)");images.forEach(function(e){e.addEventListener("click",function(){openOverlay(this.src)})});if(!isMobile){let l=function(){return Math.random()<.5?Math.floor(Math.random()*-270)-45:Math.floor(Math.random()*270)+46},o=function(){return Math.floor(Math.random()*5e3)+3e3},m=function(e){const t=e.getBoundingClientRect(),r=window.innerHeight||document.documentElement.clientHeight,n=window.innerWidth||document.documentElement.clientWidth,i=r*.8;return t.top>=-i&&t.left>=0&&t.bottom<=r+i&&t.right<=n},a=function(e,t,r=!1){let n=l(),i=n,h=100,M=100,f=100,v=100,g=100,w=100,u=0,E=performance.now(),c=!0;function S(){c&&(e.style.filter=` hue-rotate(${n}deg) saturate(${h}%) contrast(${f}%) brightness(${g}%) ${r?"drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))":""} `)}function b(p){if(c){if(isWindowActive&&m(e)){const A=p-E;E=p,u+=A/t,u>=1&&(i=l(),M=Math.random()*35+90,v=Math.random()*(r?90:40)+80,w=Math.random()*(r?50:20)+(r?85:90),u=0);const s=()=>metaRecursiveEaseNoise(u);n+=Math.round((i-n)*s()*.1)/10,h+=Math.round((M-h)*s()*10)/10,f+=Math.round((v-f)*s()*10)/10,g+=Math.round((w-g)*s()*10)/10,S()}c&&requestAnimationFrame(b)}}return requestAnimationFrame(b),()=>{c=!1,e.style.filter="none"}},d=function(e,t){t&&t(),e.style.filter="none"};var getRandomDegree=l,getRandomInterval=o,isElementInViewport=m,startShift=a,handleDisengage=d;const y=document.querySelectorAll("button, a, .article-nav-bottom, footer");document.querySelectorAll("header, #site-title, #toolbar, nav .col a, .article-header, .article-title, .section-nav, .section-nav .col a, footer").forEach(e=>{e.animateFunction=throttle(()=>a(e,o()),30)()}),y.forEach(e=>{let t,r;e.addEventListener("mouseover",throttle(()=>{t&&t(),t=a(e,o(),!0)},30)),e.addEventListener("click",()=>{t&&t(),t=a(e,o(),!0)}),e.addEventListener("touchstart",()=>{t&&t(),t=a(e,o(),!0),r=setTimeout(()=>d(e,t),888)}),e.addEventListener("mouseout",debounce(()=>{d(e,t)},30))})}function search(){const e=document.getElementById("searchInput").value.toLowerCase(),d=document.querySelectorAll("article"),t=document.getElementById("searchResults");if(t.innerHTML="",e.length===0){t.innerHTML="<p>Enter a search term</p>",t.style.display="block";return}else if(e.length<3){t.style.display="none";return}t.style.display="block";let r=!1;if(d.forEach(function(n){const s=n.textContent.toLowerCase(),c=n.id||"",o=n.querySelector("h1, h2, h3"),u=o?o.textContent:"Untitled Article";if(s.includes(e)){r=!0;const a=s.indexOf(e),i=Math.max(0,a-50),h=Math.min(s.length,a+e.length+50),y=s.substring(i,h).replace(new RegExp(e,"gi"),p=>`<strong>${p}</strong>`),l=document.createElement("div");l.classList.add("search-result");const m=`${c}`;l.innerHTML=` <h3>${c?`<a href="/${m}" class="search-result-link">`:""}${u}${c?"</a>":""}</h3> <p>...${y}...</p> `,t.appendChild(l)}}),t.querySelectorAll(".search-result-link").forEach(n=>{n.addEventListener("click",function(s){closeSearchOverlay()})}),!r){const n=document.createElement("p");n.textContent="No results found.",t.appendChild(n)}}function openSearchOverlay(){document.getElementById("searchOverlay").style.display="block",document.getElementById("searchInput").focus(),document.body.style.overflow="hidden",document.addEventListener("keydown",handleKeyPress),search()}function closeSearchOverlay(){document.getElementById("searchOverlay").style.display="none",document.body.style.overflow="auto",document.removeEventListener("keydown",handleKeyPress),document.getElementById("searchInput").value="",document.getElementById("searchResults").innerHTML=""}function handleKeyPress(e){e.key==="Escape"&&closeSearchOverlay()}document.getElementById("search").addEventListener("click",function(e){e.preventDefault(),openSearchOverlay()}),document.getElementById("searchInput").addEventListener("input",throttle(function(){search()},500));
