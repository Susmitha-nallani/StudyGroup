import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import Navbar from "../Navigation/Navigation";

const TimeInput = styled(TextField)`
  width: 100%;
`;

const ContactInput = styled(TextField)`
  width: 48%;
  margin-right: 1%;
  margin-bottom: 1rem;
`;

const InviteFriendsInput = styled(TextField)`
  width: 100%;
`;

const ResponsiveContainer = styled(Container)`
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const CalendarEventForm = () => {
  const [startTime, setStartTime] = React.useState("9am");
  const [endTime, setEndTime] = React.useState("10am");

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  return (
    <ResponsiveContainer maxWidth="md">
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Request study time
        </Typography>
      </Box>
      <FormControl component="form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TimeInput
              id="start-time"
              label="Start time"
              value={startTime}
              onChange={handleStartTimeChange}
              select
              variant="outlined"
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </TimeInput>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimeInput
              id="end-time"
              label="End time"
              value={endTime}
              onChange={handleEndTimeChange}
              select
              variant="outlined"
            >
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </TimeInput>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="contact-method">Invite Friend</FormLabel>
              <RadioGroup
                aria-labelledby="contact-method"
                name="contact-method"
                row
              >
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label="Phone"
                />
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ContactInput
              id="phone-number"
              label="Phone number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ContactInput id="email" label="Email" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <InviteFriendsInput
              id="invite-friends"
              label="Invite friends"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <Navbar />
    </ResponsiveContainer>
  );
};

const times = [
  "9am",
  "10am",
  "11am",
  "12pm",
  "7pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
];

export default CalendarEventForm;
