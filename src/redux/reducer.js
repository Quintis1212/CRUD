export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case "SET_DATA": {
      const content = action.payload;
      let resultArr = [];
      Object.keys(content).forEach((key) => {
        let element = { ...content[key], id: key };
        resultArr = [...resultArr, element];
      });
      const uniqueNames = [...new Set(resultArr.map((item) => item.name))];
      return {
        staticData: resultArr,
        contentData: resultArr,
        activeFilters: [],
        uniqueNames: uniqueNames,
        quantity: 1,
        showModal: false,
      };
    }
    case "DELETE_ITEM": {
      const dataId = action.id;
      const updatedData = state.staticData.filter((el) => el.id !== dataId);
      const updatedContentData = state.contentData.filter(
        (el) => el.id !== dataId
      );
      return {
        ...state,
        staticData: updatedData,
        contentData: updatedContentData,
      };
    }
    case "ADD_ITEM": {
      const item = action.item;
      const temporalID = Math.floor(Math.random() * 10000) + 1;
      item["id"] = temporalID;
      const updatedData = [...state.staticData, item];
      const updatedContentData = [...state.contentData, item];
      return {
        ...state,
        staticData: updatedData,
        contentData: updatedContentData,
      };
    }
    case "UPDATE_ITEM": {
      const item = action.item;
      const updatedData = state.staticData.map((el) => {
        if (el.id === item.id) {
          return item;
        } else {
          return el;
        }
      });
      console.log(updatedData);

      return {
        ...state,
        staticData: updatedData,
        contentData: updatedData,
      };
    }
    case "SHOW_MODAL": {
      return {
        ...state,
        showModal: true,
      };
    }
    case "HIDE_MODAL": {
      return {
        ...state,
        showModal: false,
      };
    }
    case "FILTER_DATA": {
      const itemName = action.itemName;
      const quantity = action.quantity;
      const activeFilters = [...state.activeFilters];
      const filterLength = state.uniqueNames.length;
      let storeResult = { contentData: [...state.staticData] };
      //toggle itemName in activeFilters
      if (itemName) {
        const itemIncludes = activeFilters.includes(itemName);
        if (!itemIncludes) {
          activeFilters.push(itemName);
          storeResult.activeFilters = [...activeFilters];
          console.log(storeResult.activeFilters);
        } else {
          const index = activeFilters.indexOf(itemName);
          activeFilters.splice(index, 1);
          storeResult.activeFilters = [...activeFilters];
        }
      }
      //check if all filters are setted or any one filter was setted to show all items
      if (activeFilters.length === filterLength || activeFilters.length === 0) {
        storeResult = {
          ...storeResult,
          contentData: [...state.staticData],
        };
      } else {
        const filteredData = storeResult.contentData.filter((el) => {
          return activeFilters.includes(el.name);
        });
        storeResult = {
          ...storeResult,
          contentData: filteredData,
        };
      }
      //filter by quantity
      if (quantity) {
        const filteredData = storeResult.contentData.filter((el) => {
          return el.count >= quantity;
        });
        storeResult = {
          ...storeResult,
          contentData: filteredData,
          quantity: quantity,
        };
      } else {
        const filteredData = storeResult.contentData.filter((el) => {
          return el.count >= state.quantity;
        });
        storeResult = {
          ...storeResult,
          contentData: filteredData,
        };
      }
      console.log(storeResult);
      return {
        ...state,
        ...storeResult,
      };
    }

    default:
      return state;
  }
}
