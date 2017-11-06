(function(){

	var todos = [];
  var existingValues;

	$(window).on('load', function(){
	    existingValues = JSON.parse(localStorage.getItem('allVal'));
       	if (existingValues !== null){
       		console.log(existingValues);
       		todos = todos.concat(existingValues);
       		sliceElements(todos);
       	};
	});
    
    $('#button').on('click', function() {
    	var todo = {
      		name: $('#name').val(),
      		title: $('#title').val(),
      		done: $('#done').val(),
      		dueDate: $('#dueDate').val(),
      		priority: $('#priority').val(),
      		uid: new Date().getTime()
       	};
       	todos.push(todo);
       	
       	console.log(todos);
       	localStorage.setItem("allVal", JSON.stringify(todos));
       	//var fromLocalStorage = JSON.parse(localStorage.getItem('allVal'));
		    //console.log(fromLocalStorage);
       	sliceElements(todos);
       	$('input').val('');

	});

	function sliceElements(todoList){
		var len = todoList.length;
		$('ol').empty();

		for (var i = 0; i<len; i++) {
			var elementArray = todoList.slice(i, i+1);
			var elementObject = elementArray.reduce(function(acc, cur, i) {
			  	acc[i] = cur;
			  	return acc;
			}, {}); //converting the element array of objects into object of

			Object.keys(elementObject).forEach((key) => {
				var getName = elementObject[key].name;
				var getTitle = elementObject[key].title;
				var getDone = elementObject[key].done;
				var getDueDate = elementObject[key].dueDate;
				var getPriority = elementObject[key].priority;
				var getUid = elementObject[key].uid;

				//console.log(getUid);

				/*localStorage.setItem("allVal", JSON.stringify(elementObject));
       			console.log(localStorage.getItem('allVal'));*/
       			//var uid = new Date().getTime();

   			$('ol').append('<li class="form-control liChild">' + getName + ' : ' + getTitle + ' : ' + getDone + ' : ' + getDueDate + ' : ' + getPriority + '</li>');
        $('li:last-child').attr('data-uid', getUid);
			});
		};
	};

    $(document).on('click', 'li', function() {
    	$(this).toggleClass('bg-secondary');

    });

    
    //localStorage.removeItem('allVal');

  	
	$('#list').sortable({
    axis: 'y',
    stop: function (event, ui) {
        	
          var updatedListLen = $(event.target).children().length;
          var todosLen = todos.length;
          
          var newTodos = [];
          
          /*var uidArr = [];
          for (var i = 0; i < updatedListLen; i++) {
            uidArr.push(existingValues[j].uid);
            //console.log("its working for i");
          };*/

          //working properly-----------------------------------------------------------
          for (var i = 0; i < updatedListLen; i++) {
            for (var j = 0; j < todosLen; j++) {
              if(todos[j].uid == event.target.children[i].attributes[1].nodeValue) {
                newTodos.push(todos[j]);
                break;
              };
              //console.log("its working for j");
            }
            //console.log("its working for i");
          };

          console.log(newTodos);
          localStorage.setItem("allVal", JSON.stringify(newTodos));
    	}

	});

	$("#list").disableSelection(); //jquery ui

	

})();