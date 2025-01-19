import Listing from "../models/listing.model.js";
import { errorHandler } from "../utills/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found bruv!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listing!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "listing not found, Ayiko!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update you own listing."));
  }
  try {
const updatedListing = await Listing.findByIdAndUpdate(
 req.params.id,
 req.body,
 { new: true } 
);
res.status(200).json(updatedListing);
  } catch (error) {
    next(error)
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

export const getListings = async (req, res, next) => {
  try {

  //   const limit = parseInt(req.query.limit) || 9;
  //   const startIndex = parseInt(req.query.startIndex) || 0;

    // let offer = req.query.offer === 'true' ? true : req.query.offer === 'false' ? false : { $in: [true, false] };
  //   let furnished = req.query.furnished === 'true' ? true : req.query.furnished === 'false' ? false : { $in: [true, false] };
  //   let parking = req.query.parking === 'true' ? true : req.query.parking === 'false' ? false : { $in: [true, false] };
  //   let type = req.query.type === 'all' ? { $in: ['sale', 'rent'] } : req.query.type;
  //   const searchTerm = req.query.searchTerm || '';
  //   const sort = req.query.sort || 'createdAt';
  //   const order = req.query.order === 'asc' ? 1 : -1;

  //   const filters = {
  //     name: { $regex: searchTerm, $options: 'i' },
  //     furnished,
  //     parking,
  //     offer,
  //     ...(type && { type }),
  //   };

  //   const listings = await Listing.find(filters)
  //     .sort({ [sort]: order })
  //     .limit(limit)
  //     .skip(startIndex);

  //   res.status(200).json(listings);
  // } catch (error) {
  //   console.error('Error in getListings:', error);
  //   next(error);
  // }

  //=================================================================


    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let offer = req.query.offer;
    if (offer === 'false' || offer === false) {
      offer = { $in: [true, false]};
    }

    let furnished = req.query.furnished;
    if (furnished === 'false' || furnished === false) {
      furnished = {$in: [false, true]}
    }

    let parking = req.query.parking;
    if (parking === 'false' || parking === false) {
      parking = {$in: [false, true]}
    }
    
    let type = req.query.type;
    if (type === 'false' || type === 'all') {
      type = {$in: ['sale', 'rent']}; 
    }

    const searchTerm = req.query.searchTerm || '';              

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: {$regex: searchTerm, $options: 'i'},
      furnished,
      parking,
      type,
      offer,
    }).sort(
      {[sort]: order}
    ).limit(limit).skip(startIndex);

    return res.status(200).json(listings)



    
  } catch (error) {
    next(error)
  }
}