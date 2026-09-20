import {NextResponse} from 'next/server'
import pdf from 'pdf-parse'

export async function POST(req:Request){
 try{
  const form=await req.formData()
  const file=form.get('file') as File
  if(!file) return NextResponse.json({error:'No file'},{status:400})

  const buffer=Buffer.from(await file.arrayBuffer())
  const pdfData=await pdf(buffer)
  const text=pdfData.text.slice(0,12000)

  const key=process.env.DEEPSEEK_API_KEY

  if(!key){
   return NextResponse.json({
    analysis:
`PDF extracted successfully.

Preview:
${text.slice(0,3000)}

AI model is not connected yet.
Please add DEEPSEEK_API_KEY in Vercel Environment Variables.`
   })
  }

  const response=await fetch('https://api.deepseek.com/chat/completions',{
   method:'POST',
   headers:{
    'Content-Type':'application/json',
    'Authorization':`Bearer ${key}`
   },
   body:JSON.stringify({
    model:'deepseek-chat',
    messages:[
     {role:'system',content:'You are a scientific literature assistant. Analyze papers with Summary, PICO, Methods, Results, Limitations and Evidence Matrix.'},
     {role:'user',content:text}
    ]
   })
  })

  const json=await response.json()
  return NextResponse.json({
   analysis:json.choices?.[0]?.message?.content || JSON.stringify(json)
  })
 }catch(e:any){
  return NextResponse.json({error:e.message},{status:500})
 }
}
