const { log } = require("./middleware/logger");

function getSingleDocument(docs) {
	return docs[0];
};

exports.whatever = async function(req, res) {
	try {
		const docs = await ProductRef.where("stuff", "==", "otherstuff").get()
		res.json(getSingleDocument(docs).data());
	} catch (error) {
		res.status(500).end();
		log.error(error);
	}
};
