// src/components/AirAgentDashboard.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Switch, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import FlightIcon from "@material-ui/icons/Flight";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonIcon from "@material-ui/icons/Person";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckoutModalEmail from "./CheckoutModalEmail";

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
    cursor: "not-allowed",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#182e55",
    fontWeight: "bold",
    "&:hover": {
      transform: "scale(1)",
    },
  },
  selected: {
    backgroundColor: "#4CAF50 !important",
    color: "#fff",
  },
  pointerSelected: {
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  sold: {
    backgroundColor: "#ff964f !important",
    fontSize: "11px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
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
    marginTop: "25px",
    // navy blue border
    padding: "30px",
    // shadow
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    flexDirection: "column",
    alignItems: "center",
    width: "40%",
  },
}));

const AirAgentDashboard = () => {
  const location = useLocation();
  const selectedFlight = location.state && location.state.selectedFlight;
  const classes = useStyles();
  const [selectedSeat, setSelectedSeat] = useState("");
  const [viewMode, setViewMode] = useState(true);
  const seatOptions = ["ordinary", "comfort", "business"];
  const [selectedPage, setSelectedPage] = useState("passenger");
  const [seatToBook, setSeatToBook] = useState(null);
  const seatPrices = {
    // Need to get this from the backend
    ordinary: 100,
    comfort: 140,
    business: 250,
  };
  const [passengerList, setPassengerList] = useState([
    // Need to get this from the backend
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      seat: "A1",
      seatType: "business",
    },
    {
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      seat: "A3",
      seatType: "comfort",
    },
    {
      name: "Sarah Doe",
      email: "sarahdoe@gmail.com",
      seat: "B2",
      seatType: "comfort",
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      seat: "G12",
      seatType: "ordinary",
    },
    {
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      seat: "D7",
      seatType: "ordinary",
    },
  ]);

  const soldOutSeats = passengerList.map((passenger) => passenger.seat) || [];
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const getSeatNumber = (row, seat) => {
    const seatLetter = String.fromCharCode(64 + seat);
    return `${seatLetter}${row}`;
  };

  const getPassegerName = (seat) => {
    const passenger = passengerList.find(
      (passenger) => passenger.seat === seat
    );
    return passenger && passenger.name;
  };

  const getSeatType = (seat) => {
    // return business is seat is in first 3 rows
    // return comfort if seat is in first 5 rows
    // return ordinary if seat is in first 13 rows
    const row = seat.split("")[1];
    if (row < 2) {
      return seatOptions[2];
    } else if (row < 5) {
      return seatOptions[1];
    } else {
      return seatOptions[0];
    }

  };

  const getIconColor = (passenger) => {
    const seatType = passenger;
    if (seatType === "business") {
      return "#0d369d";
    } else if (seatType === "comfort") {
      return "#0086f3";
    } else {
      return "#b4d9ff";
    }
  };

  const getSeatPrice = (seat) => {
    const seatType = getSeatType(seat);
    return seatPrices[seatType];
  };

  // Function to check if a seat is sold out
  const isSoldOut = (rowIndex, seatIndex) => {
    // Convert the row and seat index into a seat number
    const seatKey = getSeatNumber(rowIndex, seatIndex);
    return soldOutSeats.includes(seatKey);
  };

  const isSoldOut2 = (seatKey) => {
    return soldOutSeats.includes(seatKey);
  };


  // Updated handleSeatClick function
  const handleSeatClick = (rowIndex, seatIndex) => {
    // Convert the row and seat index into a seat number
    const seatKey = getSeatNumber(rowIndex, seatIndex);

    // Cannot select a seat that is NOT sold out
    if (!isSoldOut(rowIndex, seatIndex) && viewMode) {
      return;
    }

    setSelectedSeat(seatKey);
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
                    className={`
                    ${classes.seat}  ${
                      seatClassifier(rowIndex, seat) === seatOptions[2]
                        ? classes.business
                        : ""
                    }
                    ${
                      selectedSeat === getSeatNumber(rowIndex, seat)
                        ? classes.selected
                        : ""
                    }
                    ${
                      !viewMode && !isSoldOut(rowIndex, seat)
                        ? classes.pointerSelected
                        : ""
                    }
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[1]
                      ? classes.comfort
                      : ""
                  }
                  
                  ${isSoldOut(rowIndex, seat) ? classes.sold : ""}
                  `}
                    onClick={() => handleSeatClick(rowIndex, seat)}
                  >
                    {!isSoldOut(rowIndex, seat)
                      ? ""
                      : getSeatNumber(rowIndex, seat)}
                    {!viewMode && !isSoldOut(rowIndex, seat)
                      ? getSeatNumber(rowIndex, seat)
                      : ""}
                  </div>
                ))}
                <div style={{ width: "32px" }}></div>
                {[3, 4, 5].map((seat) => (
                  <div
                    key={seat}
                    className={`${classes.seat}  ${
                      seatClassifier(rowIndex, seat) === seatOptions[2]
                        ? classes.business
                        : ""
                    }
                    ${
                      selectedSeat === getSeatNumber(rowIndex, seat)
                        ? classes.selected
                        : ""
                    }
                    ${
                      !viewMode && !isSoldOut(rowIndex, seat)
                        ? classes.pointerSelected
                        : ""
                    }
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[1]
                      ? classes.comfort
                      : ""
                  }
                  ${isSoldOut(rowIndex, seat) ? classes.sold : ""}
                  `}
                    onClick={() => handleSeatClick(rowIndex, seat)}
                  >
                    {!isSoldOut(rowIndex, seat)
                      ? ""
                      : getSeatNumber(rowIndex, seat)}
                    {!viewMode && !isSoldOut(rowIndex, seat)
                      ? getSeatNumber(rowIndex, seat)
                      : ""}
                  </div>
                ))}
                <div style={{ width: "32px" }}></div>
                {[6, 7].map((seat) => (
                  <div
                    key={seat}
                    className={`${classes.seat} 
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[2]
                      ? classes.business
                      : ""
                  }
                  ${
                    selectedSeat === getSeatNumber(rowIndex, seat)
                      ? classes.selected
                      : ""
                  }
                    ${
                      !viewMode && !isSoldOut(rowIndex, seat)
                        ? classes.pointerSelected
                        : ""
                    }
                  ${
                    seatClassifier(rowIndex, seat) === seatOptions[1]
                      ? classes.comfort
                      : ""
                  }
                  ${isSoldOut(rowIndex, seat) ? classes.sold : ""}
                  `}
                    onClick={() => handleSeatClick(rowIndex, seat)}
                  >
                    {!isSoldOut(rowIndex, seat)
                      ? ""
                      : getSeatNumber(rowIndex, seat)}
                    {!viewMode && !isSoldOut(rowIndex, seat)
                      ? getSeatNumber(rowIndex, seat)
                      : ""}
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
            className={`${classes.seat} ${classes.sold} ${classes.legendItem} ${classes.seatPrev}`}
          >
            Reserved
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

        <FormControlLabel
          control={
            <Switch
              checked={viewMode}
              onChange={() => setViewMode(!viewMode)}
              name="viewMode"
              color="primary"
              value={viewMode}
            />
          }
          label="View Mode"
        />

        <div className={classes.containerInfo}>
          <BottomNavigation
            className={classes.seatSelector}
            showLabels
            value={selectedPage}
            onChange={(event, newValue) => {
              setSelectedPage(newValue);
            }}
          >
            <BottomNavigationAction label="Passenger" value="passenger" />
            <BottomNavigationAction
              label="Passenger List"
              value="passengerList"
            />
          </BottomNavigation>

          {/* Display Single Passenger Info, based on selected seat */}
          {selectedPage === "passenger" && (
            <div className={classes.selectedSeatsContainer}>
              <Paper elevation={3} className={classes.passengerDetailPaper}>
                <List>
                  <ListItem>
                    <ListItemIcon
                      style={{ color: getIconColor(getSeatType(selectedSeat)) }}
                    >
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={getPassegerName(selectedSeat)}
                      secondary={`Seat: ${selectedSeat}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EventSeatIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Seat Type: ${getSeatType(selectedSeat)}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Price: ${getSeatPrice(selectedSeat)}`}
                    />
                  </ListItem>
                </List>
              </Paper>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                disabled={
                  viewMode || !selectedSeat || isSoldOut2(selectedSeat)
                }
                onClick={() => {
                  setIsCheckoutModalOpen({
                    isOpen: true,
                    onClose: () => setIsCheckoutModalOpen(false),
                    totalAmount: getSeatPrice(selectedSeat),
                    selectedFlight: selectedFlight,
                    selectedSeats: [selectedSeat],
                  });
                }}
              >
                Book Now
              </Button>
            </div>
          )}
          {/* Display Passenger List */}
          {selectedPage === "passengerList" && (
            <div className={classes.selectedSeatsContainer}>
              <Paper elevation={3} className={classes.passengerListPaper}>
                <List style={{ overflow: "auto", maxHeight: "250px" }}>
                  {passengerList.map((passenger) => (
                    <ListItem key={passenger.name}>
                      <ListItemIcon
                        style={{ color: getIconColor(passenger.seatType) }}
                      >
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={passenger.name}
                        secondary={`Seat: ${passenger.seat} | ${passenger.seatType} ${passenger.email}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </div>
          )}
          <CheckoutModalEmail
            isOpen={isCheckoutModalOpen}
            onClose={() => setIsCheckoutModalOpen(false)}
            totalAmount={getSeatPrice(selectedSeat)}
            selectedFlight={selectedFlight}
            selectedSeats={[selectedSeat]}
          />
        </div>
      </div>
    </div>
  );
};

export default AirAgentDashboard;