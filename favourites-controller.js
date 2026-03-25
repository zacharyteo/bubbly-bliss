exports.addFavourite = async (req, res) => {
    try {
        // Step 1: Get memeId from the URL params and userId from session
        // Step 2: Check if already favourited using checkFavourite
        // Step 3: If already exists, redirect back with error
        // Step 4: If not, create new favourite
        // Step 5: Redirect back to meme
    } catch (err) {
        // handle error
    }
}

exports.getFavourites = async (req, res) => {
    try {
        // Step 1: Get userId from session
        // Step 2: Get all favourites for that user
        // Step 3: Render favourites page with data
    } catch (err) {
        // handle error
    }
}

exports.updateFavourite = async (req, res) => {
    try {
        // Step 1: Get favouriteId from URL params
        // Step 2: Get updated note/folder from req.body
        // Step 3: Update the favourite
        // Step 4: Redirect back to favourites page
    } catch (err) {
        // handle error
    }
}

exports.removeFavourite = async (req, res) => {
    try {
        // Step 1: Get favouriteId from URL params
        // Step 2: Delete the favourite
        // Step 3: Redirect back to favourites page
    } catch (err) {
        // handle error
    }
}
