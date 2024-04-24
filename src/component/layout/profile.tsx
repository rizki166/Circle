import { Avatar, Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "../../store";

const ProfileSidebar = () => {
  const profile = useAppSelector(state => state.auth.user);



  return (
    <Box sx={{ mt: 2, mr: 5 ,border:"1px solid gray" }} bgcolor={'#2d2d2d'}>
      <Box sx={{
        backgroundColor: "#2d2d2d",
        height: "20rem",
        border: "1px solid gray"
      }}>
        <h1 style={{
          padding: 20,
          backgroundColor: "#2d2d2d",
          fontSize: 15, fontWeight: 700
        }}>My Profile</h1>

        <img src={`http://localhost:5000/uploads/${profile?.cover}`} alt="cover" style={{ width: "19.5rem", marginLeft: "2.5%",height:"5rem", objectFit: "cover" }} />
        <Box display={'flex'} justifyContent={'space-between'} bgcolor={'#2d2d2d'} mt={2}>
          <Avatar src={`http://localhost:5000/uploads/${profile?.avatar}`}
            sx={{ mt: -6, ml: 3, height: '50px', width: '50px' }} />
          <Button
            style={{
              
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
            }}
            variant="outlined"
          >
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
      </Box>
    </Box>
  );
}

export default ProfileSidebar;
