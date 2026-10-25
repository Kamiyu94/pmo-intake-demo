import {cases,OUTCOMES,TEAMS} from './data.mjs';
export const initialState=()=>({schema:1,cases:structuredClone(cases),reviews:{},drafts:{}});
export const latest=(state,id)=>state.reviews[id]?.at(-1)||null;
export const changed=(state,item)=>!!latest(state,item.id)&&latest(state,item.id).sourceVersion!==item.version;
export function submit(state,id,input,baseRevision,sourceVersion){
 const item=state.cases.find(c=>c.id===id);if(!item)throw Error('找不到此案件。');
 const prev=latest(state,id);if((prev?.revision||0)!==baseRevision)throw Error('審核紀錄已更新，請重新確認。');
 if(item.version!==sourceVersion)throw Error('來源內容已更新，請重新載入後確認。');
 if(!input.reviewer?.trim())throw Error('請填寫示範審核人。');
 if(!Object.hasOwn(OUTCOMES,input.outcome)||!TEAMS.includes(input.team))throw Error('請選擇有效的分類與承接小組。');
 if(!input.reason?.trim())throw Error('請填寫判斷理由。');
 if(!['未完成','待補資訊','定稿','作廢'].includes(input.completion))throw Error('請選擇審定狀態。');
 if(input.summary.length>1000)throw Error('摘要限 1,000 字以內。');
 const review={...input,revision:(prev?.revision||0)+1,sourceVersion:item.version,snapshot:structuredClone(item),at:new Date().toISOString(),approved:false};
 (state.reviews[id]??=[]).push(review);delete state.drafts[id];return review;
}
export function approve(state,id){const item=state.cases.find(c=>c.id===id),r=latest(state,id);if(!r||r.completion!=='定稿'||r.sourceVersion!==item.version)throw Error('僅可核准來源未變動的目前定稿版本。');r.approved=!r.approved;return r.approved;}
export function updateSource(state,id){const c=state.cases.find(c=>c.id===id);if(c.version>1)return false;c.raw+='\n\n【示範來源補充】需求方新增條件：試行階段需提供每週人工覆核紀錄，請重新確認分類與驗收方式。';c.version++;return true;}
export function eligible(state){return state.cases.filter(c=>{const r=latest(state,c.id);return r?.approved&&r.completion==='定稿'&&r.sourceVersion===c.version;});}
