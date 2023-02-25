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
        storedList.forEach(todoText => {
            addTodo(todoText)
        })
    }
}

function setToStorage() {
    let storedListString = JSON.stringify(list)

    localStorage.setItem(listKey, storedListString)
    // console.log(JSON.stringify(localStorage.getItem(listKey)))  //  debug
}

function addTodo(todoText) {
    list.push(todoText)
    let documentList = document.getElementById("todos")
    let liElement = document.createElement("li")

    liElement.innerHTML = todoText
    liElement.className = "unstrike"
    liElement.onclick = function () {
        if (liElement.className == "unstrike") {
            liElement.className = "strike"
        } else {
            liElement.className = "unstrike"
        }
    }

    liElement.ondblclick = function () {
        removeAtIndex(getIndexOf(liElement))
        setToStorage()
    }

    documentList.appendChild(liElement)
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

function empty(documentList) {
    while (documentList.firstChild) {
        documentList.removeChild(documentList.firstChild)
    }
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

function getIndexOf(liElement) {
    let documentList = document.getElementById("todos")
    let children = documentList.children

    for (let length = children.length, i = 0; i < length; i++) {
        if (children[i] == liElement) {
            return i
        }
    }
}