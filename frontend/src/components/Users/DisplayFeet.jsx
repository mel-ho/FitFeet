import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const DisplayFeet = () => {
  const userCtx = useContext(UserContext);
  const [feetData, setFeetData] = useState({});
  const [editable, setEditable] = useState(false);
  const [updatedFeetData, setUpdatedFeetData] = useState({});

  const fetchData = useFetch();

  const getFeetDimensions = async () => {
    const user_id = userCtx.userId; // Retrieve user ID from context
    const res = await fetchData(
      `/users/userfeet/${user_id}`,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setFeetData(res.data);
      setUpdatedFeetData(res.data); // Initialize updatedFeetData with current data
    } else {
      console.error("Error fetching feet dimensions: ", res.data);
    }
  };

  const handleAdd = () => {
    // Initialize `updatedFeetData` with default or empty values
    setUpdatedFeetData({
      foot_length_l: "",
      foot_length_r: "",
      foot_width_l: "",
      foot_width_r: "",
      toe_length_l: "",
      toe_length_r: "",
      small_perim_l: "",
      small_perim_r: "",
      big_perim_l: "",
      big_perim_r: "",
      heel_perim_l: "",
      heel_perim_r: "",
    });

    // Switch to edit mode
    setEditable(true);
  };

  const handleAddNewDetails = async () => {
    // Your PUT request logic to add new feet details
    const user_id = userCtx.userId;
    const res = await fetchData(
      `/users/userfeet/${user_id}`,
      "PUT",
      updatedFeetData,
      userCtx.accessToken
    );

    if (res.ok) {
      setEditable(false);
      // Refresh the feet dimensions data
      getFeetDimensions();
    } else {
      console.error("Error adding new feet dimensions: ", res.data);
    }
  };

  const isEmpty = Object.keys(feetData).length === 0;

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    const user_id = userCtx.userId;
    const res = await fetchData(
      `/users/userfeet/${user_id}`,
      "PATCH",
      updatedFeetData,
      userCtx.accessToken
    );

    if (res.ok) {
      setEditable(false);
      // Refresh the feet dimensions data
      getFeetDimensions();
    } else {
      console.error("Error updating feet dimensions: ", res.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFeetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getFeetDimensions();
  }, []); // Fetch feet dimensions when the component mounts

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Dimension</b>
              </TableCell>
              <TableCell>
                <b>Left Leg</b>
              </TableCell>
              <TableCell>
                <b>Right Leg</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Foot Length</TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="foot_length_l"
                    value={updatedFeetData.foot_length_l}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.foot_length_l
                )}
              </TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="foot_length_r"
                    value={updatedFeetData.foot_length_r}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.foot_length_r
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Foot Width</TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="foot_width_l"
                    value={updatedFeetData.foot_width_l}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.foot_width_l
                )}
              </TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="foot_width_r"
                    value={updatedFeetData.foot_width_r}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.foot_width_r
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Toe Length</TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="toe_length_l"
                    value={updatedFeetData.toe_length_l}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.toe_length_l
                )}
              </TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="toe_length_r"
                    value={updatedFeetData.toe_length_r}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.toe_length_r
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Small Perimeter</TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="small_perim_l"
                    value={updatedFeetData.small_perim_l}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.small_perim_l
                )}
              </TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="small_perim_r"
                    value={updatedFeetData.small_perim_r}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.small_perim_r
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Big Perimeter</TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="big_perim_l"
                    value={updatedFeetData.big_perim_l}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.big_perim_l
                )}
              </TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="big_perim_r"
                    value={updatedFeetData.big_perim_r}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.big_perim_r
                )}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Heel Perimeter</TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="heel_perim_l"
                    value={updatedFeetData.heel_perim_l}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.heel_perim_l
                )}
              </TableCell>
              <TableCell>
                {editable ? (
                  <TextField
                    name="heel_perim_r"
                    value={updatedFeetData.heel_perim_r}
                    onChange={handleChange}
                  />
                ) : (
                  feetData.heel_perim_r
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {isEmpty ? (
        !editable ? (
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddNewDetails}
          >
            Add New Details
          </Button>
        )
      ) : editable ? (
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </Box>
  );
};

export default DisplayFeet;
