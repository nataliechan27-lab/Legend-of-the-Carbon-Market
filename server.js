// 碳市傳奇 排行榜後端（Node.js + Express）
// 部署方式：
//   1. npm install express cors
//   2. node server.js
//   3. 把遊戲裡的 LEADERBOARD_URL 改成你的網址
//   4. 可部署到 Render / Railway / Fly.io 免費方案
const express=require('express');
const cors=require('cors');
const fs=require('fs');
const app=express();
app.use(cors());
app.use(express.json());

const DB='scores.json';
function load(){try{return JSON.parse(fs.readFileSync(DB,'utf8'));}catch{return [];}}
function save(d){fs.writeFileSync(DB,JSON.stringify(d,null,2));}

app.get('/top',(req,res)=>{
  const arr=load().sort((a,b)=>b.score-a.score).slice(0,20);
  res.json(arr);
});

app.post('/submit',(req,res)=>{
  const {name,score}=req.body||{};
  if(typeof score!=='number'||!isFinite(score))return res.status(400).json({err:'bad score'});
  const arr=load();
  arr.push({name:String(name||'匿名').slice(0,12),score:Math.round(score),ts:Date.now()});
  arr.sort((a,b)=>b.score-a.score);
  save(arr.slice(0,100));
  res.json({ok:true});
});

app.listen(process.env.PORT||3000,()=>console.log('Leaderboard on :3000'));
//(註：內容由 AI 生成)
