import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Table,
  TableBody,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ModelView = () => {
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
      <Table>
        <TableBody>
          {models.map((model) => (
            <TableRow key={model.model}>
              <TableCell style={{ width: "20%" }}>
                <img src={model.img_link} alt={model.model} width="100" />
              </TableCell>
              <TableCell style={{ width: "80%" }}>{model.model}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ModelView;
