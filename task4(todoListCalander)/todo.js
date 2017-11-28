(function(){

  var todos = [];
  var existingValues;

  function loadPrevValues() {
    existingValues = JSON.parse(localStorage.getItem('allVal'));
    if (existingValues !== null){
      console.log(existingValues);
      todos = todos.concat(existingValues);
      sliceElements(todos);
    };
  }

  function getValuesFromForm() {
    var done;
    var priority;
    var name = $('#name').val();
    var title = $('#title').val();
    var dueDate = $('#dueDate').val();
    
    if ($('#doneT').is(':checked')) {
      done = ($('#doneT').val());
    } else if ($('#doneF').is(':checked')) {
      done = ($('#doneF').val());
    }

    if ($('#priorityH').is(':checked')) {
      priority = ($('#priorityH').val());
    } else if ($('#priorityM').is(':checked')) {
      priority = ($('#priorityM').val());
    } else if ($('#priorityL').is(':checked')) {
      priority = ($('#priorityL').val());
    }
    
    //console.log(getValuesFromForm);
    if (done.length && priority.length && name.length && title.length && dueDate.length) {
      storeIntoList(name, title, done, dueDate, priority);
    } else {
      console.log("form empty");
    }
  }

  function storeIntoList(name, title, done, dueDate, priority) {
    console.log("form not empty");
    var todo = {
        name: $('#name').val(),
        title: $('#title').val(),
        done: done,
        dueDate: $('#dueDate').val(),
        priority: priority,
        uid: new Date().getTime()
      };
      console.log(todo);
    todos.push(todo);
    
    console.log(todos);
    localStorage.setItem("allVal", JSON.stringify(todos));
    sliceElements(todos);
    $("input[name='task']").val('');
  }

  function sliceElements(todoList) {
    var len = todoList.length;
    $('ol').empty();

    for (var i = 0; i<len; i++) {
      var elementArray = todoList.slice(i, i+1);
      var elementObject = elementArray.reduce(function(acc, cur, i) {
          acc[i] = cur;
          return acc;
      }, {}); //converting the element array of objects into object of objects
      appendToList(elementObject);
    };
  }

  function appendToList(elementObject) {
    Object.keys(elementObject).forEach((key) => {
      var getName = elementObject[key].name;
      var getTitle = elementObject[key].title;
      var getDone = elementObject[key].done;
      var getDueDate = elementObject[key].dueDate;
      var getPriority = elementObject[key].priority;
      var getUid = elementObject[key].uid;

      $('ol').append('<li class="form-control liChild">' + getName + ' : ' + getTitle + ' : ' + getDone + ' : ' + getDueDate + ' : ' + getPriority + '</li>');
      $('li:last-child').attr('data-uid', getUid); //attaches getUid value with the last child of list items in backend but does not show in view
    });
  }

  $(window).on('load', loadPrevValues());
    
  $('#button').on('click', getValuesFromForm);

  $(document).on('click', 'li', function() {
    $(this).toggleClass('bg-secondary');
  });
    
  //localStorage.removeItem('allVal');
    
  $('#list').sortable({
    axis: 'y',
    stop: function (event, ui){
          
    var updatedListLen = $(event.target).children().length;
    var todosLen = todos.length;
    
    var newTodos = [];

    //working properly-----------------------------------------------------------
    for (var i = 0; i < updatedListLen; i++) {
      for (var j = 0; j < todosLen; j++) {
        if(todos[j].uid == event.target.children[i].attributes[1].nodeValue) {
          newTodos.push(todos[j]);
          break;
        };
      }
    };

    console.log(newTodos);
    localStorage.setItem("allVal", JSON.stringify(newTodos));
  }
  });


})();