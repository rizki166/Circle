import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../store";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";
import { getThreads } from "../../lib/api/call/thread";
import { IThread } from "../../types/app";
import { useEffect, useState } from "react";
import ThreadCard from "../../component/home/threadCard";
import { ImageList, ImageListItem } from '@mui/material';

const ProfilePages = () => {
  const profile = useAppSelector(state => state.auth.user);
  const [threads, setThreads] = useState<IThread[]>([]);
  const [value, setValue] = useState<string>("1");

  async function getThread() {
    try {
      const res = await getThreads();
      setThreads(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getThread();
  }, []);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const filteredThreads = threads.filter(thread => thread.author?.id === profile?.user.id);

  return (
    <Box width={'100%'}>
      <Box  >

        <h1 style={{ padding: 10, display: "flex", gap: 5, backgroundColor: "#2d2d2d", fontSize: 15, fontWeight: 700 }}>
          <Link to="/">
            <FaArrowLeftLong />
          </Link>
          {profile?.user.fullname}
        </h1>

        <Box display={'flex'} flexDirection={'column'}  >

          <img src={`http://localhost:5000/uploads/${profile?.cover}`} alt="cover" style={{ maxWidth: "100%", height: "160px", objectFit: "cover" }} />

          <Box display={'flex'} justifyContent={'space-between'} mt={2} p={1}>
            <Avatar
              src={`http://localhost:5000/uploads/${profile?.avatar}`}
              sx={{
                mt: -8,
                ml: 4,
                height: '80px',
                width: '80px',
                border: '4px solid grey',
              }} />
            <Button style={{
              height: 30,
              width: 100,
              border: '1px solid grey',
              borderRadius: 20,
              color: 'white',
              fontSize: 10,
            }} variant="outlined">
              Edit Profile
            </Button>
          </Box>
        </Box>
        <Box p={1}>

          <Typography >{profile?.user.fullname}</Typography>
          <Typography fontSize={12}>@{profile?.user.username}</Typography>

          <Typography fontFamily={'cursive'} fontSize={12}>{profile?.bio}</Typography>
          <Box display={'flex'} gap={1} mt={3}>
            <Typography fontSize={12}>{profile?.user._count?.following} followers</Typography>
            <Typography fontSize={12}>{profile?.user._count?.follower}following</Typography>
          </Box>
        </Box>
        <TabContext value={value}  >
          <Box sx={{
            borderBottom: "2px solid white",
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}>
            <TabList sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
              onChange={handleChange}
              aria-label="full width tabs example"
              textColor="inherit"
              indicatorColor="primary">
              <Tab label="All Post" value="1" sx={{ flex: 1 }} />
              <Tab label="Media" value="2" sx={{ flex: 1 }} />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }} >
            {filteredThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </TabPanel>
          <TabPanel value="2" >
            <TabPanel value="2">
              <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={200}>
                {filteredThreads.map((thread) => (
                  thread.image && thread.image.length > 0 && (
                    thread.image.map((image, index) => (
                      <ImageListItem key={index} cols={1}>
                        <img
                          src={`http://localhost:5000/uploads/${thread.image?.[0].image}`}
                          alt={`Thread Image `}
                          loading="lazy"
                          style={{
                            width: "100%"
                          }}
                        />
                      </ImageListItem>
                    ))
                  )
                ))}
              </ImageList>
            </TabPanel>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default ProfilePages;
