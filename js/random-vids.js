let btn = document.querySelector("#next-btn");
let vid = document.querySelector("#random-vids");
let currentIndex = 0;
const vids = [
  `<y-t v="_mEsA9uFug8" class="no-link-embed" t="Astropilot - Weightless Mind"></y-t>`,
  `<y-t v="JSggxkx6iDo?end=3542" t="Erothyme + Actualize Visuals - Featherbed Sessions Mix"></y-t>`,
  `<y-t v="XYk5wku59TY" class="no-link-embed" t="Jade Cicada + Tenorless: An Audiovisual Mixtape"></y-t>`,
  `<y-t v="ccS-Xu812Sg" class="" t="Alejo & Tyme Visions // The Shadow Self Mix (AV Mixtape)"></y-t>`,
  `<y-t v="n4-AiEwDG-Q" t="Alejo w/ 3NA Visuals - Featherbed Sessions 05.08.20"></y-t>`,
  `<y-t v="CuNE5DmrgsE" class="no-link-embed" t="Malakai x DayDreemer [Audiovisual Mix]"></y-t>`,
  `<y-t v="t1f_1uy_qxU" t="Desert Dwellers with Johnathan Singer Visuals: One Earth Live"></y-t>`,
  `<y-t v="lHIKxloLpzs" class="no-link-embed" t="Mystic Grizzly  + Actualize Visuals - Fractal Beach Mix"></y-t>`,
  `<y-t v="F1gIsoIVQG8" class="no-link-embed" t="Best of Kiasmos"></y-t>`,
  ];
function shuffle() {
  for (let i = vids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [vids[i], vids[j]] = [vids[j], vids[i]];
  }
}
shuffle();
vid.innerHTML = vids[currentIndex];
btn.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % vids.length;
  vid.innerHTML = vids[currentIndex];
});
