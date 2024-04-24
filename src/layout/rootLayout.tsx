import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../component/layout/sidebar";
import ProfileSidebar from "../component/layout/profile";
import Suggested from "../component/layout/suggested";
import { useAppDispatch } from "../store";
import { SET_LOGIN } from "../store/slice/auth";
import { getProfile } from "../lib/api/call/profile";

const Main = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await getProfile(token);
        dispatch(SET_LOGIN({ user: res.data.data, token }));
        setIsLoggedIn(true); // Set isLoggedIn menjadi true jika token ditemukan
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      gap={5}
      bgcolor={"#1d1d1d"}
      height={"100vh"}
      color={"white"}
    >
      <Box flex={1}><Sidebar /></Box>
      <Box flex={2.5} sx={{"&::-webkit-scrollbar":{display:"none"}}}  overflow="scroll" border={"1px solid gray"}>
        {children}
      </Box>
      <Box flex={1.5}>
        {isLoggedIn && <ProfileSidebar />} 
        <Suggested />
      </Box>
    </Box>
  );
};

export default Main;
