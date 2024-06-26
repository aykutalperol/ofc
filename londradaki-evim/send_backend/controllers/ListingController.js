// controllers/ListingController.js
const Listing = require('../models/Listing');

exports.create = async (req, res) => {
  const { title, description, price, location, images } = req.body;
  const owner = req.user.id;

  try {
    const newListing = new Listing({ title, description, price, location, images, owner });
    const listing = await newListing.save();
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAll = async (req, res) => {
  try {
    const listings = await Listing.find().populate('owner', ['firstName', 'lastName']);
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
