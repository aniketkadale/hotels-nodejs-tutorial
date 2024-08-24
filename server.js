const JSONString = '{"name": "Aniket", "age": 22, "city": "Pune"}';
const JSONObj = JSON.parse(JSONString);
console.log(JSONObj);

const JSONObj2 = {
    "name" : "Nehal",
    "age" : 21,
    "city" : "Mumbai"
}

const JSONString2 = JSON.stringify(JSONObj2);

console.log(JSONString2)
console.log(typeof JSONObj2);
console.log(typeof JSONString);