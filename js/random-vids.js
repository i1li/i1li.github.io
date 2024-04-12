let btn = document.querySelector("#next-btn");
let vid = document.querySelector("#random-vids");
let currentIndex = 0;
const vids = [
  '<y-t v="_mEsA9uFug8" class="no-link-embed" t="Astropilot - Weightless Mind"></y-t>',
  '<y-t v="JSggxkx6iDo?end=3542" t="Erothyme + Actualize Visuals - Featherbed Sessions Mix"></y-t>',
  '<y-t v="XYk5wku59TY" class="no-link-embed" t="Jade Cicada + Tenorless: An Audiovisual Mixtape"></y-t>',
  '<y-t v="ccS-Xu812Sg" class="" t="Alejo & Tyme Visions // The Shadow Self Mix (AV Mixtape)"></y-t>',
  '<y-t v="n4-AiEwDG-Q" t="Alejo w/ 3NA Visuals - Featherbed Sessions 05.08.20"></y-t>',
  '<y-t v="CuNE5DmrgsE" class="no-link-embed" t="Malakai x DayDreemer [Audiovisual Mix]"></y-t>',
  '<y-t v="t1f_1uy_qxU" t="Desert Dwellers with Johnathan Singer Visuals: One Earth Live"></y-t>',
  '<y-t v="lHIKxloLpzs" class="no-link-embed" t="Mystic Grizzly  + Actualize Visuals - Fractal Beach Mix"></y-t>',
  '<y-t v="F1gIsoIVQG8" class="no-link-embed" t="Best of Kiasmos"></y-t>',
  '<y-t v="Nfb5P5zoVBk" t="MINDEX - Tipper and Friends Mix (Microdose VR)"></y-t>',
  '<y-t v="V6cQ5e_X4Xc" t="Tipper - Insolito Full Album (Microdose VR)"></y-t>',
  '<y-t v="V9U9mpyW4pI" t="Tipper - Marble Hunting /Full Album/ (Microdose VR)"></y-t>',
  '<y-t v="LAcJ5u7HJZ8" t="EOS - Tipper and Friends Set - 05.05.2023(Mushin Experience visual set)"></y-t>',
  '<y-t v="ZmrCL9i8Efk" class="no-link-embed" t="shwex/mumukshu mix with visuals by 3na"></y-t>',
  '<y-t v="LlZkLJvj8ks" class="no-link-embed" t="Suduaya - Starseeds (Arcelya Records) [Full Album]"></y-t>',
  '<y-t v="_szH-LW0Vvs" class="no-link-embed" t="Entheogenic - Kykeon [Full Album]"></y-t>'
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
