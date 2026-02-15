import { useState, useCallback } from "react";

const I={
  Activity:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Brain:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7.5L12 22l3-5.5c2-2 4-4.5 4-7.5a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="3"/></svg>,
  FileText:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Shield:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  User:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Search:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Moon:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Sun:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Right:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  Left:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
  Warn:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Check:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Down:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Copy:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Save:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Lock:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Out:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Menu:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Steth:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
  Clock:()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Clip:()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  Plus:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

function gc(d){return d?{bg:"#0f1117",bgC:"#1a1d27",bgS:"#252836",tx:"#e8eaf0",txM:"#8b8fa3",txL:"#6b7085",pr:"#4da6ff",prL:"rgba(77,166,255,0.12)",ac:"#38d9a9",dn:"#ff6b6b",dnB:"rgba(255,107,107,0.1)",wr:"#ffd43b",wrB:"rgba(255,212,59,0.1)",bd:"#2d3148",bdL:"#22253a",hero:"linear-gradient(160deg,#0f1117 0%,#1a2332 50%,#0f1117 100%)",sh:"0 4px 24px rgba(0,0,0,0.4)"}:{bg:"#f5f7fb",bgC:"#ffffff",bgS:"#f0f4f8",tx:"#1a2332",txM:"#5a6a7e",txL:"#8896a6",pr:"#2b7de9",prL:"rgba(43,125,233,0.08)",ac:"#0ca678",dn:"#e03131",dnB:"rgba(224,49,49,0.06)",wr:"#e67700",wrB:"rgba(230,119,0,0.06)",bd:"#e2e8f0",bdL:"#edf2f7",hero:"linear-gradient(160deg,#f5f7fb 0%,#e8f4fd 50%,#f5f7fb 100%)",sh:"0 4px 24px rgba(0,0,0,0.06)"};}

const MR=[{id:1,pn:"Sarah Johnson",dt:"2026-02-14",dx:"Upper Respiratory Infection",st:"Completed"},{id:2,pn:"Michael Chen",dt:"2026-02-13",dx:"Type 2 Diabetes - Follow-up",st:"Completed"},{id:3,pn:"Emily Rodriguez",dt:"2026-02-12",dx:"Acute Gastritis",st:"Pending Review"},{id:4,pn:"James Wilson",dt:"2026-02-11",dx:"Hypertension Management",st:"Completed"},{id:5,pn:"Aisha Patel",dt:"2026-02-10",dx:"Migraine with Aura",st:"Completed"}];
const MA={dx:[{n:"Acute Bronchitis",p:78,d:"Inflammation of the bronchial tubes, commonly caused by viral infection."},{n:"Community-Acquired Pneumonia",p:45,d:"Lung infection acquired outside of a hospital setting."},{n:"Allergic Rhinitis",p:30,d:"Inflammation of the nasal passages due to allergens."}],lt:["Complete Blood Count (CBC)","C-Reactive Protein (CRP)","Chest X-Ray (PA view)","Sputum Culture & Sensitivity"],rf:["Patient reports persistent fever >38.5°C for 5 days","Oxygen saturation should be monitored"],ns:["Prescribe broad-spectrum antibiotics pending culture results","Schedule follow-up in 48-72 hours","Advise adequate hydration and rest","Consider referral to pulmonology if no improvement in 7 days"]};
const PL=["Head","Neck","Chest","Upper Back","Lower Back","Left Arm","Right Arm","Abdomen","Left Leg","Right Leg","Left Shoulder","Right Shoulder","Throat","Pelvis","Joints (Multiple)"];

// STABLE components
function Cd({children,c,style:s,...p}){return<div style={{background:c.bgC,borderRadius:16,border:`1px solid ${c.bd}`,boxShadow:c.sh,transition:"all 0.3s",...s}}{...p}>{children}</div>;}
function Bt({children,onClick,disabled:d,style:s,v="primary",c}){return<button onClick={onClick} disabled={d} style={{padding:"12px 28px",borderRadius:12,background:v==="primary"?`linear-gradient(135deg,${c.pr},${c.ac})`:v==="outline"?"transparent":c.bgS,color:v==="primary"?"white":v==="outline"?c.pr:c.tx,border:v==="outline"?`2px solid ${c.pr}`:"none",cursor:d?"not-allowed":"pointer",fontSize:15,fontWeight:600,transition:"all 0.3s",opacity:d?0.5:1,display:"inline-flex",alignItems:"center",gap:8,...s}}>{children}</button>;}
function Inp({label:l,error:e,c,...p}){return<div style={{display:"flex",flexDirection:"column",gap:6}}>{l&&<label style={{fontSize:13,fontWeight:600,color:c.txM,letterSpacing:"0.02em",textTransform:"uppercase"}}>{l}</label>}<input{...p}style={{padding:"12px 16px",borderRadius:10,border:`1.5px solid ${e?c.dn:c.bd}`,background:c.bgS,color:c.tx,fontSize:15,outline:"none",width:"100%",...(p.style||{})}}/>{e&&<span style={{fontSize:12,color:c.dn}}>{e}</span>}</div>;}
function Sel({label:l,options:o,error:e,c,...p}){return<div style={{display:"flex",flexDirection:"column",gap:6}}>{l&&<label style={{fontSize:13,fontWeight:600,color:c.txM,letterSpacing:"0.02em",textTransform:"uppercase"}}>{l}</label>}<select{...p}style={{padding:"12px 16px",borderRadius:10,border:`1.5px solid ${e?c.dn:c.bd}`,background:c.bgS,color:c.tx,fontSize:15,outline:"none",width:"100%",appearance:"auto"}}>{o.map(x=><option key={x.value} value={x.value}>{x.label}</option>)}</select>{e&&<span style={{fontSize:12,color:c.dn}}>{e}</span>}</div>;}
function Ta({label:l,error:e,c,...p}){return<div style={{display:"flex",flexDirection:"column",gap:6}}>{l&&<label style={{fontSize:13,fontWeight:600,color:c.txM,letterSpacing:"0.02em",textTransform:"uppercase"}}>{l}</label>}<textarea{...p}style={{padding:"12px 16px",borderRadius:10,border:`1.5px solid ${e?c.dn:c.bd}`,background:c.bgS,color:c.tx,fontSize:15,outline:"none",width:"100%",minHeight:100,resize:"vertical",fontFamily:"'DM Sans',sans-serif"}}/>{e&&<span style={{fontSize:12,color:c.dn}}>{e}</span>}</div>;}
function RS({title:t,children,c}){return<div style={{marginBottom:28}}><h3 style={{fontSize:14,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em",color:c.pr,marginBottom:14,paddingBottom:8,borderBottom:`1px solid ${c.bd}`}}>{t}</h3>{children}</div>;}
function RR({l,v,c}){return<div style={{display:"flex",padding:"8px 0",gap:12,borderBottom:`1px solid ${c.bdL}`}}><span style={{fontSize:13,fontWeight:600,color:c.txM,minWidth:140,flexShrink:0}}>{l}</span><span style={{fontSize:14}}>{v}</span></div>;}

const CSS=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}input,textarea,select{font-family:'DM Sans',sans-serif}::selection{background:#2b7de9;color:#fff}@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes slideIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}@keyframes heartbeat{0%,100%{transform:scale(1)}25%{transform:scale(1.1)}50%{transform:scale(1)}75%{transform:scale(1.05)}}@keyframes dotPulse{0%,80%,100%{transform:scale(0);opacity:0}40%{transform:scale(1);opacity:1}}.mob-btn{display:none!important}@media(max-width:768px){.desk{display:none!important}.mob-btn{display:flex!important}.stl{display:none}}@media print{nav,.nopr{display:none!important}body{background:#fff!important;color:#000!important}}`;

export default function App(){
  const[dm,setDm]=useState(false);
  const[pg,setPg]=useState("landing");
  const[li,setLi]=useState(false);
  const[mo,setMo]=useState(false);
  const[lf,setLf]=useState({e:"",p:""});
  const[le,setLe]=useState("");
  const[st,setSt]=useState(0);
  const[fd,setFd]=useState({fn:"",age:"",gen:"",wt:"",ht:"",al:"",med:"",ch:"",su:"",fh:"",sym:"",dur:"",sev:5,fev:"No",pl:"",nt:""});
  const[er,setEr]=useState({});
  const[as,setAs]=useState("idle");
  const[ar,setAr]=useState(null);
  const[cn,setCn]=useState("");
  const[sq,setSq]=useState("");
  const[cp,setCp]=useState(false);
  const c=gc(dm);
  const go=(p)=>{setPg(p);setMo(false);window.scrollTo(0,0);};
  const uf=useCallback((k,v)=>setFd(p=>({...p,[k]:v})),[]);
  const login=(e)=>{if(e)e.preventDefault();if(lf.e&&lf.p){setLi(true);setLe("");go("dash");}else setLe("Please enter your credentials");};
  const logout=()=>{setLi(false);setSt(0);setAs("idle");setAr(null);go("landing");};
  const val=(s)=>{const e={};if(s===0){if(!fd.fn.trim())e.fn="Required";if(!fd.age||fd.age<0||fd.age>150)e.age="Valid age required";if(!fd.gen)e.gen="Required";}if(s===2){if(!fd.sym.trim())e.sym="Please describe symptoms";if(!fd.dur.trim())e.dur="Duration required";}setEr(e);return!Object.keys(e).length;};
  const nx=()=>{if(val(st))setSt(Math.min(st+1,2));};
  const pv=()=>setSt(Math.max(st-1,0));
  const sub=()=>{if(!val(2))return;setAs("loading");go("analysis");setTimeout(()=>{setAr(MA);setAs("done");},3500);};
  const rst=()=>{setSt(0);setAs("idle");setAr(null);setFd({fn:"",age:"",gen:"",wt:"",ht:"",al:"",med:"",ch:"",su:"",fh:"",sym:"",dur:"",sev:5,fev:"No",pl:"",nt:""});go("consult");};
  const cpRep=()=>{navigator.clipboard.writeText(`Medical Report - ${fd.fn} - ${new Date().toLocaleDateString()}\nAge: ${fd.age}, Gender: ${fd.gen}\nSymptoms: ${fd.sym}\nDuration: ${fd.dur}, Severity: ${fd.sev}/10\nDiagnoses: ${ar?.dx.map(d=>`${d.n} (${d.p}%)`).join(", ")}\nLab Tests: ${ar?.lt.join(", ")}\nNotes: ${cn||"None"}`);setCp(true);setTimeout(()=>setCp(false),2000);};
  const fr=MR.filter(r=>r.pn.toLowerCase().includes(sq.toLowerCase())||r.dx.toLowerCase().includes(sq.toLowerCase()));
  const hr=new Date().getHours();

  return(<div style={{fontFamily:"'DM Sans',sans-serif",background:c.bg,color:c.tx,transition:"background 0.3s,color 0.3s",minHeight:"100vh",overflowX:"hidden"}}>
  <style>{CSS}</style>

  {/* NAV */}
  <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,background:dm?"rgba(15,17,23,0.85)":"rgba(255,255,255,0.85)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${c.bd}`}}>
  <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
    <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>go(li?"dash":"landing")}><div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${c.pr},${c.ac})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><I.Steth/></div><span style={{fontSize:18,fontWeight:700}}>Med<span style={{color:c.pr}}>AI</span></span></div>
    <div className="desk" style={{display:"flex",alignItems:"center",gap:8}}>
      {li&&<><button onClick={()=>go("dash")} style={{padding:"8px 16px",borderRadius:10,border:"none",background:pg==="dash"?c.prL:"transparent",color:pg==="dash"?c.pr:c.txM,cursor:"pointer",fontSize:14,fontWeight:500}}>Dashboard</button><button onClick={()=>go("consult")} style={{padding:"8px 16px",borderRadius:10,border:"none",background:pg==="consult"?c.prL:"transparent",color:pg==="consult"?c.pr:c.txM,cursor:"pointer",fontSize:14,fontWeight:500}}>New Consultation</button></>}
      <button onClick={()=>setDm(!dm)} style={{width:40,height:40,borderRadius:10,border:`1px solid ${c.bd}`,background:c.bgC,color:c.txM,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{dm?<I.Sun/>:<I.Moon/>}</button>
      {li?<button onClick={logout} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,border:`1px solid ${c.bd}`,background:"transparent",color:c.txM,cursor:"pointer",fontSize:14,fontWeight:500}}><I.Out/> Sign Out</button>
      :<button onClick={()=>go("login")} style={{padding:"8px 20px",borderRadius:10,border:"none",background:c.pr,color:"#fff",cursor:"pointer",fontSize:14,fontWeight:600}}>Sign In</button>}
    </div>
    <button onClick={()=>setMo(!mo)} className="mob-btn" style={{width:40,height:40,borderRadius:10,border:`1px solid ${c.bd}`,background:c.bgC,color:c.tx,alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{mo?<I.X/>:<I.Menu/>}</button>
  </div>
  {mo&&<div style={{position:"absolute",top:64,left:0,right:0,background:c.bgC,borderBottom:`1px solid ${c.bd}`,padding:16,display:"flex",flexDirection:"column",gap:8,animation:"fadeIn 0.2s"}}>
    {li&&<><button onClick={()=>go("dash")} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"none",background:c.bgS,color:c.tx,cursor:"pointer",fontSize:14,fontWeight:500,textAlign:"left"}}>Dashboard</button><button onClick={()=>go("consult")} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"none",background:c.bgS,color:c.tx,cursor:"pointer",fontSize:14,fontWeight:500,textAlign:"left"}}>New Consultation</button></>}
    <button onClick={()=>{setDm(!dm);setMo(false);}} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"none",background:c.bgS,color:c.tx,cursor:"pointer",fontSize:14,fontWeight:500,textAlign:"left"}}>{dm?"Light Mode":"Dark Mode"}</button>
    {li?<button onClick={logout} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"none",background:c.bgS,color:c.tx,cursor:"pointer",fontSize:14,fontWeight:500,textAlign:"left"}}>Sign Out</button>
    :<button onClick={()=>go("login")} style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"none",background:c.bgS,color:c.tx,cursor:"pointer",fontSize:14,fontWeight:500,textAlign:"left"}}>Sign In</button>}
  </div>}
  </nav>

  {/* LANDING */}
  {pg==="landing"&&<div>
    <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:c.hero,position:"relative",overflow:"hidden",padding:"100px 24px 60px"}}>
      <div style={{position:"absolute",inset:0,opacity:dm?0.03:0.04,backgroundImage:`radial-gradient(${c.pr} 1px,transparent 1px)`,backgroundSize:"40px 40px"}}/>
      <div style={{position:"absolute",top:"20%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${c.pr}15,transparent 70%)`,filter:"blur(60px)",pointerEvents:"none"}}/>
      <div style={{maxWidth:800,textAlign:"center",position:"relative",zIndex:1,animation:"fadeInUp 0.8s ease"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 20px",borderRadius:100,background:c.prL,border:`1px solid ${c.pr}30`,fontSize:13,fontWeight:600,color:c.pr,marginBottom:32}}><I.Shield/> HIPAA Compliant · Secure · AI-Powered</div>
        <h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(36px,6vw,68px)",lineHeight:1.1,fontWeight:400,marginBottom:24,letterSpacing:"-0.02em"}}>AI-Powered Medical Assistant for{" "}<span style={{background:`linear-gradient(135deg,${c.pr},${c.ac})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Smarter Diagnoses</span></h1>
        <p style={{fontSize:"clamp(16px,2vw,20px)",color:c.txM,lineHeight:1.7,maxWidth:600,margin:"0 auto 40px"}}>Collect patient data, analyze symptoms, generate differential diagnoses, and create structured medical reports — all powered by advanced AI, designed for clinicians.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <Bt c={c} onClick={()=>go("login")} style={{padding:"16px 36px",fontSize:16}}>Start Consultation <I.Right/></Bt>
          <Bt c={c} v="outline" onClick={()=>document.getElementById("feat")?.scrollIntoView({behavior:"smooth"})} style={{padding:"16px 36px",fontSize:16}}>Learn More</Bt>
        </div>
      </div>
    </section>
    <section id="feat" style={{padding:"100px 24px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:64}}><h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(28px,4vw,42px)",fontWeight:400,marginBottom:16}}>Built for Clinical Excellence</h2><p style={{color:c.txM,fontSize:17,maxWidth:500,margin:"0 auto"}}>Every feature designed with practicing physicians in mind.</p></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24}}>
        {[{i:<I.Clip/>,t:"Smart Data Collection",d:"Structured multi-step forms capture comprehensive patient data efficiently."},{i:<I.Activity/>,t:"AI Symptom Analysis",d:"Advanced algorithms analyze symptoms and suggest differential diagnoses."},{i:<I.FileText/>,t:"Report Generation",d:"Generate detailed, structured medical reports ready for clinical use."},{i:<I.Shield/>,t:"HIPAA Compliant",d:"Enterprise-grade security ensures all patient data remains protected."}].map((f,i)=>
          <Cd key={i} c={c} style={{padding:32,animation:`fadeInUp 0.6s ease ${i*0.1}s both`}}><div style={{width:52,height:52,borderRadius:14,background:`linear-gradient(135deg,${c.pr}20,${c.ac}20)`,display:"flex",alignItems:"center",justifyContent:"center",color:c.pr,marginBottom:20}}>{f.i}</div><h3 style={{fontSize:18,fontWeight:600,marginBottom:10}}>{f.t}</h3><p style={{color:c.txM,fontSize:14,lineHeight:1.7}}>{f.d}</p></Cd>
        )}
      </div>
    </section>
    <section style={{padding:"60px 24px 100px",maxWidth:800,margin:"0 auto",textAlign:"center"}}><Cd c={c} style={{padding:"40px 32px",background:dm?"rgba(77,166,255,0.06)":"rgba(43,125,233,0.04)",border:`1px solid ${c.pr}20`}}><I.Lock/><h3 style={{fontSize:20,fontWeight:600,marginTop:16,marginBottom:12}}>Data Privacy & HIPAA Compliance</h3><p style={{color:c.txM,fontSize:14,lineHeight:1.8,maxWidth:600,margin:"0 auto"}}>MedAI adheres to HIPAA regulations and industry best practices. All data encrypted in transit and at rest. Access restricted to authorized healthcare professionals. No patient data used for AI training.</p></Cd></section>
    <footer style={{borderTop:`1px solid ${c.bd}`,padding:"32px 24px",textAlign:"center",color:c.txL,fontSize:13}}>© 2026 MedAI. All rights reserved.</footer>
  </div>}

  {/* LOGIN */}
  {pg==="login"&&<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:c.hero,padding:"100px 24px 60px"}}>
    <Cd c={c} style={{width:"100%",maxWidth:420,padding:"48px 36px",animation:"fadeInUp 0.6s ease"}}>
      <div style={{textAlign:"center",marginBottom:32}}><div style={{width:56,height:56,borderRadius:16,margin:"0 auto 20px",background:`linear-gradient(135deg,${c.pr},${c.ac})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><I.Lock/></div><h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,marginBottom:8}}>Welcome Back</h2><p style={{color:c.txM,fontSize:14}}>Sign in to access your medical dashboard</p></div>
      <form onSubmit={login} style={{display:"flex",flexDirection:"column",gap:20}}>
        <Inp c={c} label="Email" type="email" placeholder="doctor@hospital.com" value={lf.e} onChange={e=>setLf(p=>({...p,e:e.target.value}))}/>
        <Inp c={c} label="Password" type="password" placeholder="••••••••" value={lf.p} onChange={e=>setLf(p=>({...p,p:e.target.value}))}/>
        {le&&<div style={{color:c.dn,fontSize:13,textAlign:"center"}}>{le}</div>}
        <Bt c={c} onClick={login} style={{width:"100%",justifyContent:"center",marginTop:8}}>Sign In</Bt>
      </form>
      <p style={{textAlign:"center",marginTop:24,fontSize:13,color:c.txL}}>Demo: enter any email & password</p>
    </Cd>
  </div>}

  {/* DASHBOARD */}
  {pg==="dash"&&<div style={{minHeight:"100vh",padding:"88px 24px 60px",maxWidth:1200,margin:"0 auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:40,flexWrap:"wrap",gap:16,animation:"fadeIn 0.5s"}}>
      <div><h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(28px,4vw,36px)",fontWeight:400,marginBottom:8}}>Good {hr<12?"Morning":hr<18?"Afternoon":"Evening"}, Doctor</h1><p style={{color:c.txM,fontSize:15}}>Here's an overview of your recent activity.</p></div>
      <Bt c={c} onClick={rst}><I.Plus/> New Consultation</Bt>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,marginBottom:40}}>
      {[{l:"Total Patients",v:"1,248",i:<I.User/>,cl:c.pr},{l:"Reports Generated",v:"856",i:<I.FileText/>,cl:c.ac},{l:"This Week",v:"23",i:<I.Activity/>,cl:"#e67700"},{l:"Pending Review",v:"4",i:<I.Clock/>,cl:c.dn}].map((s,i)=>
        <Cd key={i} c={c} style={{padding:24,animation:`fadeInUp 0.5s ease ${i*0.08}s both`}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}><span style={{fontSize:13,fontWeight:600,color:c.txM,textTransform:"uppercase",letterSpacing:"0.03em"}}>{s.l}</span><div style={{color:s.cl,opacity:0.7}}>{s.i}</div></div><div style={{fontSize:30,fontWeight:700}}>{s.v}</div></Cd>
      )}
    </div>
    <Cd c={c} style={{animation:"fadeInUp 0.6s ease 0.3s both"}}>
      <div style={{padding:"24px 28px",borderBottom:`1px solid ${c.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
        <h3 style={{fontSize:18,fontWeight:600}}>Recent Patient Reports</h3>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderRadius:10,border:`1px solid ${c.bd}`,background:c.bgS}}><I.Search/><input type="text" placeholder="Search patients..." value={sq} onChange={e=>setSq(e.target.value)} style={{border:"none",background:"transparent",color:c.tx,outline:"none",fontSize:14,width:180,fontFamily:"'DM Sans',sans-serif"}}/></div>
      </div>
      <div style={{overflow:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:600}}>
        <thead><tr>{["Patient","Date","Diagnosis","Status"].map(h=><th key={h} style={{padding:"14px 28px",textAlign:"left",fontSize:12,fontWeight:600,color:c.txL,textTransform:"uppercase",letterSpacing:"0.05em",borderBottom:`1px solid ${c.bd}`}}>{h}</th>)}</tr></thead>
        <tbody>{fr.map(r=><tr key={r.id} style={{borderBottom:`1px solid ${c.bdL}`,cursor:"pointer"}}><td style={{padding:"16px 28px",fontWeight:500}}>{r.pn}</td><td style={{padding:"16px 28px",color:c.txM,fontSize:14}}>{r.dt}</td><td style={{padding:"16px 28px",fontSize:14}}>{r.dx}</td><td style={{padding:"16px 28px"}}><span style={{padding:"4px 12px",borderRadius:100,fontSize:12,fontWeight:600,background:r.st==="Completed"?`${c.ac}18`:`${c.wr}18`,color:r.st==="Completed"?c.ac:c.wr}}>{r.st}</span></td></tr>)}</tbody>
      </table></div>
    </Cd>
  </div>}

  {/* CONSULTATION */}
  {pg==="consult"&&<div style={{minHeight:"100vh",padding:"88px 24px 60px",maxWidth:720,margin:"0 auto"}}>
    <div style={{animation:"fadeIn 0.5s",marginBottom:40}}><h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(24px,4vw,32px)",fontWeight:400,marginBottom:8}}>Patient Consultation</h1><p style={{color:c.txM,fontSize:15}}>Collect comprehensive patient data for AI analysis.</p></div>
    <div style={{marginBottom:40}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        {["Basic Information","Medical History","Current Symptoms"].map((l,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,color:i<=st?c.pr:c.txL,fontSize:13,fontWeight:i===st?600:400}}><div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,background:i<st?c.pr:i===st?c.prL:c.bgS,color:i<st?"#fff":i===st?c.pr:c.txL,border:i===st?`2px solid ${c.pr}`:"2px solid transparent"}}>{i<st?<I.Check/>:i+1}</div><span className="stl">{l}</span></div>)}
      </div>
      <div style={{height:4,borderRadius:4,background:c.bgS,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:`linear-gradient(90deg,${c.pr},${c.ac})`,width:`${((st+1)/3)*100}%`,transition:"width 0.5s"}}/></div>
    </div>
    <Cd c={c} style={{padding:"36px 32px",animation:"fadeIn 0.4s ease 0.2s both"}}>
      {st===0&&<div style={{display:"flex",flexDirection:"column",gap:20}}>
        <h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>Basic Information</h3>
        <Inp c={c} label="Full Name" placeholder="Patient full name" value={fd.fn} onChange={e=>uf("fn",e.target.value)} error={er.fn}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Inp c={c} label="Age" type="number" placeholder="Age" value={fd.age} onChange={e=>uf("age",e.target.value)} error={er.age}/>
          <Sel c={c} label="Gender" value={fd.gen} onChange={e=>uf("gen",e.target.value)} options={[{value:"",label:"Select..."},{value:"Male",label:"Male"},{value:"Female",label:"Female"},{value:"Other",label:"Other"}]} error={er.gen}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Inp c={c} label="Weight (kg)" type="number" placeholder="kg" value={fd.wt} onChange={e=>uf("wt",e.target.value)}/>
          <Inp c={c} label="Height (cm)" type="number" placeholder="cm" value={fd.ht} onChange={e=>uf("ht",e.target.value)}/>
        </div>
        <Inp c={c} label="Known Allergies" placeholder="e.g., Penicillin, Latex..." value={fd.al} onChange={e=>uf("al",e.target.value)}/>
        <Inp c={c} label="Current Medications" placeholder="e.g., Metformin 500mg..." value={fd.med} onChange={e=>uf("med",e.target.value)}/>
      </div>}
      {st===1&&<div style={{display:"flex",flexDirection:"column",gap:20}}>
        <h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>Medical History</h3>
        <Ta c={c} label="Chronic Diseases" placeholder="e.g., Type 2 Diabetes, Hypertension..." value={fd.ch} onChange={e=>uf("ch",e.target.value)}/>
        <Ta c={c} label="Previous Surgeries" placeholder="e.g., Appendectomy 2018..." value={fd.su} onChange={e=>uf("su",e.target.value)}/>
        <Ta c={c} label="Family Medical History" placeholder="e.g., Father - Heart Disease..." value={fd.fh} onChange={e=>uf("fh",e.target.value)}/>
      </div>}
      {st===2&&<div style={{display:"flex",flexDirection:"column",gap:20}}>
        <h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>Current Symptoms</h3>
        <Ta c={c} label="Symptom Description" placeholder="Describe the patient's current symptoms..." value={fd.sym} onChange={e=>uf("sym",e.target.value)} error={er.sym}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Inp c={c} label="Duration" placeholder="e.g., 5 days" value={fd.dur} onChange={e=>uf("dur",e.target.value)} error={er.dur}/>
          <Sel c={c} label="Fever" value={fd.fev} onChange={e=>uf("fev",e.target.value)} options={[{value:"No",label:"No"},{value:"Yes",label:"Yes"}]}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <label style={{fontSize:13,fontWeight:600,color:c.txM,textTransform:"uppercase"}}>Severity: <span style={{color:fd.sev>7?c.dn:fd.sev>4?c.wr:c.ac}}>{fd.sev}/10</span></label>
          <input type="range" min="1" max="10" value={fd.sev} onChange={e=>uf("sev",+e.target.value)} style={{width:"100%",accentColor:c.pr}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:c.txL}}><span>Mild</span><span>Moderate</span><span>Severe</span></div>
        </div>
        <Sel c={c} label="Pain Location" value={fd.pl} onChange={e=>uf("pl",e.target.value)} options={[{value:"",label:"Select location..."},...PL.map(p=>({value:p,label:p}))]}/>
        <Ta c={c} label="Additional Notes" placeholder="Any other observations..." value={fd.nt} onChange={e=>uf("nt",e.target.value)}/>
      </div>}
      <div style={{display:"flex",justifyContent:"space-between",marginTop:32,paddingTop:24,borderTop:`1px solid ${c.bd}`}}>
        <Bt c={c} v="ghost" onClick={pv} disabled={st===0}><I.Left/> Back</Bt>
        {st<2?<Bt c={c} onClick={nx}>Next <I.Right/></Bt>:<Bt c={c} onClick={sub}><I.Activity/> Analyze Symptoms</Bt>}
      </div>
    </Cd>
    <Cd c={c} style={{marginTop:24,padding:20}}><details><summary style={{cursor:"pointer",fontSize:13,fontWeight:600,color:c.txM}}>View JSON Output</summary><pre style={{marginTop:12,padding:16,borderRadius:10,background:c.bgS,fontSize:12,overflow:"auto",color:c.txM,lineHeight:1.6,maxHeight:300}}>{JSON.stringify(fd,null,2)}</pre></details></Cd>
  </div>}

  {/* ANALYSIS */}
  {pg==="analysis"&&<div style={{minHeight:"100vh",padding:"88px 24px 60px",maxWidth:900,margin:"0 auto"}}>
    {as==="loading"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"60vh",animation:"fadeIn 0.5s"}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:`linear-gradient(135deg,${c.pr}20,${c.ac}20)`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32,animation:"heartbeat 1.5s ease infinite"}}><div style={{color:c.pr}}><I.Activity/></div></div>
      <h2 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:28,fontWeight:400,marginBottom:16}}>Analyzing Patient Data</h2>
      <p style={{color:c.txM,fontSize:15,marginBottom:32}}>Processing symptoms, medical history, and clinical indicators...</p>
      <div style={{display:"flex",gap:8}}>{[0,1,2].map(i=><div key={i} style={{width:12,height:12,borderRadius:"50%",background:c.pr,animation:`dotPulse 1.4s ease ${i*0.2}s infinite`}}/>)}</div>
    </div>}
    {as==="done"&&ar&&<div style={{animation:"fadeInUp 0.6s"}}>
      <div style={{marginBottom:40}}><h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(24px,4vw,32px)",fontWeight:400,marginBottom:8}}>AI Analysis Results</h1><p style={{color:c.txM,fontSize:15}}>Patient: <strong>{fd.fn}</strong> · {fd.age} y/o {fd.gen}</p></div>
      <Cd c={c} style={{padding:"28px 32px",marginBottom:24}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:20,display:"flex",alignItems:"center",gap:10}}><span style={{color:c.pr}}><I.Brain/></span> Possible Diagnoses</h3><div style={{display:"flex",flexDirection:"column",gap:16}}>{ar.dx.map((d,i)=><div key={i} style={{animation:`slideIn 0.4s ease ${i*0.1}s both`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span style={{fontWeight:600,fontSize:15}}>{i+1}. {d.n}</span><span style={{fontWeight:700,fontSize:14,color:d.p>60?c.pr:d.p>40?c.wr:c.txM}}>{d.p}%</span></div><div style={{height:8,borderRadius:4,background:c.bgS,overflow:"hidden",marginBottom:6}}><div style={{height:"100%",borderRadius:4,background:d.p>60?`linear-gradient(90deg,${c.pr},${c.ac})`:d.p>40?c.wr:c.txL,width:`${d.p}%`,transition:"width 1s"}}/></div><p style={{fontSize:13,color:c.txM}}>{d.d}</p></div>)}</div></Cd>
      <Cd c={c} style={{padding:"28px 32px",marginBottom:24}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,display:"flex",alignItems:"center",gap:10}}><span style={{color:c.ac}}><I.Clip/></span> Suggested Lab Tests</h3><div style={{display:"flex",flexDirection:"column",gap:10}}>{ar.lt.map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:10,background:c.bgS,animation:`slideIn 0.4s ease ${i*0.08}s both`}}><div style={{width:8,height:8,borderRadius:"50%",background:c.ac,flexShrink:0}}/><span style={{fontSize:14}}>{t}</span></div>)}</div></Cd>
      {ar.rf.length>0&&<Cd c={c} style={{padding:"28px 32px",marginBottom:24,background:c.dnB,border:`1px solid ${c.dn}25`}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,display:"flex",alignItems:"center",gap:10,color:c.dn}}><I.Warn/> Red-Flag Warnings</h3><div style={{display:"flex",flexDirection:"column",gap:10}}>{ar.rf.map((f,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 16px",borderRadius:10,background:dm?"rgba(255,107,107,0.08)":"rgba(224,49,49,0.05)"}}><span style={{color:c.dn,marginTop:2}}>⚠</span><span style={{fontSize:14}}>{f}</span></div>)}</div></Cd>}
      <Cd c={c} style={{padding:"28px 32px",marginBottom:24}}><h3 style={{fontSize:16,fontWeight:600,marginBottom:16,display:"flex",alignItems:"center",gap:10}}><span style={{color:c.pr}}><I.Right/></span> Suggested Next Steps</h3><div style={{display:"flex",flexDirection:"column",gap:10}}>{ar.ns.map((s,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 16px",borderRadius:10,background:c.bgS}}><span style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:c.prL,color:c.pr,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{i+1}</span><span style={{fontSize:14,lineHeight:1.6}}>{s}</span></div>)}</div></Cd>
      <Cd c={c} style={{padding:"24px 32px",marginBottom:24,background:c.wrB,border:`1px solid ${c.wr}20`}}><p style={{fontSize:13,color:c.wr,fontWeight:500,lineHeight:1.7}}>⚕ <strong>Disclaimer:</strong> This AI tool assists clinical decision-making and does not replace professional medical judgment.</p></Cd>
      <div style={{display:"flex",justifyContent:"center"}}><Bt c={c} onClick={()=>go("report")} style={{padding:"16px 40px",fontSize:16}}><I.FileText/> Generate Medical Report</Bt></div>
    </div>}
  </div>}

  {/* REPORT */}
  {pg==="report"&&<div style={{minHeight:"100vh",padding:"88px 24px 60px",maxWidth:800,margin:"0 auto"}}>
    <div style={{animation:"fadeInUp 0.6s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32,flexWrap:"wrap",gap:16}}>
        <div><h1 style={{fontFamily:"'Instrument Serif',Georgia,serif",fontSize:"clamp(24px,4vw,32px)",fontWeight:400,marginBottom:8}}>Medical Report</h1><p style={{color:c.txM,fontSize:14}}>Generated on {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</p></div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <Bt c={c} v="ghost" onClick={cpRep} style={{padding:"10px 18px",fontSize:13}}>{cp?<><I.Check/> Copied!</>:<><I.Copy/> Copy</>}</Bt>
          <Bt c={c} v="ghost" onClick={()=>alert("Report saved.")} style={{padding:"10px 18px",fontSize:13}}><I.Save/> Save</Bt>
          <Bt c={c} onClick={()=>window.print()} style={{padding:"10px 18px",fontSize:13}}><I.Down/> Download PDF</Bt>
        </div>
      </div>
      <Cd c={c} style={{padding:"40px 36px"}}>
        <div style={{textAlign:"center",marginBottom:32,paddingBottom:24,borderBottom:`2px solid ${c.pr}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:12}}><div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${c.pr},${c.ac})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}><I.Steth/></div><span style={{fontSize:20,fontWeight:700}}>Med<span style={{color:c.pr}}>AI</span></span></div>
          <h2 style={{fontSize:22,fontWeight:600,marginBottom:4}}>MEDICAL REPORT</h2>
          <p style={{fontSize:13,color:c.txM}}>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <RS t="Patient Information" c={c}><RR c={c} l="Full Name" v={fd.fn}/><RR c={c} l="Age" v={fd.age}/><RR c={c} l="Gender" v={fd.gen}/><RR c={c} l="Weight" v={fd.wt?fd.wt+" kg":"N/A"}/><RR c={c} l="Height" v={fd.ht?fd.ht+" cm":"N/A"}/><RR c={c} l="Allergies" v={fd.al||"None"}/><RR c={c} l="Medications" v={fd.med||"None"}/></RS>
        <RS t="Medical History" c={c}><RR c={c} l="Chronic Diseases" v={fd.ch||"None"}/><RR c={c} l="Previous Surgeries" v={fd.su||"None"}/><RR c={c} l="Family History" v={fd.fh||"None"}/></RS>
        <RS t="Presenting Symptoms" c={c}><RR c={c} l="Description" v={fd.sym}/><RR c={c} l="Duration" v={fd.dur}/><RR c={c} l="Severity" v={fd.sev+"/10"}/><RR c={c} l="Fever" v={fd.fev}/><RR c={c} l="Pain Location" v={fd.pl||"Not specified"}/>{fd.nt&&<RR c={c} l="Notes" v={fd.nt}/>}</RS>
        <RS t="AI Differential Diagnosis" c={c}>{ar?.dx.map((d,i)=><div key={i} style={{padding:"10px 0",borderBottom:i<ar.dx.length-1?`1px solid ${c.bdL}`:"none"}}><span style={{fontWeight:600}}>{i+1}. {d.n}</span><span style={{color:c.txM,marginLeft:8}}>— {d.p}%</span><p style={{fontSize:13,color:c.txM,marginTop:4}}>{d.d}</p></div>)}</RS>
        <RS t="Recommended Investigations" c={c}>{ar?.lt.map((t,i)=><div key={i} style={{padding:"6px 0",fontSize:14}}>• {t}</div>)}</RS>
        <RS t="Clinical Notes" c={c}><textarea value={cn} onChange={e=>setCn(e.target.value)} placeholder="Add clinical notes here..." style={{width:"100%",minHeight:120,padding:16,borderRadius:10,border:`1.5px solid ${c.bd}`,background:c.bgS,color:c.tx,fontSize:14,resize:"vertical",outline:"none",fontFamily:"'DM Sans',sans-serif",lineHeight:1.7}}/></RS>
        <div style={{marginTop:40,paddingTop:24,borderTop:`1px solid ${c.bd}`}}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:40}}><div><p style={{fontSize:13,color:c.txM,marginBottom:32}}>Doctor Signature:</p><div style={{width:200,borderBottom:`2px solid ${c.tx}`}}/></div><div><p style={{fontSize:13,color:c.txM,marginBottom:8}}>Date:</p><p style={{fontWeight:500}}>{new Date().toLocaleDateString()}</p></div></div></div>
        <div style={{marginTop:32,padding:16,borderRadius:10,background:c.wrB,border:`1px solid ${c.wr}20`}}><p style={{fontSize:12,color:c.wr,lineHeight:1.7}}>⚕ <strong>Disclaimer:</strong> This AI-generated report assists clinical decision-making and does not replace professional medical judgment.</p></div>
      </Cd>
    </div>
  </div>}

  </div>);
}
