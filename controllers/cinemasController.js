const express = require("express");
const router = express.Router();
const models = require("../models/cinemasModel.js");
const mongoose = require("mongoose");

router.use(function(req, res, next) {
  // do logging
  console.log(
    "Server got a request on route: " +
      " <" +
      req.path +
      "> " +
      " with params " +
      JSON.stringify(req.query)
  );
  next();
});

// post logic controllers
router.post("/cinema", (req, res, next) => {
  if (req.query.hasOwnProperty("name") && req.query.hasOwnProperty("city")) {
    let cinema = new models.Cinema({
      _id: req.query.name,
      city: req.query.city
    });

    cinema.save(function(err) {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.status(201).send("Successfully added a cinema: " + cinema);
      return;
    });
  } else {
    res.status(400).send("You've missed some properties");
    return;
  }
});

router.post("/screeningRoom", (req, res, next) => {
  if (
    req.query.hasOwnProperty("cinemaName") &&
    req.query.hasOwnProperty("roomName") &&
    req.query.hasOwnProperty("seatsNumber")
  ) {
    // models.Cinema.findById(req.query.cinemaName, function(err, cin) {
    //   if (err) {
    //     res.status(400).send(err + "You can not add a room to not existing cinema");
    //     return;
    //   };

    //   cin.rooms.push(req.query.roomName);

    //   cin.save(function(err, updatedCinema) {
    //     if (err) {
    //         res.status(400).send("Error updating cinema object");
    //         return
    //     }
    //     console.log(updatedCinema);
    //     return
    //   });
    // });

    let screeningRoom = new models.ScreeningRoom({
      cinemaId: req.query.cinemaName,
      roomName: req.query.roomName,
      seatsNumber: req.query.seatsNumber
    });

    screeningRoom.save(function(err) {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res
        .status(201)
        .send("Successfully added a screeningRoom: " + screeningRoom);
      return;
    });
  } else {
    res.status(400).send("You've missed some properties");
    return;
  }
  return;
});

router.post("/movie", (req, res, next) => {
  if (
    req.query.hasOwnProperty("movieTitle") &&
    req.query.hasOwnProperty("movieYear") &&
    req.query.hasOwnProperty("movieDuration")
  ) {
    let movie = new models.Movie({
      title: req.query.movieTitle,
      year: req.query.movieYear,
      duration: req.query.movieDuration
    });

    movie.save(function(err) {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.status(201).send("Successfully added a movie: " + movie);
      return;
    });

    return;
  } else {
    res.status(400).send("You've missed some properties");
    return;
  }
});

router.post("/movie-session", (req, res, next) => {
  if (
    req.query.hasOwnProperty("roomId") &&
    req.query.hasOwnProperty("filmId") &&
    req.query.hasOwnProperty("date")
  ) {
    let session = new models.ScreeningSession({
      roomId: req.query.roomId,
      filmId: req.query.filmId,
      date: req.query.date
    });

    session.save(function(err) {
      if (err) {
        res.status(400).send(err);
        return;
      }
      res.status(201).send("Successfully added a movieSession: " + session);
      return;
    });

    return;
  } else {
    res.status(400).send("You've missed some properties");
  }
});

// get logic controllers
router.get("/cinema", (req, res, next) => {
  models.Cinema.find({}, function(err, resp) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      return;
    } else if (resp == null) {
      res.status(404).send("No objects were found");
      return;
    }
    res.status(201).send(resp);
    return;
  });
});

router.get("/ScreeningRooms", (req, res, next) => {
  if (req.query.hasOwnProperty("name")) {
    models.ScreeningRoom.find({ cinemaId: req.query.name }, function(
      err,
      resp
    ) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        return;
      } else if (resp == null) {
        res.status(404).send("No objects were found");
        return;
      }
      res.status(201).send(resp);
      return;
    });
  } else {
    res.status(400).send("You've missed some properties");
  }
});

router.get("/movies", (req, res, next) => {
    models.Movie.find({}, function(err, resp) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
          return;
        } else if (resp == null) {
          res.status(404).send("No objects were found");
          return;
        }
        res.status(201).send(resp);
        return;
      });
});

router.get("/movies", (req, res, next) => {
    models.Movie.find({}, function(err, resp) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
          return;
        } else if (resp == null) {
          res.status(404).send("No objects were found");
          return;
        }
        res.status(201).send(resp);
        return;
      });
});

router.get("/movie-session", (req, res, next) => {
    if (
        req.query.hasOwnProperty("movieTitle") &&
        req.query.hasOwnProperty("date")
    ) {
        models.Movie.find({ title: req.query.movieTitle }, function(err, resp) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
          } else if (resp == null) {
            res.status(404).send("No objects were found");
            return;
          }

          let id = 0;
          resp.map((x) => {id = x._id})

          models.ScreeningSession.find({ filmId: id, date: req.query.date}, (err, resu) => {
            if (err) {
                console.log(err);
                res.status(400).send(err);
                return;
              }
              res.status(201).send(resu);
              return
          })
          return
        });
      } else {
        res.status(400).send("You've missed some properties");
      }
});

module.exports = router;
