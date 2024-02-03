import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import Latex from 'react-latex-next';

export interface FormatarProps {
	e: string
}
//let al = Math.floor(100000*Math.random())%1000

export default function Formatar({e}: FormatarProps) {

	function lmath(i: number, str: string, b: boolean) {
		if (b) 
			return <TeX settings={{ macros: { '\\sen': '\\mathrm{sen}' } }} key={"lm_"+i} block>{str}</TeX>
		return <TeX settings={{ macros: { '\\sen': '\\mathrm{sen}' } }} key={"lm_"+i}>{str}</TeX>
	}

	function ltext(i: number, str: string){
		return <Latex key={"lt_"+i}>{str.trim()+ "$~$"}</Latex>
	}

	function formatar(): JSX.Element{
		let a = "";
		let b = false;
		const h = []
		console.log(e)
		for (let j = 0; j < e.length; j++) {
			const i = e[j]
			console.log(a)
			if(i === "$" && !b) {
				b = true
				h.push(ltext(h.length, a))
				a = ""
			}else if(i === "$" && b && a.trim().length > 0){
				b = false
				if (e[j+1] === "$") {
					j++
					h.push(lmath(h.length, a.trim()+ "~", true))
				} else {
					h.push(lmath(h.length, a.trim()+ "~", false))
				}
				
				a = ""
			}else if(("[" === i || "(" === i ) && (a[a.length -1] === "\\")) {
				h.push(ltext(h.length, a.slice(0, -1)))
				a = ""
			}else if(("]" === i || ")" === i ) && (a[a.length -1] === "\\")) {
				a = ""
				h.push(lmath(h.length, a.slice(0,-1), i === ']'))
			}else if(i !== "$"){
				a += i
			}
		}
		if(a.length > 0)
			h.push(ltext(h.length, a))
		return <>{h.map(e => e)}</>
	}

	return formatar()
}