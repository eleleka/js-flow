window.todoApp = {
  app: {
    tasks: [],
    addTask: function(incomeTask) {
      if (app.tasks.indexOf(incomeTask) < 0) {
        app.tasks.push(incomeTask);
        app.renderTasks();
        window.todoApp.saveData(app.tasks)
      }
    },
    deleteTask: function(task) {
      let indOf = app.tasks.indexOf(task);

      if (indOf >= 0) {
        app.tasks.splice(indOf, 1);
        app.renderTasks();
        window.todoApp.saveData(app.tasks)
      }
    },
    handleClick: function(e) {
      e.preventDefault();
      const val = document.querySelector('#enter').value;

      if (val.length) {
        app.addTask(val);
      }

      return false;
    },
    init: function() {
      const localTasks = window.todoApp.fetchData()
      if (typeof localTasks === 'object' && localTasks.length) {
        app.tasks = localTasks;
        app.renderTasks();
      }
      document.querySelector('#submit').addEventListener('click', app.handleClick); // TODO: check why not 'this.'
    },
    renderTasks: function() {
      const list = document.querySelector('#tasks');
      let tasks = '';

      for (let task of app.tasks) {
        tasks += `<li class="task">${task}</li>`;
      }

      list.innerHTML = tasks;


      let existingTasksList = list.querySelectorAll('li');
      for (let singleTask of existingTasksList) {
        singleTask.addEventListener('click', function(arg) {
          var task = arg.target.innerText;
          app.deleteTask(task);
        });
      }

      app.updateCounter()
    },
    updateCounter: function() {
      document.querySelector('#counter').innerText = app.tasks.length
    }
  }
}

const app = window.todoApp.app;
document.addEventListener("DOMContentLoaded", app.init);
