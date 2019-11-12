const ProductRef = require("../models/product.model");
const { log } = require("../middleware/logger");

exports.createProduct = function(req, res) {
	req.fields.price = parseFloat(req.fields.price);
	req.fields.weight = parseFloat(req.fields.weight);
	ProductRef.add({ ...req.fields })
		.then(ref => {
			ref.get().then(doc => res.status(201).json(doc.data()))
		})
		.catch(error => res.json(error));
};

exports.getAllProducts = function(req, res) {
	ProductRef.get().then(docs => {
		const results = [];
		docs.forEach(doc => results.push(doc.data()));
		res.json(results);
	});
};

exports.getSingleProduct = async function(req, res) {
	try {
		const docs = await ProductRef
			.where("sku", "==", req.params.sku)
			.limit(1)
			.get();
		docs.forEach(doc => res.json(doc.data()));
	} catch (error) {
		log.error(error.stack);
		res.status(500).end();
	}
};

exports.updateProduct = async function(req, res) {
	if (req.fields.price) {
		req.fields.price = parseFloat(req.fields.price);
	}
	if (req.fields.weight) {
		req.fields.weight = parseFloat(req.fields.weight);
	}

	try {
		const docs = await ProductRef.where("sku", "==", req.params.sku).limit(1).get();
		docs.forEach(async doc => {
			try {
				doc.ref.update({ ...req.fields });
				const result = await doc.ref.get();
				res.json(result.data());
			} catch (error) {
				log.error(error.stack);
				res.status(500).end();
			}
		})
	} catch (error) {
		log.error(error.stack);
		res.status(500).end();
	}
};

exports.deleteProduct = function(req, res) {
	ProductRef.where("sku", "==", req.params.sku).get()
		.then(docs => {
			docs.forEach(doc => doc.ref.delete());
		})
		.catch(err => res.status(500).json({message: err}));
	res.status(204).end();
};