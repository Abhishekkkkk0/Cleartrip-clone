import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

function CalendarDisplay({ selectedDate, onDateChange, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label} // Use the label prop to display custom labels for each calendar
        value={selectedDate} // Selected date should be a Dayjs object
        onChange={(newDate) => onDateChange(newDate)} // 'newDate' is a Dayjs object
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined" // Styling the input field
            fullWidth
            size="small"
          />
        )}
      />
    </LocalizationProvider>
  );
}

CalendarDisplay.propTypes = {
  selectedDate: PropTypes.object, // Expecting a Dayjs object
  onDateChange: PropTypes.func.isRequired, // Function to handle date changes
  label: PropTypes.string.isRequired, // Label for the calendar input
};

export default CalendarDisplay;
