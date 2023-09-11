import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, Typography, TableCell } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ModelSelect = () => {
  const userCtx = useContext(UserContext);
  const [models, setModels] = useState([]);
  const fetchData = useFetch();

  const getModels = async () => {
    const res = await fetchData(
      "/shoes/model",
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      setModels(res.data);
    } else {
      console.error("Error fetching models:", res.data);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <Box>
      <Paper>
        <Typography variant="h6">Select Models</Typography>

        {models.map((model) => (
          <TableCell key={model.model} value={model.model}>
            {model.model}
          </TableCell>
        ))}
      </Paper>
    </Box>
  );
};

export default ModelSelect;
