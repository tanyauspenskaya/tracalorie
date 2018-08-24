// Storage Controller



// UI Controller
const UIController = (function(){

  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    nameInput: '#item-name',
    caloriesInput: '#item-calories'
  }

  return {
    populateItemsList: function(items) {
      let markup = '';

      items.forEach(item => {
        markup += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="fa fa-pencil"></i>
            </a>
          </li>
        `;
      });

      document.querySelector(UISelectors.itemList).innerHTML = markup;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.nameInput).value,
        calories: document.querySelector(UISelectors.caloriesInput).value
      }
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
  
})();



// Item Controller
const ItemController = (function(){

  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure
  const data = {
    items: [
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300}
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      calories = parseInt(calories);

      const newItem = new Item(ID, name, calories);
      data.items.push(newItem);

      return newItem;
    },
    logData: function() {
      return data;
    }
  }

})();



// App Controller
const App = (function(UICtrl,ItemCtrl){

  // Load event listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemSubmit);
  };

  // Add item submit
  const itemSubmit = function(e) {
    // Get form input from UICtrl
    const input = UICtrl.getItemInput();
    // Check for name and calorie input
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }
    e.preventDefault();
  };

  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemsList(items);
      loadEventListeners();
    }
  }

})(UIController,ItemController);

App.init();