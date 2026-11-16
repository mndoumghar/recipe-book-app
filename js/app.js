import axios from "axios";

console.log("gff");

axios.get("https://dummyjson.com/recipes")
    .then(console.log)
    .catch(console.error);
