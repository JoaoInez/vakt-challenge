module.exports = ({ user, listing }) => {
  user.hasMany(listing);
  listing.belongsTo(user);
};
