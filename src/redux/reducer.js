export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case "SET_DATA": {
      const content = action.payload;
      let resultArr = []
      Object.keys(content).forEach(key=>{
        let element = {...content[key],id:key}
        resultArr=[...resultArr,element]
      })
      const uniqueNames = [...new Set(resultArr.map((item) => item.name))];
      return {
        staticData: resultArr,
        contentData: resultArr,
        activeFilters: [],
        uniqueNames: uniqueNames,
        quantity: 1,
        showModal:false,
      };
    }
    case "DELETE_ITEM": {
      const dataId = action.id;
      const updatedData = state.staticData.filter((el)=> el.id!==dataId);
      const updatedContentData = state.contentData.filter((el)=> el.id!==dataId);
      return {
        ...state,
        staticData: updatedData,
        contentData:updatedContentData,
      };
    }
    case "SHOW_MODAL": {
      return {
        ...state,
        showModal:true,
      };
    }
    case "HIDE_MODAL": {
      return {
        ...state,
        showModal:false,
      };
    }
    case "FILTER_DATA": {
      const itemName = action.itemName;
      const quantity = action.quantity;
      const activeFilters = [...state.activeFilters];
      const filterLength = state.uniqueNames.length;
      let storeResult = { contentData: [...state.staticData] };
      console.log(activeFilters)
      if (itemName) {
        const itemIncludes = activeFilters.includes(itemName);
        if (!itemIncludes) {
          activeFilters.push(itemName);
          storeResult.activeFilters = [...activeFilters]
          console.log( storeResult.activeFilters)
        }else {
          const index = activeFilters.indexOf(itemName);
          activeFilters.splice(index, 1);
          storeResult.activeFilters = [...activeFilters]
        }
      } 

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
      console.log(storeResult)
      return {
        ...state,
        ...storeResult,
      };
    }

    default:
      return state;
  }
}
