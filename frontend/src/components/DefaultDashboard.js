// src/components/DefaultDashboard.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Button from "@material-ui/core/Button";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import FlightIcon from "@material-ui/icons/Flight";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";


const numRows = 13;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100vh",
  },
  seatSelection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
    height: "100%",
  },
  plane: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },
  seat: {
    backgroundColor: "#b4d9ff",
    height: "35px", // Adjust the height as needed
    width: "35px", // Adjust the width as needed
    margin: "3px", // Adjust the margin as needed
    fontSize: "11px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#182e55",
    fontWeight: "bold",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  selected: {
    backgroundColor: "#4CAF50 !important",
    color: "#fff",
  },
  sold: {
    backgroundColor: "#d4d9de !important",
    fontSize: "14px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "not-allowed",
    "&:hover": {
      transform: "scale(1)",
    },
  },
  infoContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
    width: "50%",
  },
  text: {
    margin: "5px 0",
  },
  business: {
    backgroundColor: "#0d369d",
    color: "#fff",
  },
  comfort: {
    backgroundColor: "#0086f3",
    color: "#fff",
  },
  filtered: {
    backgroundColor: "#d4d9de",
    color: "#fff",
    cursor: "not-allowed",
    "&:hover": {
      transform: "scale(1)",
    },
  },
  legendContainer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    marginBottom: theme.spacing(2),
  },
  legendItem: {
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
  },
  seatSelector: {
    marginBottom: theme.spacing(2),
    backgroundColor: "inherit",
    width: "100%",
  },
  selectedSeatsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    width: "100%",
    height: "50%",
    marginTop: theme.spacing(2),
  },
  seatPrev: {
    // make bigger
    height: "60px",
    width: "60px",
    "&:hover": {
      transform: "scale(1)",
    },
    cursor: "default",
  },
  containerInfo: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginTop: "45px",
    // navy blue border
    padding: "30px",
    // shadow
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    flexDirection: "column",
    alignItems: "center",
    height: "75%",
    width: "40%",
  },
}));

