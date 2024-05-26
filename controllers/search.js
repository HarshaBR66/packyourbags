const Listing = require("../models/listing");

module.exports.renderSearch = async (req, res) => {
    const searchQuery = req.query.query;
    console.log(searchQuery);
    try {
        // If search query is empty, redirect to the listing page
        if (!searchQuery) {
            return res.redirect("/listings");
        }

        // Search for listings where title or description matches the search query
        const listings = await Listing.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        // Render the results
        return res.render('./listings/search', { searchQuery, listings });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
