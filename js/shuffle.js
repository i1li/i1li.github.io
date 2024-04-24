let next = document.querySelector("#next");
let pick = document.querySelector("#shuffle");
let currentIndex = 0;
const stack = [
'<y-t v="PLobEMHfBbtTam09cgcex7kP_zdnkKvx9q" class="no-link-embed" t="Astropilot Music"></y-t>',
'<y-t v="UuU-Go8GoeY" class="no-link-embed" t="DEKEL Downtempo @ The Dome - Ozora Festival 2023"></y-t>',
'<y-t v="KN5tGBz4-nE" t="Zebbler Encanti Experience - Syncorswim [4K A/V]"></y-t>',
'<y-t v="PLZWCukkQGi6pb11ahHp5Mp3Cs9sWzSDpV" class="no-link-embed" t="Somatoast"></y-t>',
'<y-t v="6M_P08ZjejQ,3ZY5Wio3vdk" t="Arcturus"></y-t>',
'<y-t v="JSggxkx6iDo?end=3542" t="Erothyme + Actualize Visuals - Featherbed Sessions Mix"></y-t>',
'<y-t v="XYk5wku59TY" class="no-link-embed" t="Jade Cicada + Tenorless: An Audiovisual Mixtape"></y-t>',
'<y-t v="ccS-Xu812Sg" t="Alejo & Tyme Visions // The Shadow Self Mix (AV Mixtape)"></y-t>',
'<y-t v="n4-AiEwDG-Q" t="Alejo w/ 3NA Visuals - Featherbed Sessions 05.08.20"></y-t>',
'<y-t v="CuNE5DmrgsE" class="no-link-embed" t="Malakai x DayDreemer [Audiovisual Mix]"></y-t>',
'<y-t v="t1f_1uy_qxU" t="Desert Dwellers with Johnathan Singer Visuals: One Earth Live"></y-t>',
'<y-t v="lHIKxloLpzs" class="no-link-embed" t="Mystic Grizzly  + Actualize Visuals - Fractal Beach Mix"></y-t>',
'<y-t v="F1gIsoIVQG8" class="no-link-embed" t="Kiasmos"></y-t>',
'<y-t v="Nfb5P5zoVBk" t="MINDEX - Tipper and Friends Mix (Microdose VR)"></y-t>',
'<y-t v="V6cQ5e_X4Xc" t="Tipper - Insolito (Microdose VR)"></y-t>',
'<y-t v="V9U9mpyW4pI" t="Tipper - Marble Hunting (Microdose VR)"></y-t>',
'<y-t v="LAcJ5u7HJZ8" t="EOS - Tipper and Friends Set - 05.05.2023(Mushin Experience visual set)"></y-t>',
'<y-t v="ZmrCL9i8Efk" class="no-link-embed" t="shwex/mumukshu mix with visuals by 3na"></y-t>',
'<y-t v="LlZkLJvj8ks" class="no-link-embed" t="Suduaya - Starseeds"></y-t>',
'<y-t v="_szH-LW0Vvs" class="no-link-embed" t="Entheogenic - Kykeon"></y-t>',
'<y-t v="q4xKvHANqjk?start=38" t="Khruangbin @ Villain | Pitchfork Live"></y-t>',
'<y-t v="-tOSh9bDh00" t="Hugo Kant - Far From Home"></y-t>',
'<y-t v="GS9ImrohkW4,1sCoTSHn7WE,3ckXH4qUKZw" t="State Azure"></y-t>',
'<y-t v="PLiz2G6tBYC82nX1lRH9ShOoBm3j2p2ROm" class="no-link-embed" t="Alan Watts Chillstep"></y-t>',
'<y-t v="ZFIrf78pF98,D-orNLH2PXU,4MLfRq2I-9U,WvqZzVk_G70,NNT91GyAROE,NdSpWoQstdY,i6EwgH-ImCc,pL4y0_3-O3A" t="Dreamstate Logic"></y-t>',
'<y-t v="wtg7AetxuWo,WGV7ma6PYsk" t="Elijah Nang"></y-t>',
'<y-t v="GRe3GUaw1iU,_J7csNwXm0Y" t="Man Of No Ego"></y-t>',
'<y-t v="PLyA9cgarnQvBe95fXnMnTnKOHBZZy5Mn-" class="no-link-embed" t="Numa"></y-t>',
'<y-t v="PLhI_cQBEWhBjV23MetZWbKUicm130-_Kx" t="J.Pool"></y-t>',
'<y-t v="b1iq8y9Tvd4" t="Healing Frequencies of Tibetan Bowls"></y-t>',
'<y-t v="LcbVqTVA_1A" t="World Sound Healing Journey to Frequency | Sound Bath Meditation"></y-t>',
'<y-t v="kxiUyNGCB5I,qjuom9B60Qc,sOwZWg9AP5s,PAApaKMbmoc,7OmUqhkZlaU" t="Earthless"></y-t>',
'<y-t v="rbVXu4GRSUs,PutGcl_Kae4,wpDi77AOa_g" t="Takeo Suzuki - Ambient Buddhism"></y-t>',
'<y-t v="eDa9NXZ1abM" t="Abakus"></y-t>',
'<y-t v="v0XCCrt9EUU,9Z-Ch50_Qj8" t="Savej"></y-t>',
'<y-t v="XSUgm2kDBeo" t="Pheel + GoopWizard"></y-t>',
'<y-t v="X2t5RW38m8M" t="Evlov - Sonic Alchemy"></y-t>',
'<y-t v="YWDzCol3jYk" t="Colour Haze"></y-t>',
'<y-t v="RdpMHbTZ4dI" t="Shanti Planti + Deltaprocess"></y-t>',
'<y-t v="Vc_Oa2GqmKQ" t="Pathwey - Shanti Planti series vol.23 x Clear Void visual mix"></y-t>',
'<y-t v="b4qqfu5elYo" t="Illusive Tuna - Stelliferous Era (Shanti Planti)"></y-t>',
'<y-t v="FLAepXw94EhaO0CZV9f5D3fQ" class="no-link-embed" t="The Psychedelic Muse"></y-t>',
'<y-t v="PLobEMHfBbtTaepRNR_TyLDxL96WMPNSbu" t="Swamp Music"></y-t>',
'<y-t v="PLobEMHfBbtTbO-dNwSFPQH0JyERSO4faj" class="no-link-embed" t="Merkaba Music"></y-t>',
'<y-t v="PLobEMHfBbtTaeAwti0laHjNxxBmaIK4_V" class="no-link-embed" t="Gravitas Recordings"></y-t>',
'<y-t v="PLasnqON9F-uPc97epU68uvbDOhCkxrSZF" t="Mindspring Music"></y-t>'
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
shuffle(stack);
pick.innerHTML = stack[currentIndex];
next.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % stack.length;
  pick.innerHTML = stack[currentIndex];
});
const combinedShuffledList = document.getElementById('combined-list');
const videoIds = combinedShuffledList.querySelector('y-t').getAttribute('v').split(',');
shuffle(videoIds);
const limitedVideoIds = videoIds.slice(0, 150);
combinedShuffledList.querySelector('y-t').setAttribute('v', limitedVideoIds.join(','));
