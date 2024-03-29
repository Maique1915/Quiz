import React from 'react'
import { ativas } from '../model/Filtro'
import Comum from './Comum'

class Quadro extends React.Component {
	constructor(props) {
		super(props)
		this.state = { cur: props.cur }
	}

	render() {
		const a = ativas(this.state.cur)
		return <Comum materias={[a]} tela={1} cur={this.state.cur} separa={true} g={"º"} f={' Período'} />
	}
}

export default Quadro