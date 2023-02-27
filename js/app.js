"use strict"

const listKey = "todos-list"
let list = []

getFromStorage()
setClearEvent()
setAddEvent()


function getFromStorage() {
    let storedListString = localStorage.getItem(listKey)
    let storedList = storedListString == null ? null : JSON.parse(storedListString)

    if (storedList != null) {
        storedList.forEach(todo => {
            addTodo(todo.text, todo.strike)
        })
    }
}

function addTodo(todoText, todoStrike) {
    let newListElement = {
        text: todoText,
        strike: todoStrike
    };

    list.push(newListElement)
    let documentList = document.getElementById("todos")
    let liElement = document.createElement("li")

    liElement.innerHTML = todoText
    if (todoStrike) {
        liElement.className = "strike"
    } else {
        liElement.className = "unstrike"
    }
    liElement.onclick = function () {
        let index = getIndexOf(liElement)
        let listElement = list[index]

        if (listElement.strike) {
            listElement.strike = false
            documentList.children[index].className = "unstrike"
        } else {
            listElement.strike = true
            documentList.children[index].className = "strike"
        }
        setToStorage()
    }

    liElement.ondblclick = function () {
        removeAtIndex(getIndexOf(liElement))
        setToStorage()
    }

    documentList.appendChild(liElement)
    setToStorage()
}

function getIndexOf(liElement) {
    let documentList = document.getElementById("todos")
    let children = documentList.children

    for (let length = children.length, i = 0; i < length; i++) {
        if (children[i] == liElement) {
            return i
        }
    }
}

function setToStorage() {
    let storedListString = JSON.stringify(list)

    localStorage.setItem(listKey, storedListString)
    // console.log(localStorage.getItem(listKey))  //  debug
}

function removeAtIndex(index) {
    let documentList = document.getElementById("todos")
    let children = documentList.children
    let length = children.length

    if (index < 0 || index >= length) {
        return
    }

    list.splice(index, 1)
    documentList.removeChild(children[index])
    setToStorage()
}

function setClearEvent() {
    let clearButton = document.getElementById("clear-button")

    clearButton.onclick = function () {
        list = []
        let documentList = document.getElementById("todos")

        empty(documentList)
    }
}

function empty(documentList) {
    while (documentList.firstChild) {
        documentList.removeChild(documentList.firstChild)
    }
    setToStorage()
}

function setAddEvent() {
    let addButton = document.getElementById("add-button")

    addButton.onclick = function () {
        let todoText = getText()

        if (todoText != "") {
            addTodo(todoText)
        }
    }
}

function getText() {
    let textBox = document.getElementById("add-text")
    let result = textBox.value

    textBox.value = ""
    return result
}