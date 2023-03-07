
import React, { Component } from 'react';

// Form
import { FaPlus } from 'react-icons/fa';
import { BiPencil, BiTrash, BiTransfer } from "react-icons/bi";

import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    listaTarefas:
      [
        'Estudar React',
        'Atualizar projeto Beach',
        'Comer de novo',
      ],
    index: -1,
  };

  handleInputChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { listaTarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (listaTarefas.indexOf(novaTarefa) != -1) return;

    const novasTarefas = [...listaTarefas];

    if (novaTarefa.length < 1) return;

    if (index == -1) {
      this.setState({
        listaTarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      })
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        listaTarefas: [...novasTarefas],
        novaTarefa: '',
        index: -1,
      })
    }
  }

  handleEdit = (e, index) => {
    console.log(e);
    console.log(index);

    let { listaTarefas } = this.state;
    const novasTarefas = [...listaTarefas];

    this.setState({
      index,
      novaTarefa: listaTarefas[index]
    })
  }

  handleDelete = (e, index) => {
    let { listaTarefas } = this.state;
    const novasTarefas = [...listaTarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      listaTarefas: [...novasTarefas]
    })
  }

  render() {
    const { novaTarefa, listaTarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <form action="#" className="form" onSubmit={this.handleSubmit}>
          <input onChange={this.handleInputChange}
            type="text"
            value={novaTarefa} />
          <button type="submit">
            {this.state.index != -1 ? <BiTransfer /> : <FaPlus />}
          </button>
        </form>

        <ul className="tarefas">
          {listaTarefas.map((tarefa, index) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <BiPencil
                  onClick={(e) => this.handleEdit(e, index)}
                  className="edit" />
                <BiTrash
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
