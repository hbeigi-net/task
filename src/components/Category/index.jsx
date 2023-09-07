import React, { useState } from "react";
import CategoryItem from "../CategoryItem";
import Chevron from "../icons/Chevron";
import useStyles from './style'

export default function Category({ title, items, selected, selectItem, deSelectItem }) {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        if (isOpen) return setIsOpen(false)
        setIsOpen(true)
    }

    if (!items || items.length === 0) return null

    const stopPropagation = e => e.stopPropagation()
    const isChecked = items.every(item => selected.includes(item))
    const handleChange = (e, items) => {
        stopPropagation(e)
        if (isChecked) return deSelectItem(items)
        selectItem(items)
    }
    return (
        <div className={classes.root}>
            <div className={classes.heading} onClick={toggleOpen}>
                <h1 className={classes.title}>{title}</h1>
                <span className={classes.quantity}>quantity: {items.length}</span>
                <span className={classes.rightSide}>
                    <span className={classes.checkbox}>
                        <input
                            type='checkbox'
                            checked={isChecked}
                            onClick={stopPropagation}
                            onChange={e => handleChange(e, items)}
                        />
                    </span>
                    <Chevron width={30} height={30} className={`${classes.chevron} ${!isOpen && classes.chevronOpen}`} />
                </span>
            </div>
            <div className={`${classes.itemsWrapper} ${isOpen ? classes.open : classes.closed}`}>
                {
                    items.map(item => (
                        <div
                            key={item.uniqueId}
                            className={classes.item}
                        >
                            <CategoryItem
                                data={item}
                                onChange={e => handleChange(e, item)}
                                isChecked={selected.includes(item)}
                            />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}