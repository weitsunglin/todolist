

//這段程式碼的目的是在網頁中找到指定的元素，以便在後續的程式邏輯中使用它們
let section = document.querySelector("section");
let add = document.querySelector("form button");




/*


這段代碼的目的是實現對待辦事項清單的新增功能。當按下表單中的「Add」按鈕時，將會執行以下操作：

阻止表單的提交事件，避免頁面重新載入。
獲取輸入框中的值，包括待辦事項的文字內容、月份和日期。
檢查待辦事項的文字內容是否為空，如果是空值則彈出警告訊息並返回，不執行後續操作。
創建一個新的待辦事項元素，並設置相應的 CSS 樣式。
創建完成按鈕和刪除按鈕，並為它們添加點擊事件監聽器。
在待辦事項元素中添加文字內容和時間元素，以及完成按鈕和刪除按鈕。
將待辦事項元素添加到指定的區域（section）中，以顯示在網頁上。
創建一個包含待辦事項詳細資料的物件（myTodo）。
從本地存儲中獲取待辦事項清單數組，並將新的待辦事項物件添加到該數組中。
將更新後的待辦事項清單數組重新存儲到本地存儲中。
清空表單中的文字輸入框。
在控制台中打印出更新後的待辦事項清單。

總結來說，這段代碼的目的是在使用者輸入待辦事項資訊後，將該待辦事項新增到清單中並顯示在網頁上，同時將其存儲到本地存儲中以便後續使用。


*/



add.addEventListener("click", e => {
  // prevent form from being submitted
  e.preventDefault();

  // get the input values
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  if (todoText === "") {
    alert("Please Enter some Text.");
    return;
  }

  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + " / " + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);

  // create green check and red trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.addEventListener("click", e => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done");
  })

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';

  trashButton.addEventListener("click", e => {
    let todoItem = e.target.parentElement;

    todoItem.addEventListener("animationend", () => {

      // remove from local storage
      let text = todoItem.children[0].innerText;
      let myListArray = JSON.parse(localStorage.getItem("list"));
      myListArray.forEach((item, index) => {
        if (item.todoText == text) {
          myListArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      })

      todoItem.remove();
    })

    todoItem.style.animation = "scaleDown 0.3s forwards";
  })


  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.3s forwards";

  // create an object
  let myTodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate
  };

  // store data into an array of objects
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([myTodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(myTodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  console.log(JSON.parse(localStorage.getItem("list")));

  form.children[0].value = ""; // CLEAR THE TEXT INPUT
  section.appendChild(todo);
})


/*

這段程式碼的目的是載入並顯示待辦事項清單。它包含一個名為 loadData() 的函式，該函式執行以下操作：

從本地存儲中獲取待辦事項清單（myList）。
如果待辦事項清單存在（不為空），則將其解析為陣列（myListArray）。
遍歷待辦事項清單陣列中的每個項目，並為每個項目創建一個待辦事項元素。
創建待辦事項元素（todo）以及包含待辦事項文字內容和時間的元素（text和time）。
創建完成按鈕（completeButton）和刪除按鈕（trashButton），並為它們添加相應的點擊事件監聽器。
在待辦事項元素中添加待辦事項文字內容、時間元素以及完成按鈕和刪除按鈕。
將待辦事項元素添加到指定的區域（section）中，以顯示在網頁上。
總結來說，這段程式碼的目的是在頁面載入時從本地存儲中獲取待辦事項清單並將其顯示在網頁上，以便用戶能夠查看之前添加的待辦事項。

*/ 


loadData();

function loadData() {
  let myList = localStorage.getItem("list");
  if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
  
      // create a todo
      let todo = document.createElement("div");
      todo.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = item.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = item.todoMonth + " / " + item.todoDate;
      todo.appendChild(text);
      todo.appendChild(time);
  
      // create green check and red trash can
      let completeButton = document.createElement("button");
      completeButton.classList.add("complete");
      completeButton.innerHTML = '<i class="fas fa-check"></i>';
  
      completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
      })
    
      let trashButton = document.createElement("button");
      trashButton.classList.add("trash");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    
      trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
    
        todoItem.addEventListener("animationend", () => {
  
          // remove from local storage
          let text = todoItem.children[0].innerText;
          let myListArray = JSON.parse(localStorage.getItem("list"));
          myListArray.forEach((item, index) => {
            if (item.todoText == text) {
              myListArray.splice(index, 1);
              localStorage.setItem("list", JSON.stringify(myListArray));
            }
          })
  
          todoItem.remove();
        })
    
        todoItem.style.animation = "scaleDown 0.3s forwards";
      })
  
      todo.appendChild(completeButton);
      todo.appendChild(trashButton);
  
      section.appendChild(todo);
    })
  }
}

//這段程式碼是實現合併排序算法的一部分，用於合併兩個已排序的陣列。它並不是硬幹排序，而是使用合併操作來實現排序功能
function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
      if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

//這段程式碼的目的是實現合併排序演算法，將輸入的數組進行排序並返回排序後的結果
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}

//這段程式碼的目的是在按鈕點擊時，對數據進行排序並更新顯示。
let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {
  // sort data
  let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
  localStorage.setItem("list", JSON.stringify(sortedArray));

  // remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  // load data
  loadData();
})