const db = require("../config/database");

const ProductRef = db.firestore().collection("products");

module.exports = ProductRef;
