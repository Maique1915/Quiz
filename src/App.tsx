import './model/css/App.css';
import './model/css/Matricular.css';
import './model/css/Comum.css';
import Quiz from './routes/Quiz'
import 'bootstrap/scss/bootstrap.scss'
import Inserts from './routes/Inserts';

export interface AppProps {
	in: string
	cur: string
}
const App = (props: AppProps) => {
        return (
            <div className="App-window">
                <div className='contentarea'>
                    <input type="radio" id={"quiz"} name="tela" className="radio" defaultChecked/>
                    <div className="tela3">
                        {props.in?<Inserts/>:<Quiz/>}
                    </div>
                </div>
            </div>

        )
}

export default App;