const DefaultDashboard = () => {
  const location = useLocation();
  const selectedFlight = location.state && location.state.selectedFlight;
  const classes = useStyles();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatOptions = ["ordinary", "comfort", "business"];
  const [selectedSeatType, setSelectedSeatType] = useState("all");

  const soldOutSeats = ["A1", "A3", "B2", "G12", "D7"]; // Need to get this from the backend
  const seatPrices = {
    // Need to get this from the backend
    ordinary: 100,
    comfort: 140,
    business: 250,
  };

  const getSeatNumber = (row, seat) => {
    const seatLetter = String.fromCharCode(64 + seat);
    return `${seatLetter}${row}`;
  };

  const convertSeatFormat = (seatKey) => {
    const seat = seatKey.split("-")[1];
    const row = seatKey.split("-")[0];
    const seatLetter = String.fromCharCode(64 + parseInt(seat));
    return `${seatLetter}${row}`;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    selectedSeats.forEach((seat) => {
      const seatType = seatClassifier(
        parseInt(seat.split("-")[0]),
        parseInt(seat.split("-")[1])
      );
      totalPrice += seatPrices[seatType];
    });

    return totalPrice;
  };

  // Function to check if a seat is sold out
  const isSoldOut = (rowIndex, seatIndex) => {
    // Convert the row and seat index into a seat number
    const seatKey = getSeatNumber(rowIndex, seatIndex);
    return soldOutSeats.includes(seatKey);
  };

  // Function to filter seats based on the selected type
  const filterSeatsByType = (rowIndex, seatIndex) => {
    const seatType = seatClassifier(rowIndex, seatIndex);
    return selectedSeatType === "all" || seatType === selectedSeatType;
  };

  // Updated handleSeatClick function
  const handleSeatClick = (rowIndex, seatIndex) => {
    const newSelectedSeats = [...selectedSeats];
    const seatKey = `${rowIndex}-${seatIndex}`;
    const seatIndexInSelectedSeats = newSelectedSeats.indexOf(seatKey);

    // Check if the seat is sold out
    if (
      isSoldOut(rowIndex, seatIndex) ||
      !filterSeatsByType(rowIndex, seatIndex)
    ) {
      // Seat is sold out, do nothing
      return;
    }

    if (seatIndexInSelectedSeats !== -1) {
      newSelectedSeats.splice(seatIndexInSelectedSeats, 1);
    } else {
      newSelectedSeats.push(seatKey);
    }

    setSelectedSeats(newSelectedSeats);
  };

  const seatClassifier = (rowIndex, seatIndex) => {
    // return business is seat is in first 3 rows
    // return comfort if seat is in first 5 rows
    // return ordinary if seat is in first 13 rows
    if (rowIndex < 2) {
      return seatOptions[2];
    } else if (rowIndex < 5) {
      return seatOptions[1];
    } else {
      return seatOptions[0];
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.seatSelection}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e9effb",
            height: "100%",
            padding: "20px",
          }}
        >
          <div className={classes.plane}>
            {[...Array(numRows)].map((_, rowIndex) => (
              <div key={rowIndex} className={classes.row}>
                {[1, 2].map((seat) => (
                  <div
                    key={seat}
                    className={`${classes.seat} ${
                      selectedSeats.includes(`${rowIndex}-${seat}`)
                        ? classes.selected
                        : ""
                    } ${
                      seatClassifier(rowIndex, seat) === seatOptions[2]
                        ? classes.business
                        : ""
                    }
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[1]
                      ? classes.comfort
                      : ""
                  }
                  ${isSoldOut(rowIndex, seat) ? classes.sold : ""}
                  ${!filterSeatsByType(rowIndex, seat) ? classes.filtered : ""}
                  `}
                    onClick={() => handleSeatClick(rowIndex, seat)}
                  >
                    {!isSoldOut(rowIndex, seat)
                      ? getSeatNumber(rowIndex, seat)
                      : "X"}
                  </div>
                ))}
                <div style={{ width: "32px" }}></div>
                {[3, 4, 5].map((seat) => (
                  <div
                    key={seat}
                    className={`${classes.seat} ${
                      selectedSeats.includes(`${rowIndex}-${seat}`)
                        ? classes.selected
                        : ""
                    } ${
                      seatClassifier(rowIndex, seat) === seatOptions[2]
                        ? classes.business
                        : ""
                    }
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[1]
                      ? classes.comfort
                      : ""
                  }
                  ${isSoldOut(rowIndex, seat) ? classes.sold : ""}
                  ${!filterSeatsByType(rowIndex, seat) ? classes.filtered : ""}
                  `}
                    onClick={() => handleSeatClick(rowIndex, seat)}
                  >
                    {!isSoldOut(rowIndex, seat)
                      ? getSeatNumber(rowIndex, seat)
                      : "X"}
                  </div>
                ))}
                <div style={{ width: "32px" }}></div>
                {[6, 7].map((seat) => (
                  <div
                    key={seat}
                    className={`${classes.seat} ${
                      selectedSeats.includes(`${rowIndex}-${seat}`)
                        ? classes.selected
                        : ""
                    } 
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[2]
                      ? classes.business
                      : ""
                  }
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[1]
                      ? classes.comfort
                      : ""
                  }
                  ${isSoldOut(rowIndex, seat) ? classes.sold : ""}
                  ${!filterSeatsByType(rowIndex, seat) ? classes.filtered : ""}
                  `}
                    onClick={() => handleSeatClick(rowIndex, seat)}
                  >
                    {!isSoldOut(rowIndex, seat)
                      ? getSeatNumber(rowIndex, seat)
                      : "X"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={classes.infoContainer}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <FlightTakeoffIcon fontSize="large" style={{ marginRight: "10px" }} />
          <Typography variant="subtitle1">{selectedFlight.origin}</Typography>
          <FlightIcon
            fontSize="large"
            style={{ margin: "0 10px", marginLeft: "30px" }}
          />
          <Typography variant="subtitle1">
            {selectedFlight.flightNumber}
          </Typography>
          <FlightLandIcon
            fontSize="large"
            style={{ margin: "0 10px", marginLeft: "30px" }}
          />
          <Typography variant="subtitle1">
            {selectedFlight.destination}
          </Typography>
          <AccessTimeIcon
            fontSize="large"
            style={{ margin: "0 10px", marginLeft: "30px" }}
          />
          <Typography variant="subtitle1">{selectedFlight.duration}</Typography>
        </div>
        <div className={classes.legendContainer}>
          <div
            className={`${classes.seat} ${classes.selected} ${classes.legendItem} ${classes.seatPrev}`}
          >
            Selected
          </div>
          <div
            className={`${classes.seat} ${classes.comfort} ${classes.legendItem} ${classes.seatPrev}`}
          >
            Comfort
          </div>
          <div
            className={`${classes.seat} ${classes.business} ${classes.legendItem}  ${classes.seatPrev}`}
          >
            Business
          </div>
          <div
            className={`${classes.seat} ${classes.seat} ${classes.legendItem}  ${classes.seatPrev}`}
          >
            Ordinary
          </div>
        </div>

        <div className={classes.containerInfo}>
          <BottomNavigation
            className={classes.seatSelector}
            showLabels
            value={selectedSeatType}
            onChange={(event, newValue) => {
              setSelectedSeatType(newValue);
            }}
          >
            <BottomNavigationAction label="All" value="all" />
            <BottomNavigationAction label="Business" value="business" />
            <BottomNavigationAction label="Comfort" value="comfort" />
            <BottomNavigationAction label="Ordinary" value="ordinary" />
          </BottomNavigation>
          <div className={classes.selectedSeatsContainer}>
            <div className={classes.text}>
              <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Selected Seats:`}
                      secondary={selectedSeats.map((seat, index) =>
                        index === selectedSeats.length - 1
                          ? convertSeatFormat(seat)
                          : convertSeatFormat(seat) + ", "
                      )}
                    />
                  </ListItem>
            </div>
          </div>
          {/* Checkout button and total price */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ marginTop: "10px" }}>
              <strong>Total Price:</strong> ${calculateTotalPrice()}
            </div>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              onClick={() => {
                // You can implement the checkout logic here
                alert(
                  `Checkout Successful! Total Price: $${calculateTotalPrice()}`
                );
              }}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultDashboard;
