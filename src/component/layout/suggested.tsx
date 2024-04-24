import { Avatar, Box, Typography } from "@mui/material";

const Suggested = () => {
  return (
    <Box
      mt={5}
      border={"1px solid gray"}
      height={"12rem"}
      width={"90%"}
      padding={"10px"}
      bgcolor={"#2d2d2d"}
    >
      <Typography fontSize={17} fontWeight={600} bgcolor={"#2d2d2d"}>
        {" "}
        Suggested For You
      </Typography>
      <Box bgcolor={"#2d2d2d"} display={"flex"} gap={1} mt={1}>
        <Avatar
          src="defaul"
          alt="defaul"
          sx={{ height: "32px", width: "32px" }}
          />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography bgcolor={"#2d2d2d"} fontSize={12}>Ini fullname</Typography>
          <Typography bgcolor={"#2d2d2d"} fontSize={12}> @Ini username</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"end"} marginLeft={16} bgcolor={"#2d2d2d"}>
          <button
            style={{
              width: 60,
              color: "white",
              height: 25,
              border: "1px solid grey",
              borderRadius: 20,
              backgroundColor:"#2d2d2d"
            }}
          >
            Follow
          </button>
        </Box>
      </Box>
    </Box>
  );
};
export default Suggested;
