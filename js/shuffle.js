let btn = document.querySelector("#next-btn");
let pick = document.querySelector("#shuffle");
let currentIndex = 0;
const stack = [
  '<y-t v="_mEsA9uFug8" class="no-link-embed" t="Astropilot - Weightless Mind"></y-t>',
  '<y-t v="UuU-Go8GoeY" class="no-link-embed" t="DEKEL Downtempo @ The Dome - Ozora Festival 2023"></y-t>',
  '<y-t v="JSggxkx6iDo?end=3542" t="Erothyme + Actualize Visuals - Featherbed Sessions Mix"></y-t>',
  '<y-t v="XYk5wku59TY" class="no-link-embed" t="Jade Cicada + Tenorless: An Audiovisual Mixtape"></y-t>',
  '<y-t v="ccS-Xu812Sg" class="" t="Alejo & Tyme Visions // The Shadow Self Mix (AV Mixtape)"></y-t>',
  '<y-t v="n4-AiEwDG-Q" t="Alejo w/ 3NA Visuals - Featherbed Sessions 05.08.20"></y-t>',
  '<y-t v="CuNE5DmrgsE" class="no-link-embed" t="Malakai x DayDreemer [Audiovisual Mix]"></y-t>',
  '<y-t v="t1f_1uy_qxU" t="Desert Dwellers with Johnathan Singer Visuals: One Earth Live"></y-t>',
  '<y-t v="lHIKxloLpzs" class="no-link-embed" t="Mystic Grizzly  + Actualize Visuals - Fractal Beach Mix"></y-t>',
  '<y-t v="F1gIsoIVQG8" class="no-link-embed" t="Best of Kiasmos"></y-t>',
  '<y-t v="Nfb5P5zoVBk" t="MINDEX - Tipper and Friends Mix (Microdose VR)"></y-t>',
  '<y-t v="V6cQ5e_X4Xc" t="Tipper - Insolito (Microdose VR)"></y-t>',
  '<y-t v="V9U9mpyW4pI" t="Tipper - Marble Hunting (Microdose VR)"></y-t>',
  '<y-t v="LAcJ5u7HJZ8" t="EOS - Tipper and Friends Set - 05.05.2023(Mushin Experience visual set)"></y-t>',
  '<y-t v="ZmrCL9i8Efk" class="no-link-embed" t="shwex/mumukshu mix with visuals by 3na"></y-t>',
  '<y-t v="LlZkLJvj8ks" class="no-link-embed" t="Suduaya - Starseeds"></y-t>',
  '<y-t v="_szH-LW0Vvs" class="no-link-embed" t="Entheogenic - Kykeon"></y-t>',
  '<y-t v="1sCoTSHn7WE" t="State Azure: Navigating a Latent Space"></y-t>',
  '<y-t v="GS9ImrohkW4" t="State Azure: Church of the Last Epoch"></y-t>',
  '<y-t v="q4xKvHANqjk?start=38" t="Khruangbin @ Villain | Pitchfork Live"></y-t>'
  ];
function shuffle() {
  for (let i = stack.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [stack[i], stack[j]] = [stack[j], stack[i]];
  }
}
shuffle();
pick.innerHTML = stack[currentIndex];
btn.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % stack.length;
  pick.innerHTML = stack[currentIndex];
});
