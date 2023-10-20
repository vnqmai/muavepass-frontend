import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import Logo from "../static/images/Logo";
import { useNavigate } from "react-router-dom";
const StyledButton = styled(Button)`
  &:hover {
    background: none;
    opacity: 0.8
  }
`;
const Header = () => {
    const navigate = useNavigate();
  return (
    <Box
      component={"div"}
      sx={{ borderBottom: "solid" }}
      className="w-full h-16 p-4 flex flex-row gap-10 !border-gray-300 !border-b"
    >
      <StyledButton
        disableRipple
        variant="raised"
        style={{ backgroundColor: "transparent" }}
        className="!hover:bg-white"
        onClick={() => window.location.href = "https://payos.vn/"}
      >
        <Logo height={38} width={100} fill={"#6655FF"} />
      </StyledButton>
      <StyledButton
        disableRipple
        variant="raised"
        style={{ backgroundColor: "transparent" }}
        className="!hover:bg-white"
        onClick={() => navigate("/")}
      >
        <Typography className="!text-xl !text-gray-500 pt-2 !normal-case">Demo</Typography>
      </StyledButton>
    </Box>
  );
};

export default Header;
