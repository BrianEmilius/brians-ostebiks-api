const { 
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct } = require("../controllers/products.controller");

module.exports = function(router) {
	router.options("/products", function(req, res) {
		res.header("Allow", "OPTIONS, GET, POST");
		res.status(204);
		res.end();
	});

	router.post("/products", createProduct);
	router.get("/products", getAllProducts);
	router.get("/products/:sku", getSingleProduct);
	router.patch("/products/:sku", updateProduct);
	router.delete("/products/:sku", deleteProduct);
};
