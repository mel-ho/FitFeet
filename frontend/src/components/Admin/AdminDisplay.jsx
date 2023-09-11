import React from "react";
import UserManagement from "./UserManagement";
import UserBar from "../Login/UserBar";
import SizeManagement from "./SizeMangement";
import BrandManagement from "./BrandManagement";
import ModelManagement from "./ModelManagement";
import { Container, Stack } from "@mui/material";
import ShoeAdd from "./ShoeAdd";
import ShoeView from "./ShoeView";

const AdminDisplay = () => {
  return (
    <>
      <Stack direction="column" spacing={3}>
        <Container>
          <UserBar></UserBar>
        </Container>
        <Container>
          <h3>Admin Display Page</h3>
          <hr />
          <UserManagement></UserManagement>
          <hr />
          <SizeManagement></SizeManagement>
          <hr />
          <BrandManagement></BrandManagement>
          <hr />
          <ModelManagement></ModelManagement>
          <hr />
        </Container>

        <Container>
          <ShoeAdd></ShoeAdd>
          <hr />
          <ShoeView></ShoeView>
        </Container>
      </Stack>
    </>
  );
};

export default AdminDisplay;
