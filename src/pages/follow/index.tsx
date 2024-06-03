import { useEffect, useState } from "react";
import { IFollow } from "../../types/app";
import { useAppDispatch, useAppSelector } from "../../store";
import { getFollowersAsync, getFollowingAsync } from "../../store/async/follow";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { Box, Typography, Avatar } from "@mui/material";
import Tab from "@mui/material/Tab";
import ButtonFollow from "../../component/buttonFollow";

const Follow = () => {
  const [value, setValue] = useState<string>("1");
  const dispatch = useAppDispatch();
  const { followers, following } = useAppSelector((state) => state.follow);

  useEffect(() => {
    dispatch(getFollowersAsync());
    dispatch(getFollowingAsync());
  }, [dispatch]);

  const handleChange = (_event: React.ChangeEvent<any>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: "2px solid white",
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList
            sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
            onChange={handleChange}
            aria-label="full width tabs example"
            textColor="inherit"
            indicatorColor="primary"      >

            <Tab label="Following" value="1" sx={{ flex: 1 }} />
            <Tab label="Followers" value="2" sx={{ flex: 1 }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} width={"100%"} gap={1.5}>
              {following.map((follow: IFollow) => (
                <Box display={"flex"} justifyContent={"space-between"} gap={1} key={follow.following.id}>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <Avatar
                      src={`http://localhost:5000/uploads/${follow.following.profile?.avatar}`}
                      alt="Avatar"
                    />
                    <Box display={"flex"} flexDirection={"column"}>
                      <Typography fontFamily={"revert-layer"} fontSize={13}>
                        {follow.following.fullname}
                      </Typography>
                      <Typography fontSize={12} fontFamily={"revert-layer"}>
                        @{follow.following.username}
                      </Typography>
                      <Typography>{follow.following.profile?.bio}</Typography>
                    </Box>
                  </Box>
                  <Box flexGrow={1} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                    <ButtonFollow followingId={follow.following.id} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value="2">
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            {followers.map((follow: IFollow) => (
              <Box key={follow.follower.id} display={"flex"} gap={1}>
                <Avatar
                  src={`http://localhost:5000/uploads/${follow.follower.profile?.avatar}`}
                  alt="Avatar"
                />
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography
                    color={"white"}
                    fontFamily={"revert-layer"}
                    fontSize={14}
                  >
                    {follow.follower.fullname}
                  </Typography>
                  <Typography
                    color={"gray"}
                    fontSize={13}
                    fontFamily={"revert-layer"}
                  >
                    @{follow.follower.username}
                  </Typography>
                  <Typography
                    color={"white"}
                    fontFamily={"revert-layer"}
                    fontSize={13}
                  >
                    {follow.follower.profile?.bio}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Follow;
