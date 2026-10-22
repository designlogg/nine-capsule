export const slots=['상의','하의','상의','하의','상의','상의','상의','상의','하의'];
export const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function validOutfit(items){if(items.some(x=>!x)||items.some(a=>items.some(b=>a!==b&&a.blockedWith?.includes(b.id))))return false;const tops=items.filter(x=>x.category==='상의'),bottoms=items.filter(x=>x.category==='하의');return bottoms.length===1&&(tops.length===1||(tops.length===2&&tops[0].layer!==tops[1].layer&&tops.some(x=>x.layer==='base')&&tops.some(x=>x.layer==='over')));}
export function combinations(board,items){const clothes=board.map(id=>items.find(x=>x.id===id));const paths=lines.filter(l=>validOutfit(l.map(i=>clothes[i])));const pairs=[];clothes.forEach((a,i)=>clothes.forEach((b,j)=>{if(a?.category==='상의'&&b?.category==='하의'&&validOutfit([a,b]))pairs.push([i,j]);}));return {paths,pairs};}
export function suggest(items,season){const pool=items.filter(x=>x.status==='KEEP'&&(x.season===season||x.season==='사계절'));const tops=pool.filter(x=>x.category==='상의'), bottoms=pool.filter(x=>x.category==='하의');return slots.map(c=>(c==='상의'?tops:bottoms).shift()?.id||null);}
export const uid=()=>globalThis.crypto.randomUUID();
