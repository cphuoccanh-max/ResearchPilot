export default function Settings(){
return <main className="main">
<h1>⚙ AI Provider</h1>
<div className="card">
<select>
<option>DeepSeek (Default)</option>
<option>Claude</option>
<option>OpenAI Compatible</option>
</select>
<p>Strategy:</p>
<p>Short tasks → DeepSeek</p>
<p>Long PDF reasoning → Claude</p>
</div>
</main>
}