import React, { useState, useEffect } from 'react';
import { perguntas, temas } from '../model/Filtro'
import Formatar from '../model/Formata';
import '../model/css/Quiz.css';


export interface InsertsProps {
	per: string
	opc: string[]
	res: string
	exp: string
}
interface temas{
    id: number
    tema: string
}

type InsertsState = {
	p: number,
	d: string,
	t: string,
	r: Record<string, Record<string, temas[]>>,
    showScore: boolean,
    data: InsertsProps | null
}

let cur = ""
let al = Math.floor(100000*Math.random())%1000
const st : InsertsState = {p: -1, d: "", r: {}, t: "", showScore: false, data: null}

export default function Inserts() {
	const [state, setState] = useState(st)
    
	
	let _cur = window.location.href.split("/")[3]
	_cur = _cur === '' ? "engcomp" : _cur

	useEffect(() => {
		const fetchData = async () => {
		  try {
			if(cur !== _cur){
				cur = _cur
				const r = (await temas(""))?.data
                console.log(r, cur)
				setState(e =>({...e, p: -1, d: "", t: "", r: r, showScore: false}))
				al = Math.floor(100000*Math.random())%1000
			}
		  } catch (error) {
			console.error('Erro ao obter dados:', error);
		  }
		};
	
		fetchData();
	  }, []);


	function primeiro(n: number) {
		al = Math.floor(100000*Math.random())%1000
		setState((e) => ({ ...e, p: n, d: "", t: "" }))
	}

	async function sel_tem(n: string): Promise<void> {
        console.log(n)
		setState((e) => ({ ...e, t: n, showScore: true}))
	}
	
	function num_al(n: number): number{
		return al +n
	}
	
	function selects() {

		const periodoOptions =  []

		for(const i in state.r){
			periodoOptions.push(<option key={"p_" + num_al(parseInt(i)+10)} value={i}>{(i)+"º"}</option>)
		}

		const disciplinaOptions = []
		
		if(state.p < 0){
			disciplinaOptions.push(<option key={"pd_" + num_al(1)} value="" disabled selected>Disciplinas</option>)
		}else{
			disciplinaOptions.push(<option key={"pd_" + num_al(2)} value="" disabled selected>Disciplinas</option>)
			for(const i in state.r[state.p]){
				disciplinaOptions.push(<option key={"d_" + i}>{i}</option>)
			}
		}

		const temaOptions = []

		if(state.d.length === 0){
			temaOptions.push(<option key={"t_" + num_al(3)} value="" disabled selected>Temas</option>)
		}else{
            console.log("------------")
			temaOptions.push(<option key={"t_" + num_al(4)} value="" disabled selected>Temas</option>)
			for(const i of state.r[state.p][state.d]){
                console.log(i)
				temaOptions.push(<option value = {i.id} key={"t_" + num_al(i.id)}>{i.tema}</option>)
			}
		}
	  
		return (
		  <>
			<select className='s_periodo' onChange={e => primeiro(parseInt(e.target.value))}>
			  <option key={"pd_" + num_al(5)} value="" disabled selected>Períodos</option>
			  {periodoOptions}
			</select>
	  
			<select onChange={el => setState((e) => ({ ...e, d: el.target.value }))}>
			  {disciplinaOptions}
			</select>
	  
			<select onChange={e => sel_tem(e.target.value)}>
			  {temaOptions}
			</select>
		  </>
		);
	}

    function atualiza(el: string, val: string) {
        if (!el.includes("opc")) {
            setState((e) => ({
                ...e,
                data: {
                    ...e.data,
                    ...(e.data && { [el]: val }) // Garante que e.data existe antes de atualizar
                }
            }));
        }
        console.log(state.data)
    }

	return (
		<>
			<div className="teste">
				<div className="salvar" />
				<div className="seila4">
					<div className="slides">
						<div className="intervalo">Inserts</div>
						<div className='escolhe'>
						{selects()}
						</div>
							
						<div className='quiz-content'>
							<div className='app'>
							{state.t.length == 0? " " : state.showScore ? (
                                <>
								<div className='add-content'>
									<div className='in-section'>
                                        <label htmlFor="pergunta">Perguntas</label>
                                        <textarea id="pergunta" className='per' name="pergunta" onChange={e => atualiza("per",e.target.value)}></textarea>
                                        <label htmlFor="resposta">Resposta</label>
                                        <textarea id="resposta" className='opc' name="resposta" onChange={e => atualiza("res",e.target.value)}></textarea>
                                        <label htmlFor="opcao1">Opção 1</label>
                                        <textarea id="opcao1" className='opc' name="opcao1" onChange={e => atualiza("opc1",e.target.value)}></textarea>
                                        <label htmlFor="opcao2">Opção 2</label>
                                        <textarea id="opcao2" className='opc' name="opcao2"onChange={e => atualiza("opc2",e.target.value)}></textarea>
                                        <label htmlFor="opcao3">Opção 3</label>
                                        <textarea id="opcao3" className='opc' name="opcao3" onChange={e => atualiza("opc3",e.target.value)}></textarea>
                                        <label htmlFor="explica">Explicação</label>
                                        <textarea id="explica" className='per' name="explica" onChange={e => atualiza("exp",e.target.value)}></textarea>
                                        <button className='res' onClick={() => sel_tem(state.t)}>{"Salvar"}</button>    
									</div>
									<div className='out-section'>
                                        <div className="pergunta" ><Formatar e={state.data?state.data.per: ""}/></div>
                                        <div className="resposta" ><Formatar e={""}/></div>
                                        <div className="opcao" ><Formatar e={""}/></div>
                                        <div className="opcao" ><Formatar e={""}/></div>
                                        <div className="opcao" ><Formatar e={""}/></div>
                                        <div className="explica" ><Formatar e={""}/></div>
									</div>
								</div>
                                
                                </>
							) : (
								<div className='score-section'>
									Ainda não temos questões com este tema
								</div>
							)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}