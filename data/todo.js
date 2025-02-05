const fs = require('fs');
const filePath = './data/todos.json';
const fastcsv = require('fast-csv');

const exportToCsv = (todos) => {
    const ws = fs.createWriteStream('./data/todos.csv');
    fastcsv.write(todos, {headers:true}).pipe(ws);
}

//this returns an object 
const loadTodos = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data); 
    } catch (e) {
        return [];
    }
};

//this stringifies the obj todo to json format, then writes it to the file 
const saveTodos = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

//todos is an obj
let todos = loadTodos();
module.exports = {todos, saveTodos, exportToCsv}