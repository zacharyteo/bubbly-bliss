const mongoose = require('mongoose')

const favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    memeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meme',
        required: true
    },
    note: {
        type: String,
        default: ''
    },
    folder: {
        type: String,
        default: 'General'
    }
}, { timestamps: true })

const Favourite = mongoose.model('Favourite', favouriteSchema)

// CREATE — save a meme to favourites
exports.addFavourite = function(favouriteData) {
    return Favourite.create(favouriteData)
}

// READ — get all favourites for a user
exports.getFavouritesByUser = function(userId) {
    return Favourite.find({ userId: userId }).populate('memeId')
}

// READ — check if a meme is already saved by a user
exports.checkFavourite = function(userId, memeId) {
    return Favourite.findOne({ userId: userId, memeId: memeId })
}

// UPDATE — edit note or folder on a saved meme
exports.updateFavourite = function(favouriteId, updatedData) {
    return Favourite.findByIdAndUpdate(favouriteId, updatedData, { new: true })
}

// DELETE — unsave a meme
exports.removeFavourite = function(favouriteId) {
    return Favourite.findByIdAndDelete(favouriteId)
}