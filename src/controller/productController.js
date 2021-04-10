const Product = require('../models/product');
const slugify = require('slugify');

exports.addProduct = (req, res) => {
	const { name, price, description, offer, category, quantity } = req.body;
	let productPicture = [];

	if (req.files.length > 0) {
		productPicture = req.files.map((file) => {
			return { img: file.filename };
		});
	}

	// res.status(200).json({ file: req.files, body: req.body });
	const productObj = {
		name,
		slug: slugify(name),
		price,
		description,
		offer,
		productPicture,
		category,
		quantity,
		createdBy: req.user._id,
	};
	const product = new Product(productObj);
	product.save((error, pro) => {
		if (error) return res.status(400).json({ error });
		if (pro) {
			return res.status(201).json({ product: pro });
		}
	});
};

// exports.fetchCategory = (req, res) => {
// 	Category.find({}).exec((error, categories) => {
// 		if (error) return res.status(400).json({ error });
// 		if (categories) {
// 			const categoryList = createCategories(categories);
// 			return res.status(200).json({ categoryList });
// 		}
// 	});
// };
