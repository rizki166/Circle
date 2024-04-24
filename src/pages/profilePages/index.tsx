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
    <Box sx={{ mt: 2, mr: 5, border: "1px solid gray", width: "98%", ml: 0.7, height: "50%", borderRadius: "5px" }} bgcolor={'#2d2d2d'}>
      <Box sx={{ backgroundColor: "#2d2d2d" }}>
        <h1 style={{ padding: 10, display: "flex", gap: 5, backgroundColor: "#2d2d2d", fontSize: 15, fontWeight: 700 }}>
          <Link to="/">
            <FaArrowLeftLong />
          </Link>
          {profile?.user.fullname}
        </h1>

        <img src={`http://localhost:5000/uploads/${profile?.cover}`} alt="cover" style={{ width: "95%", marginLeft: "2.5%", height: "7rem", borderRadius: "10px", objectFit: "cover" }} />
        <Box display={'flex'} justifyContent={'space-between'} bgcolor={'#2d2d2d'} mt={2}>

          <Avatar src={`http://localhost:5000/uploads/${profile?.avatar}`} sx={{ mt: -5, ml: 4, height: '50px', width: '50px' }} />
          <Button style={{
            display: 'flex',
            backgroundColor: '#2d2d2d',
            justifyContent: 'center',
            alignItems: 'center',
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
        <Box bgcolor={'#2d2d2d'} p={1}>

          <Typography bgcolor={'#2d2d2d'}>{profile?.user.fullname}</Typography>
          <Typography bgcolor={'#2d2d2d'} fontSize={12}>@{profile?.user.username}</Typography>

          <Typography bgcolor={'#2d2d2d'} fontFamily={'cursive'} fontSize={12}>{profile?.bio}</Typography>
          <Box display={'flex'} gap={1} bgcolor={'#2d2d2d'} mt={3}>
            <Typography bgcolor={'#2d2d2d'} fontSize={12}>10.000 following</Typography>
            <Typography bgcolor={'#2d2d2d'} fontSize={12}>10.000 followers</Typography>
          </Box>
        </Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All Post" value="1" />
              <Tab label="Media" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {filteredThreads.map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </TabPanel>
          <TabPanel value="2">
          <TabPanel value="2">
          <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={200}>
    {filteredThreads.map((thread) => (
      thread.image && thread.image.length > 0 && (
        thread.image.map((imageUrl, index) => (
          <ImageListItem key={index} cols={1}>
            <img
              src={`http://localhost:5000/uploads/${thread.image[0].image}`}
              alt={`Thread Image `}
              loading="lazy"
              style={{
                width:"100%"
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
