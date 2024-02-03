import axios from 'axios';
import db from './db.json';
import db2 from './db2.json';

function ativas(e: string) {
    e = e === undefined ? "engcomp" : e
    const a = db.filter((item) => (item._ag === true) && item._cu === e)
    return a !== undefined ? a : [];
}

function periodos(e: string) {
    const vet = ativas(e);
    const v = new Set(vet.map(item => item._se));
    return v.size > 0 ? v.size : undefined;
}

function cursos() {
    const v = new Set(db2.map((item) => item._cu));
    return Array.from(v);
}

function horarios(e: string) {
    e = e === undefined ? "engcomp" : e
    const v = db2.find((item) => item._cu === e);
    return v === undefined || v === null ? [] : v._hd
}

function dimencao(e: string) {
    e = e === undefined ? "engcomp" : e
    const v = db2.find((item) => item._cu === e);
    if (v === undefined)
        return []
    return v._da === undefined ? [] : v._da;
}

function temas(el: string) {
    el = el === undefined || el === "" ? "engcomp" : el
    return axios.get('http://localhost:3333/quiz', {
        params: {
          sigla: el,
        }
      })
}

function perguntas(el: string, t: string) {
    el = el === undefined ? "engcomp" : el
        return axios.get('http://localhost:3333/quiz', {
          params: {
            sigla: el,
            tema: t
          }
        })
}

export { ativas, periodos, cursos, horarios, dimencao, perguntas, temas };
