import React, { useState } from "react";
import Category from '../Category'
import useStyles from './style'

export default function CategoriesWrapper({ title, items, actionTitle, submit }) {
    const classes = useStyles()
    const [selected, setSelected] = useState([])

    const selectItem = item => {
        if (Array.isArray(item)) return setSelected([...selected, ...item])
        setSelected([...selected, item])
    }

    const deSelectItem = item => {
        if (Array.isArray(item)) return item.forEach(elem => deSelectItem(elem))
        setSelected(items.filter(elem => elem.uniqueId !== items.uniqueId))
    }

    const actionHanlder = () => {
        submit(selected)
        setSelected([])
    }

    if (!items) return null
    return (
        <div className={classes.root}>
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.actionArea}>
                <button className={`${classes.button} `} onClick={actionHanlder}>
                    {actionTitle}
                </button>
            </div>
            {
                items.map(item => (
                    <Category
                        key={item.category}
                        items={item.items}
                        title={item.category}
                        deSelectItem={deSelectItem}
                        selectItem={selectItem}
                        selected={selected}
                    />
                ))
            }

        </div>
    )
}