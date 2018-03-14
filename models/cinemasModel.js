const mongoose = require("mongoose");
const mongoDB = "mongodb://mike:1421op8390@ds261128.mlab.com:61128/cinema-test";
const Schema = mongoose.Schema;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const cinemaSchema = new Schema({
  _id: Schema.Types.String, // cinema name
  city: String,
  rooms: [{ type: Schema.Types.String, ref: "ScreeningRoom" }]
});

const screeningRoomSchema = new Schema({
  cinemaId: { type: Schema.Types.String, ref: "Cinema" },
  roomName: String,
  seatsNumber: Number,
  screeningSessions: [{ type: Schema.Types.String, ref: "ScreeningSession" }]
});

const screeningSessionSchema = new Schema({
  roomId: { type: Schema.Types.String, ref: "ScreeningRoom" },
  filmId: { type: Schema.Types.String, ref: "Movie" },
  date: String
});

const movieSchema = new Schema({
  title: String,
  year: Number,
  duration: Number
});

const Cinema = mongoose.model("Cinema", cinemaSchema);
const ScreeningRoom = mongoose.model("ScreeningRoom", screeningRoomSchema);
const ScreeningSession = mongoose.model(
  "ScreeningSession",
  screeningSessionSchema
);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
    Cinema,
    ScreeningRoom,
    ScreeningSession,
    Movie
}