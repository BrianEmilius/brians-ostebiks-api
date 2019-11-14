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

exports.getAllProducts = async function(req, res) {
	try {
		let docs;
		req.query.category
			? docs = await ProductRef.where("category", "==", req.query.category)
			: docs = await ProductRef.get();
		const results = [];
		docs.forEach(doc => results.push(doc.data()));
		res.json(results);
	} catch (error) {
		log.error(error.stack);
		res.status(500).end();
	}
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

exports.deleteProduct = async function(req, res) {
	try {
		const docs = await ProductRef.where("sku", "==", req.params.sku).get();
		docs.forEach(doc => doc.ref.delete());
		res.status(204).end();
	} catch (error) {
		log.error(error.stack);
		res.status(500).end();
	}
};