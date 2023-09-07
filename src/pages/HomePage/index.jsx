import React, { useEffect } from "react";
import useStyles from './style'
import { useAppContext } from "../../store";
import { deSelecetItem, loadData, selectItem } from "../../store/actions";
import CategoriesWrapper from "../../components/CategoriesWrapper";

export default function HomePage() {
    const { dispatch, state } = useAppContext()
    const { categorizedItems, selectedItems } = state
    const classes = useStyles()
    useEffect(() => {
        dispatch(loadData())
    }, [dispatch])

    const add = items => {
        items.forEach(item => dispatch(selectItem(item)))
    }

    const deleteItem = items => {
        items.forEach(item => dispatch(deSelecetItem(item)))
    }

    return (
        <h1 className={classes.homeRoot}>
            <div className={classes.content}>
                <div className={classes.categoriesWrapper}>

                    <CategoriesWrapper items={categorizedItems} title='All Data' actionTitle={'Add'} submit={add} />
                </div>
                <div className={classes.categoriesWrapper}>
                    <CategoriesWrapper items={selectedItems} title='Selected Data' actionTitle='Delete' submit={deleteItem} />
                </div>
            </div>
        </h1>
    )
}