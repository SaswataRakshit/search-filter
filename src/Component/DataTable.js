import React, { useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import { IconButton, Divider, Paper, List, ListItem, ListItemText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';

import './DataTable.css'

const data = require('./data.json')

const columns = [
    { field: 'dish', headerName: 'Dish', width: 250, sortable: false },
    { field: 'cuisine', headerName: 'Cuisine', width: 180, sortable: false },
    { field: 'ingredients', headerName: 'Main Ingredient', width: 250, sortable: false },
    { field: 'prepTime', headerName: 'Preperation Time', width: 220 }
];

const rows = data.dishes

const DataTable = () => {
    const [rowData, setRowData] = useState(rows)
    const [value, setValue] = useState('')
    const [suggestionList, setSuggestionList] = useState([])

    const applyFilter = (e) => {
        let value = e.target.value
        setValue(value)
        let suggestArray = []
        let searchValue = value.toLowerCase()
        if (value) {
            rowData.filter(el => {
                let dish = el.dish.toLowerCase()
                if (dish.includes(searchValue)) {
                    suggestArray.push(el.dish + "&&Dish")
                    return true
                }
                return false
            })
            rowData.filter(el => {
                let cuisine = el.cuisine.toLowerCase()
                if (cuisine.includes(searchValue)) {
                    suggestArray.push(el.cuisine + "&&Cuisine")
                    return true
                }
                return false
            })
            rowData.filter(el => {
                let ingredient = el.ingredients.toLowerCase()
                if (ingredient.includes(searchValue)) {
                    suggestArray.push(el.ingredients + "&&Ingredient")
                    return true
                }
                return false
            })
            setSuggestionList(suggestArray)
        }
        else {
            setValue('')
            setRowData(rows)
            setSuggestionList([])
        }
    }

    const clearFilter = () => {
        setValue('')
        setRowData(rows)
        setSuggestionList([])
    }

    let displaySuggestions = null
    if (suggestionList.length != 0) {
        displaySuggestions = (
            <div>
                <Paper style={{ marginRight: '0px', width: '300px', maxHeight: '250px', overflowY: 'scroll', position: 'absolute', zIndex: '9', right: '490px', top: '140px' }} elevation={3}>
                    {suggestionList.map((listItem, id) => {
                        let display = listItem.split("&&")
                        let splitList = display[0].split("")
                        return (
                            <List key={id}>
                                <ListItem button onClick={() => filterData(listItem)}>
                                    <ListItemText style={{ display: 'flex' }}>
                                        <span style={{ display: 'flex' }}>
                                            {splitList.map((el, id) =>
                                                <span key={id} style={value.split("")[id] == el ? { fontWeight: 'lighter' } : { fontWeight: 'bolder' }}>{el}</span>
                                            )}
                                        </span>
                                        <span style={{ fontSize: 'small', color: 'rgba(0, 0, 0, 0.54)' }}>{display[1]}</span>
                                    </ListItemText>
                                </ListItem>
                            </List>
                        )
                    })}
                </Paper>
            </div>
        )
    }

    const filterData = (filterBy) => {
        let filterByType = filterBy.split("&&")[1]
        let filterByValue = filterBy.split("&&")[0]
        let filteredData = rowData.filter(el => {
            if (filterByType == "Dish") {
                return el.dish == filterByValue
            }
            else if (filterByType == "Cuisine") {
                return el.cuisine == filterByValue
            }
            else if (filterByType == "Ingredient") {
                return el.ingredients == filterByValue
            }
            return false
        })
        setRowData(filteredData)
        setSuggestionList([])
    }

    return (
        <div className="divStyle">
            <h3>Cuisines</h3>
            <Divider />
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: '1' }} />
                <TextField
                    className="textField"
                    id="input-with-icon-textfield"
                    placeholder="Filter"
                    autoComplete="off"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faFilter} className="icon" style={{ color: '#909090' }} />
                            </InputAdornment>
                        ),
                    }}
                    onChange={applyFilter}
                    value={value}
                />
                <IconButton
                    onClick={clearFilter}
                    className="closeButton"
                >
                    <FontAwesomeIcon icon={faTimes} className="faTimes" />
                </IconButton>
                {displaySuggestions}
            </div>
            <DataGrid rows={rowData} columns={columns} pageSize={5} disableColumnMenu={true} disableSelectionOnClick={true} />
        </div>
    );
}

export default DataTable;