// Storage Controller



// UI Controller
const UIController = (function(){

  const UISelectors = {
    itemList: '#item-list'
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
        </li>`;
      });

      document.querySelector(UISelectors.itemList).innerHTML = markup;
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
    logData: function() {
      return data;
    }
  }

})();



// App Controller
const App = (function(UICtrl,ItemCtrl){

  return {
    init: function() {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemsList(items);
    }
  }

})(UIController,ItemController);

App.init();