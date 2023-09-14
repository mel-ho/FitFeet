import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Grid, TextField, Checkbox } from "@mui/material";

import UserContext from "../context/user";

import useFetch from "../hooks/useFetch";

const DisplayProfile = () => {
  const userCtx = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [shippingAddress, setShippingAddress] = useState("");
  const [climbingExperience, setClimbingExperience] = useState({
    sport_climbing: false,
    bouldering: false,
    trad_climbing: false,
    years_exp: 0,
  });

  const fetchData = useFetch();

  const getUserProfile = async () => {
    const user_id = userCtx.userId; // Retrieve user ID from context
    const res = await fetchData(
      `/users/users/${user_id}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setUserData(res.data);
    } else {
      console.error("Error fetching user profile: ", res.data);
    }
  };

  const getShippingAddress = async () => {
    const user_id = userCtx.userId; // Retrieve user ID from context
    const res = await fetchData(
      `/users/useraddress/${user_id}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setShippingAddress(res.data.shipping_address || "");
    } else {
      console.error("Error fetching shipping address: ", res);
    }
  };

  const handleSaveAddress = () => {
    const user_id = userCtx.userId;
    const updatedShippingAddress = {
      shipping_address: shippingAddress,
    };

    fetchData(
      `/users/useraddress/${user_id}`,
      "PATCH",
      updatedShippingAddress,
      userCtx.accessToken
    )
      .then((res) => {
        if (res.ok) {
          console.log("Shipping address updated successfully.");
        } else {
          console.error("Error updating shipping address: ", res.data);
        }
      })
      .catch((error) => {
        console.error("Error updating shipping address: ", error);
      });
  };

  const getClimbingExperience = async () => {
    const user_id = userCtx.userId; // Retrieve user ID from context
    const res = await fetchData(
      `/users/userexp/${user_id}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setClimbingExperience(res.data);
    } else {
      console.error("Error fetching climbing experience: ", res.data);
    }
  };

  // Handler to toggle climbing experience checkboxes
  const handleClimbingExperienceChange = (experienceName, experienceValue) => {
    let updatedExperience;

    if (experienceName === "years_exp") {
      const yearsExp = parseInt(experienceValue, 10);

      if (!isNaN(yearsExp)) {
        updatedExperience = {
          ...climbingExperience,
          [experienceName]: yearsExp,
        };
      } else {
        updatedExperience = {
          ...climbingExperience,
          [experienceName]: 0,
        };
      }
    } else {
      updatedExperience = {
        ...climbingExperience,
        [experienceName]: !climbingExperience[experienceName],
      };
    }

    setClimbingExperience(updatedExperience);

    const user_id = userCtx.userId;

    fetchData(
      `/users/userexp/${user_id}`,
      "PATCH",
      updatedExperience,
      userCtx.accessToken
    )
      .then((res) => {
        if (res.ok) {
          console.log("Climbing experience updated successfully.");
        } else {
          console.error("Error updating climbing experience: ", res.data);
        }
      })
      .catch((error) => {
        console.error("Error updating climbing experience: ", error);
      });
  };

  useEffect(() => {
    getUserProfile();
    getClimbingExperience();
    getShippingAddress();
  }, []);

  return (
    <Box>
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ textAlign: "left" }}
      >
        <Grid item xs={12} style={{ fontWeight: "bold" }}>
          Personal Details
        </Grid>
        <Grid item xs={3}>
          Email
        </Grid>
        <Grid item xs={5}>
          {userData.email}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}>
          Shipping Address
        </Grid>
        <Grid item xs={3}>
          <TextField
            aria-label="Shipping Address"
            multiline
            maxRows={3}
            placeholder="Enter an address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleSaveAddress}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12} style={{ fontWeight: "bold" }}>
          Climbing Experience
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            checked={climbingExperience.sport_climbing}
            onChange={() => handleClimbingExperienceChange("sport_climbing")}
          />
        </Grid>
        <Grid item xs={3}>
          Sport Climbing
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            checked={climbingExperience.bouldering}
            onChange={() => handleClimbingExperienceChange("bouldering")}
          />
        </Grid>
        <Grid item xs={3}>
          Bouldering
        </Grid>
        <Grid item xs={1}>
          <Checkbox
            checked={climbingExperience.trad_climbing}
            onChange={() => handleClimbingExperienceChange("trad_climbing")}
          />
        </Grid>
        <Grid item xs={3}>
          Trad Climbing
        </Grid>
        <Grid item xs={3}>
          Years of Experience:
        </Grid>
        <Grid item xs={3}>
          <TextField
            aria-label="Years of Experience"
            type="number"
            placeholder="Type a number…"
            value={climbingExperience.years_exp}
            onChange={(e) =>
              handleClimbingExperienceChange("years_exp", e.target.value)
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisplayProfile;
