import axios from "axios";

const link =
  "https://task-list-bc563-default-rtdb.europe-west1.firebasedatabase.app/";

class API {
  getInstance = () => {
    const instance = axios.create({
      baseURL: link,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return instance;
  };

  getTodos = async () => {
    try {
      const { data } = await this.getInstance().get("/todos.json");

      return Object.entries(data).map((item) => {
        const obj = item[1];

        return { ...obj, id: item[0] };
      });
    } catch (e) {
      console.log(e);
    }
  };

  addNewTodo = async (todo) => {
    try {
      const { data } = await this.getInstance().post(
        "/todos.json",
        JSON.stringify(todo)
      );
      return data.name;
    } catch (e) {
      console.log(e);
    }
  };

  updateTodo = async (todo) => {
    try {
      await this.getInstance().patch(
        `/todos/${todo.id}.json`,
        JSON.stringify(todo)
      );
    } catch (e) {
      console.log(e);
    }
  };

  deleteTodo = async (id) => {
    try {
      await this.getInstance().delete(`/todos/${id}.json`);
    } catch (e) {
      console.log(e);
    }
  };
}

export default new API();
