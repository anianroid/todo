import React from "react";
import { render } from "react-dom";
require("./styles.css");

class App extends React.Component {
  state = { all: [], completed: [], pending: [], id: 0 };

  addTodo = event => {
    event.preventDefault();
    const newTodo = {
      id: this.state.id,
      value: this.todoValueNode.value,
      status: 0
    };
    this.todoValueNode.value = "";
    this.setState(state => {
      return {
        all: [newTodo, ...state.all],
        pending: [newTodo, ...state.pending],
        id: state.id + 1
      };
    });
  };

  removeTodo = event => {};

  render() {
    const { all, completed, pending } = this.state;
    return (
      <div>
        <div><h2>Todo List</h2></div>
        <div>
          <form>
            <div class="input-form">
              <div>
                <input
                  ref={node => {
                    this.todoValueNode = node;
                  }}
                />
              </div>
              <div>
                <button
                  className="btn-plus"
                  type="submit"
                  onClick={this.addTodo}
                >
                  <i className="fas fa-plus-circle"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <div className="body">
            {all.map((item, index) => {
              return (
                <div
                  className={item.status ? "completed" : "pending"}
                  key={item.id}
                >
                  <div>
                    <button
                    className="btn btn-red"
                      onClick={item => {
                        all.splice(index, 1);
                        this.setState({ all: all });
                      }}
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <div>
                    <span>
                      {item.value}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-green"
                      onClick={() => {
                        const newTodos = all.filter(obj => {
                          if (obj.id === item.id) {
                            obj["status"] = 1;
                            this.setState(state => {
                              completed: [obj, ...state.completed];
                            });
                            return obj;
                          }
                          return obj;
                        });
                        this.setState({ all: newTodos });
                      }}
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
