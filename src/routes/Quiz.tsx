import React, { useState, useEffect } from 'react';
import { perguntas, temas } from '../model/Filtro'
import Formatar from '../model/Formata';
import '../model/css/Quiz.css';


export interface QuizProps {
	per: string
	opc: string[]
	res: string
	exp: string
}

type QuizState = {
	p: number,
	d: string,
	t: string,
	m: string[],
	r: QuizProps[],
    currentQ: number,
    showScore: boolean,
    score: number,
}

let cur = ""
let questions: QuizProps[] = []
let al = Math.floor(100000*Math.random())%1000
let id = 0
let r = ["A", "B", "C", "D", "E", "F"]
let correta = false
const st : QuizState = {p: -1, d: "", t: "", m: [], r: [], currentQ: 0, showScore: false, score: 0}

export default function Quiz() {
	const [state, setState] = useState(st)
	
	let _cur = window.location.href.split("/")[3]
	_cur = _cur === '' ? "engcomp" : _cur

	useEffect(() => {
		const fetchData = async () => {
		  try {
			if(cur !== _cur){
				cur = _cur
				id = 0
				const r = (await temas(_cur))?.data
				console.log(r)
				setState(e =>({...e, p: -1, d: "", t: "", r: r, currentQ: 0, showScore: false, score: 0}))
				al = Math.floor(100000*Math.random())%1000
			}
		  } catch (error) {
			console.error('Erro ao obter dados:', error);
		  }
		};
	
		fetchData();
	  }, []);

	function handleAnswerOptionClick(re: string) {
		correta = state.currentQ < questions.length && re === questions[state.currentQ].res

		id++;
		if (Math.floor((id)/2) >= questions.length) {
			setState(e =>({...e, showScore: true}))
			id = 0
		}else if ((id)%2 === 0) {
			setState(e =>({...e, score: correta? e.score + 1: e.score}))
		}else {
			setState(e =>({...e, currentQ: e.currentQ + 1,  score: correta? e.score + 1: e.score}))
		}
	}

	function primeiro(n: number) {
		al = Math.floor(100000*Math.random())%1000
		questions = []
		setState((e) => ({ ...e, p: n, d: "", t: "" }))
	}

	async function sel_tem(n: string): Promise<void> {
		questions = (await perguntas(_cur, n))?.data
		setState((e) => ({ ...e, t: n, showScore: false, currentQ: 0, score: 0}))
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
			temaOptions.push(<option key={"t_" + num_al(4)} value="" disabled selected>Temas</option>)
			for(const i of state.r[state.p][state.d]){
				temaOptions.push(<option key={"t_" + i}>{i}</option>)
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
	
	function resp() {
		const previousQuestion = questions[state.currentQ - 1];
		
		if (state.currentQ > 0) {
			const resposta = previousQuestion.opc.find(opcao => opcao === previousQuestion.res);
			if (resposta)
				return r[previousQuestion.opc.indexOf(resposta)];
			return ''
		}
	}

	return (
		<>
			<div className="teste">
				<div className="salvar" />
				<div className="seila4">
					<div className="slides">
						<div className="intervalo">Inserir</div>
						<div className='escolhe'>
						{selects()}
						</div>
							
						<div className='quiz-content'>
							<div className='app'>
							{questions.length === 0  && state.t.length == 0? " " : state.showScore ? (
								<>
									<div className='score-section'>
										Você acertou {state.score} de {questions.length}
									</div>
									<div className='answer-section'>
										<button className='res' onClick={() => sel_tem(state.t)}>{"Continuar"}</button>
									</div>
								</>
							) : questions.length === 0 ? (
								<div className='score-section'>
									Ainda não temos questões com este tema
								</div>
							) : (
								<>
									{id%2===0? (
										<>
											<div className='question-section'>
												<div className='question-count'>
												<span>Questão {state.currentQ + 1}</span>/{questions.length}
												</div>
												<div className='question-teX'> 
													{<Formatar e={questions[state.currentQ].per}/>}
												</div>
											</div>
											<div className='answer-section'>
												{questions[state.currentQ].opc.map((answerOption, i) => <button className='button' onClick={() => handleAnswerOptionClick(answerOption)}>{r[i].toLowerCase()+")"}&nbsp;{<Formatar e={answerOption}/>}</button>)}
											</div>
										</>
									) : (
										<>
											<div className='question-section'>
												<div className='question-count'>
												<span>Questão {state.currentQ}</span>/{questions.length}
												</div>
												<div className={'question-teX'+ (correta? " correct": " incorrect")}>Reposta: {resp()}</div>
											</div>
											<div className='resp-teX'>
												{<Formatar e={questions[state.currentQ-1].exp}/>}
											</div>
											<div className='answer-section'>
											<button className='res' onClick={() => handleAnswerOptionClick('')}>{">>"}</button>
											</div>
										</>
									)
								}
								</>
							)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}