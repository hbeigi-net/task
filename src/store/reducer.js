const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA': {
            let categorizedItems = action.payload.reduce((acc, curr) => {

                if (acc[curr.id]) acc[curr.id].push(curr)
                else acc[curr.id] = [curr]

                return acc
            }, {})
            categorizedItems = Object.keys(categorizedItems).map(category => ({ category, items: [...categorizedItems[category]] }))
            return { ...state, selectedItems: [], categorizedItems }
        }
        case 'START_LOADING': {
            return { ...state, isLoading: true }
        }
        case 'END_LOADING': {
            return { ...state, isLoading: false }
        }
        case 'SELECT_ITEM': {
            const { item } = action.payload
            const { categorizedItems, selectedItems } = state

            // remove from all data list
            const categoryIndex = categorizedItems.findIndex(el => el.category === item.id)
            const { category, items } = categorizedItems[categoryIndex]
            const updatedItems = items.filter(elem => elem.uniqueId !== item.uniqueId)
            categorizedItems[categoryIndex].items = updatedItems

            // add to selected data list
            const targetIndex = selectedItems.findIndex(elem => elem.category === category)
            if (targetIndex === -1) {
                selectedItems.push({ category, items: [item] })
            } else {
                selectedItems[targetIndex].items = (selectedItems[targetIndex].items || []).concat([item])
            }


            return {
                ...state,
                selectedItems,
                categorizedItems,
            }
        }
        case 'DESELECT_ITEM': {
            const { item } = action.payload
            const { categorizedItems, selectedItems } = state

            // remove from selected data list
            const categoryIndex = selectedItems.findIndex(el => el.category === item.id)
            const { category, items } = selectedItems[categoryIndex]
            const updatedItems = items.filter(elem => elem.uniqueId !== item.uniqueId)
            selectedItems[categoryIndex].items = updatedItems

            // add to all data list
            const targetIndex = categorizedItems.findIndex(elem => elem.category === category)
            if (targetIndex === -1) {
                categorizedItems.push({ category, items: [item] })
            } else {
                categorizedItems[targetIndex].items = (categorizedItems[targetIndex].items || []).concat([item])
            }


            return {
                ...state,
                selectedItems,
                categorizedItems,
            }
        }
        default: {
            return state
        }
    }

}


export default appReducer