import React, { useState } from "react";
import { Button, Popover, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const RoomGuestSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]); // Default: 1 room, 1 adult, 0 children

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  const removeRoom = (index) => {
    const updatedRooms = rooms.filter((_, roomIndex) => roomIndex !== index);
    setRooms(updatedRooms);
  };

  const updateOccupants = (roomIndex, field, increment) => {
    const updatedRooms = [...rooms];
    const totalOccupants = updatedRooms[roomIndex].adults + updatedRooms[roomIndex].children;

    if (increment && totalOccupants < 4) {
      updatedRooms[roomIndex][field] += 1;
    } else if (!increment && updatedRooms[roomIndex][field] > 0) {
      updatedRooms[roomIndex][field] -= 1;
    }

    setRooms(updatedRooms);
  };

  const totalRooms = rooms.length;
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);

  const open = Boolean(anchorEl);
  const id = open ? "room-guest-selector" : undefined;

  return (
    <div>
      {/* Button to trigger dropdown */}
      <Button
        variant="outlined"
        onClick={handleOpen}
        sx={{
          color: "black", // Text color
          borderColor: "lightgrey", // Light grey border
          width: "200px", // Increased width
          height: "50px", // Slightly increased height
          textTransform: "none", // Keep text case as is
          "&:hover": {
            borderColor: "black", // Black border on hover
            backgroundColor: "transparent", // Remove light blue hover effect
          },
        }}
      >
        {`${totalRooms} Room${totalRooms > 1 ? "s" : ""}, ${totalAdults} Adult${totalAdults > 1 ? "s" : ""}`}
      </Button>

      {/* Popover for dropdown */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, width: 300 }}>
          {rooms.map((room, index) => (
            <Box key={index} sx={{ marginBottom: 3 }}>
              <Typography variant="h6" gutterBottom>
                Room {index + 1}
              </Typography>

              {/* Adults Section */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography>Adults (12+ years)</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => updateOccupants(index, "adults", false)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{room.adults}</Typography>
                  <IconButton onClick={() => updateOccupants(index, "adults", true)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Children Section */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                <Typography>Children (1-11 years)</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => updateOccupants(index, "children", false)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{room.children}</Typography>
                  <IconButton onClick={() => updateOccupants(index, "children", true)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Remove Room Button (except first room) */}
              {rooms.length > 1 && (
                <Button
                  variant="text"
                  color="error"
                  onClick={() => removeRoom(index)}
                  size="small"
                >
                  Remove Room
                </Button>
              )}
            </Box>
          ))}

          {/* Add Another Room Button */}
          <Button
            variant="outlined"
            fullWidth
            onClick={addRoom}
            disabled={rooms.length >= 5} // Optional: Limit total rooms
          >
            Add Another Room
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default RoomGuestSelector;
