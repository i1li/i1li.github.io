const stack = [
'<y-t p="PLZWCukkQGi6rJiIQpcxFbWtxo2sm1L_U2" v="nxMolO9CEaU,hGQu4_fan8Q,OnYKl4KKMWY,BnEgnrUCXPY,KDljTZjoPN4,Hn1h0lXu86s,UJNFbptgnd0,EhGCsaiVm0I,Yy4pcKn0Y_k,LdyabrdFMC8,DNLMxLhr6qQ,PgWTZ3hD7vE,h6PBIPYxAJU,HGyt9Jgib7A,roTqa0EaZM4,ibqjTt6LzWs,ZiVVDs31bYA,ALoyJNLJqOo,ijLt8T4fE08,mFSRCG4DrmI,pPXamHHDfNI,15Nqbic6HZs,i1mQsnc7KDI,5mpafLYHVd0,DxHnWi7Wk0k,TLWygV_OGc0,NyydSocn5dM,3KbmoqMhmeE,cVFzblT5VPE,i63c3Wg5CEs,x7LmhOEnIs4,ZkPfmW84lnU,go6u0Z90t94,4Elh8WytKfA,O2K0ptoYpuc,eop2hTv7ZC4,c8cKN1rbJl4,IJrKlSkxRHA,YLS1WSgCaEw,q9HhNbL0Rww,FngDSOuCNAA,e5PqHAYuj-U,e6JqYyFJEn8,Pl7zA_I679Y,Z5NoQg8LdDk,9p8NMDcKkVw,Q2dfe2yseIM,JDWzlrMedoM,4Sx6Ol4ZfBE,sqzFm3erSJc" class="no-link-embed" t="Misc Tunes"></y-t>',
'<y-t p="PLobEMHfBbtTam09cgcex7kP_zdnkKvx9q" v="31CYKmydfSg,LokZf-uQ3V8,fMTIr35EWLY,hnT-PjSU8eg,VuIptQHXkCc,GpYeeMmkyjg,XEMAidkaR2U,avM9CVBoVSc,OVn6qQsfsjo,oy2nGgSaVIQ,6YO9r2ZW_qw,alNeUkZgspk,TDb0hVIEXAQ,8H57lxR4BM0,gc6M5NOdKEM,pXN5gquPwUk,tIgWmZ7zM-s,bVhq76KkbhQ,aBUVcVMHQrw,alIDopccOYQ,wBYYfJAiw3M,aHmf3De4Jh8,tsn1Hehc4Oo,al1JBe_cHcU,-EdceV5s47w,MD7ob57T6t4,Zgj78K96M14,NwUAVIZnRtc,zQX3DE7ds9Q,scFNkYENE_0,MQeg83rUzWA,m3o6yrbeDe8,gfeBeGXPDaA,XyND8rHiLf8,saetpQ0SR2U,RHX2soK9cL8,wGf-v6jGH1I,rc3btpnuwyE,3KwCRd9CTxk,TfbjcyS_EZ0,hDh12FkylIA,OapUsqdQU5M,LMATSsaDfGc,g5L6V0zsfgQ,ZV4lxQUBJ5c,KXsnrRysy9A,j2Yu0gCiZtY,7FiNmLJGDkE,f4pPWnNf5yw,05HrZ7QufN0" class="no-link-embed" t="Astropilot Music"></y-t>',
'<y-t v="UuU-Go8GoeY" class="no-link-embed" t="DEKEL Downtempo @ The Dome - Ozora Festival 2023"></y-t>',
'<y-t v="KN5tGBz4-nE" t="Zebbler Encanti Experience - Syncorswim [4K A/V]"></y-t>',
'<y-t p="PLZWCukkQGi6pb11ahHp5Mp3Cs9sWzSDpV" v="IY5HdD2TcQI,lFuId30GLRo,iFdbSmZ-6Aw,MuhNFjrENvk,RNk-a3RYWnc" class="no-link-embed" t="Somatoast"></y-t>',
'<y-t v="6M_P08ZjejQ,3ZY5Wio3vdk" t="Arcturus"></y-t>',
'<y-t v="JSggxkx6iDo?end=3542" t="Erothyme + Actualize Visuals - Featherbed Sessions Mix"></y-t>',
'<y-t v="XYk5wku59TY" class="no-link-embed" t="Jade Cicada + Tenorless: An Audiovisual Mixtape"></y-t>',
'<y-t v="ccS-Xu812Sg" t="Alejo & Tyme Visions // The Shadow Self Mix (AV Mixtape)"></y-t>',
'<y-t v="n4-AiEwDG-Q" t="Alejo w/ 3NA Visuals - Featherbed Sessions 05.08.20"></y-t>',
'<y-t v="CuNE5DmrgsE" class="no-link-embed" t="Malakai x DayDreemer [Audiovisual Mix]"></y-t>',
'<y-t v="t1f_1uy_qxU" t="Desert Dwellers with Johnathan Singer Visuals: One Earth Live"></y-t>',
'<y-t v="lHIKxloLpzs" class="no-link-embed" t="Mystic Grizzly  + Actualize Visuals - Fractal Beach Mix"></y-t>',
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
'<y-t p="PLiz2G6tBYC82nX1lRH9ShOoBm3j2p2ROm" v="D-4n3im0CGc,2OAMtysT_do,ePmcoBf7Mq8,uGD3TvlLHq8,zUl_zQqLzUk,wIDat6pleQo,Zum9E6qzDIs,XXR2UMUixV8,sGT1RcCKmD4,cYbjXezTNdc,yezey9NnOHU,linw07P5kEA,XLmto5KYKKY" class="no-link-embed" t="Alan Watts Chillstep"></y-t>',
'<y-t v="ZFIrf78pF98,D-orNLH2PXU,4MLfRq2I-9U,WvqZzVk_G70,NNT91GyAROE,NdSpWoQstdY,i6EwgH-ImCc,pL4y0_3-O3A" t="Dreamstate Logic"></y-t>',
'<y-t v="wtg7AetxuWo,WGV7ma6PYsk" t="Elijah Nang"></y-t>',
'<y-t v="GRe3GUaw1iU,_J7csNwXm0Y" t="Man Of No Ego"></y-t>',
'<y-t p="PLyA9cgarnQvBe95fXnMnTnKOHBZZy5Mn-" v="JYgwVPZm0hU,apXkd39xDVI,BKPQ_S71poE,Pb-jvzVbie8,E-Rvq2NX66s" class="no-link-embed" t="Numa"></y-t>',
'<y-t v="feHtm3uU2eY,cIMKJ43TFLs,7YDzkjCnQA4" t="Özgür Baba"></y-t>',
'<y-t p="PLhI_cQBEWhBjV23MetZWbKUicm130-_Kx" v="2Yza5xXfezc,l-JBfTSzgYo,F2Flm8PhRpI,irxCVG5srfc,PM5LRlpA8ZQ,hw0vqTx97-s,SdNjpNNtKts,C0TQwfGhtmw,sSWxpOQiAas,Moo87qtoeW0,9S91hsovWPM,-qn4-HI5lPo,vNbypmQE_XU,X0lPmU86wUY,ZP57V3wNurM,1iVI5Lfd9_8,g1em9GnVmtc" t="J.Pool"></y-t>',
'<y-t v="b1iq8y9Tvd4" t="Healing Frequencies of Tibetan Bowls"></y-t>',
'<y-t v="LcbVqTVA_1A" t="World Sound Healing Journey to Frequency | Sound Bath Meditation"></y-t>',
'<y-t v="kxiUyNGCB5I,qjuom9B60Qc,sOwZWg9AP5s,PAApaKMbmoc,7OmUqhkZlaU" t="Earthless"></y-t>',
'<y-t v="rbVXu4GRSUs,PutGcl_Kae4,wpDi77AOa_g" t="Takeo Suzuki - Ambient Buddhism"></y-t>',
'<y-t v="F1gIsoIVQG8" class="no-link-embed" t="Kiasmos"></y-t>',
'<y-t v="eDa9NXZ1abM" t="Abakus"></y-t>',
'<y-t v="v0XCCrt9EUU,9Z-Ch50_Qj8" t="Savej"></y-t>',
'<y-t v="XSUgm2kDBeo" t="Pheel + GoopWizard"></y-t>',
'<y-t v="X2t5RW38m8M" t="Evlov - Sonic Alchemy"></y-t>',
'<y-t v="RdpMHbTZ4dI" t="Shanti Planti + Deltaprocess"></y-t>',
'<y-t v="Vc_Oa2GqmKQ" t="Pathwey - Shanti Planti series vol.23 x Clear Void visual mix"></y-t>',
'<y-t v="b4qqfu5elYo" t="Illusive Tuna - Stelliferous Era (Shanti Planti)"></y-t>',
'<y-t p="FLAepXw94EhaO0CZV9f5D3fQ" v="yfRI5of3ypg,VerGULeHdOQ,x7fivwuTNYM,Dzwg9rZ_znk,-dcz4bj583g,jTWFc8Y6Mrc,_nNKFc4yJAY,QH_liqx0fuI,5AAbrmLOV8k,ppzb-RY0mhg,EdJ8IM_9gUA,cdGb50WpIrc,1EK-18We-74,Ia_NHZcCixM,Vr2OsPYbBY8,3h9PAoJ0vuA,SzDhDzWOfPg,lP4HXoYg4ok,uK5sJdUCuCI,O-8bAHSiNU0,zI6_GCwjTVM,H28FBcSX2qI,nnkKdYIj1ok,gR9GXnp8fpI,BA9hiicbE7c,zPYmGcshxeI,D_D8zLIGimE,swnK_jGX71c,IXT0rLOuXzc,a7fC0Sh8ZaQ,Z_5uUAheaU8,Lwm3SStdbGM,f4q_L2DZ7CY,iVn-ncWBD6s,BCXV4TYIFbM,4eg-W-EqafY,DUU1F45SlKI,UW0LXF4F-j0,jV4zt-XYO84,JgosHmZ6t3U,TP_Hd68Qxj8,6IEUavVW6bs,iBafbXXgr_Y,EmixIllEUZg,7Y_EpjWm_84,ekYTchnpzpk,_EcXycDwyfI,I07MxTZNui4,LT6Ogxi4xBI" class="no-link-embed" t="The Psychedelic Muse"></y-t>',
'<y-t p="PLobEMHfBbtTaepRNR_TyLDxL96WMPNSbu" v="RPN4SitAHgk,D7iaavDWitQ,BJvGt382AKk,8lQhAuoaVGk,zFRK6rN5r6E,G2ha4SMo96c,8_DsT27JWDo,sxQ0cLxqbuY,9OBdQ8YWzZQ,_G33dsMfNcI,Y9ufOVTH2iE,O5h-3alAJvc,6UP1xENjql8,vZwAZ3YhxZo,_cO6spKO-u4,oxSNUo08XLw,s9sgmvMDqM0,FXVunzNuWSo,reT-4hhJDOw,NlwBGbgCV9M,sWmNee-PxHU,vvgUuwfvW0c,HzrjtfQo3rE,dDRoaSgrzLE,DTVxUwxfOHs,FnU3_r9dthY,HaDdRwYzKJg,l48B2Lk1ue0,CU3F4fW4KC8,6vwIcFdJPwA,7Dcz8vSv4d8,uWddfw-nZJE,mBkxtKo3dFE,eFQa4ksxN5Y,qCGWQqsbEGw,dEjzDsXa4d4,rNgR8UqZRks,NC2S4uRiEm0,g02uSl_qLPA,LL-Oyue01W8,pjp1EunPnM4,LXePklkTKOY,vzWJgyZGiTY,dMdjN39PgcM,HqRqz71p7v0,-Jn4rlJBwbE,Gb3e9ewVTJQ,l2wkKT-1QSI,QOeleuAgXHE,AEBZ3TwAG0c" t="Swamp Music"></y-t>',
'<y-t p="PLobEMHfBbtTbO-dNwSFPQH0JyERSO4faj" v="T7ko2T9Wepc,ncHmKB0TsAo,6QKJnToq8GE,djmDa2lz_3c,smM4tRFLlBE,DiuMNm3eqCY,jYBrUMlEYgk,h3fP1w4x_Xc,Yn7sYUW18e8,Qq1hg3pUHbg,YqI6MQP2N_c,xCLRFPtccE0,eIbdwmHo9Nw,fF8YBqC90xE,IMVLd-7mMQo,wAuxQ4y5tBM,yakTjvB3J6Y,0PRvpXJQxwQ,4_nKNjM1roA,3922yON_UOo,wSNePokx_2U,KxRUw_h_kOo,Vk0xEUdRXAQ,T3YGoaVIOUY,eH4XBsO5K_U,wfUZfDbRpSA,x1eBExE4HsI,jBj_GRXQysU,CDZ8-jzJWJ0,C5c9yoqKkao,Bt2yHgK5snQ,sXcs5tcsMRE,m1rvR7_UU8k,c7fJhUUIIWA,8-GyxA77mnE,Y0iqa9Fb_l8,6QA2JmssfgA,Eakl4j_18jg,nU_b4XdLOWg,_a52VwLAsXU,-AdQIWD3zl4,aDDprsHM9bs,l3Zv-cd0OhE,VMc8DtGfPh0,200JDL3-ECQ,QfEtAf3hjYc,SAQpEy1diZg,w54Q1ubk2vI,o8G45sar9W8,0byzWNGCSI0" class="no-link-embed" t="Merkaba Music"></y-t>',
'<y-t p="PLobEMHfBbtTaeAwti0laHjNxxBmaIK4_V" v="Ykh0drd9HHA,owjTVSQsynk,y9sl8IeQ3TU,GVPmi8Cu2tw,K8S2885ukUg,HYtIpg4TEbs,aRivBs94ENY,KkL08zGdnXg,cw7XgCczjK4,_q8IjoE70Tc,pw-BOeEtBQs,fBglCdB-HTA,jLQv5Kqpuw8,Cy6NWo6B3J4,QgoMCDSnoyI,bJyDbBU6RPM,FG7sdh1k9JI,1Ya_xBMWBwE,nVWndi0e_1Q,jyFlZS2IR6E,oRpgswhoRJo,LjPYfJQ4Uvk,IrLABlB-00E,kO8hJEI_2jg,LQuWXPu0oh0,Vl2lD_4bMyU,hfVn_fGRLl0,FuzxkzNR8HI,rl3qJSn410Q,b25p_Z_-KrE,Nrx8aNFSPLg,aJjea-32KYw,4Um3pt9jhAA,enm4v2W2TU8,LKw3HI1XCm4,vgiA7cbaIRE,dtL9HZJG-lk,QjvN0fKaPPw,lD81JKFPYRs,XT6BMrbjvRs,PBC4MRAGKbQ,EsxwhJzA4JY,kKZaBxR-Okk,-9sq_1aFqEc,N6PS1mxD76Q,IUrRfDkZ-Ig,1dXK5B7Xngg,jvEMK-i7i1A,Plc_liWiC4s,aDcnO5jTtxo" class="no-link-embed" t="Gravitas Recordings"></y-t>',
'<y-t p="PLasnqON9F-uPc97epU68uvbDOhCkxrSZF" v="0AgSHefaVlI,DKKyxeW7h1U,IeYWGxPl5YY,TIUFroVmnwo,47C1raCzP7E,cx6mYm5Wsrg,fEUIavBbXrA,nBB-ATb7oPA,tVojNdnxdUw,tmB2agaaJSI,zcEdZYCmx7Q,HBpqkjQffmA,HUvT5cmqFCg,MBjvD5y2IDg,as5YvgZlER0,lJLsIqLxhl0,wXowP8IjYoc,y3OyA7PAHa8,0faxwJI709A,3drWksn-nw4,K3k35nShhzY,Mdt3zIiDrT8,Xu-7vpO6KCw,ltKxV4QM_Bo,pUKJQCIVEGA,rm90CEjGPVg,sChh0Wr1LkA,-Jp-77KjRas,3tBK9SKng64,9UD4vKUY_Jw,CE68L0pZTF4,Z6zUKr_wwCE,bbhjTAm72xc,qwzXwKq36iQ,6Oe9xH9VmTs,MoOjH4RJ0Tw,fOmm4A157iI,yaMp2fR_SNM,3eRjAKd_NzA,5LKXMq0s-iY,9S72j6upspE,H3KEzzmpQbc,RGW0hsDR7kI,UHq9XnTGdAQ,XJKv285Pq3M,XMz9epec-_s,dNyoVlMTmhM,uQI-YSjRETc,yJ4ofJ1JWC8,zLN1HQXmUB4" t="Mindspring Music"></y-t>',
'<y-t v="YWDzCol3jYk" t="Colour Haze"></y-t>',
'<y-t v="SrVmSJ5CHc4,18hHsCZqiEw" t="Villagers of Ioannina City"></y-t>',
'<y-t v="QnWxw9rgT9g,04nSrTTiCWc,rck7MN3qdc0,zTXHTzHMWfw" t="Morgenland Festival Osnabrueck"></y-t>'
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
shuffle(stack);
let next = document.querySelector("#next");
let pick = document.querySelector("#shuffle");
let currentIndex = 0;
pick.innerHTML = stack[currentIndex];
next.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % stack.length;
  pick.innerHTML = stack[currentIndex];
});
stack.forEach(entry => {
  const ytElement = new DOMParser().parseFromString(entry, 'application/xml').querySelector('y-t');
  if (ytElement) {
    const videoIds = ytElement.getAttribute('v').split(',');
    if (videoIds.length > 1) {
      shuffle(videoIds);
      ytElement.setAttribute('v', videoIds.join(','));
      stack[stack.indexOf(entry)] = ytElement.outerHTML;
    }
  }
});
const combinedDiv = document.getElementById('combined-list');
const combinedDivIds = combinedDiv.querySelector('y-t').getAttribute('v').split(',');
shuffle(combinedDivIds);
const combinedLimited = combinedDivIds.slice(0, 150);
combinedDiv.querySelector('y-t').setAttribute('v', combinedLimited.join(','));
const musicDiv = document.getElementById('musix');
const musicDivIds = musicDiv.querySelectorAll('y-t');
musicDivIds.forEach(_ => {
  const musicDivIds = _.getAttribute('v').split(',');
  if (musicDivIds.length > 1) {
  shuffle(musicDivIds);
  const musicLimited = musicDivIds.slice(0, 150);
  _.setAttribute('v', musicLimited.join(','));
  }
});
const extraDiv = document.getElementById('extra');
const extraDivIds = extraDiv.querySelectorAll('y-t');
extraDivIds.forEach(_ => {
  const extraDivIds = _.getAttribute('v').split(',');
  if (extraDivIds.length > 1) {
  shuffle(extraDivIds);
  const extraLimited = extraDivIds.slice(0, 150);
  _.setAttribute('v', extraLimited.join(','));
  }
});
