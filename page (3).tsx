'use client'

import {useState} from 'react'

export default function Literature(){
 const [file,setFile]=useState<File|null>(null)
 const [result,setResult]=useState('')
 const [loading,setLoading]=useState(false)

 async function analyze(){
  if(!file) return alert('Please upload a PDF')
  setLoading(true)
  const form=new FormData()
  form.append('file',file)
  const res=await fetch('/api/analyze',{method:'POST',body:form})
  const data=await res.json()
  setResult(data.analysis || data.error || 'No result')
  setLoading(false)
 }

 return <main className="main">
  <h1>📚 Literature Intelligence</h1>
  <div className="card">
   <h2>Upload Paper</h2>
   <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)}/>
   <br/><br/>
   <button onClick={analyze}>{loading?'Analyzing...':'Analyze Paper'}</button>
   <p>Pipeline: PDF Parser → AI Summary → PICO → Evidence Matrix</p>
   {result && <div className="card"><pre style={{whiteSpace:'pre-wrap'}}>{result}</pre></div>}
  </div>
 </main>
}
