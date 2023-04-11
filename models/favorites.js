const favoriteSchema = new Schema(
    {
      idUser: { type: Schema.Types.ObjectId, ref: 'users' },
      idMovie: { type: Schema.Types.ObjectId, ref: 'movies' },
      score: Integer,
    },
    { collection: 'favorites' }
  );
  const Favorite = mongoose.model('favorites', favoriteSchema);
  module.exports = Favorite;