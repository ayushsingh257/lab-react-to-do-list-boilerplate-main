import React, { Component } from "react";

export default class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      todo: [],
      editingIndex: -1,
      editText: ""
    };
  }

  handelUpdate = (e) => {
    this.setState({
      task: e.target.value
    });
  };

  handleAdd = () => {
    const { task, todo } = this.state;

    if (task.trim() !== "") {
      this.setState({
        todo: [...todo, task],
        task: ""
      });
    }
  };

  handleEditOrSave = (index) => {
    if (this.state.editingIndex === index) {
      const { editText, todo } = this.state;
      const updatedTodo = [...todo];
      updatedTodo[index] = editText;
      this.setState({
        todo: updatedTodo,
        editingIndex: -1,
        editText: ""
      });
    } else {
      const editedText = this.state.todo[index];
      this.setState({
        editingIndex: index,
        editText: editedText
      });
    }
  };

  handleDelete = (index) => {
    const updatedTodo = [...this.state.todo];
    updatedTodo.splice(index, 1);
    this.setState({
      todo: updatedTodo,
      editingIndex: -1, 
      editText: ""
    });
  };

  render() {
    return (
      <>
        <input type="text" value={this.state.task} onChange={this.handelUpdate} />
        <button onClick={this.handleAdd}>Add Item</button>
        <p>{this.state.task}</p>
        <div className="Container">
          <ul>
            {this.state.todo.map((item, index) => (
              <li
                key={index}
                onClick={(e) => {
                  if (e.target.tagName !== "BUTTON") {
                    this.handleEditOrSave(index);
                  }
                }}
                style={{ cursor: "pointer", marginBottom: "8px" }}
              >
                {this.state.editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={this.state.editText}
                      onChange={(e) => this.setState({ editText: e.target.value })}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button onClick={() => this.handleEditOrSave(index)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {item}
                  </>
                )}
                <button onClick={() => this.handleDelete(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
