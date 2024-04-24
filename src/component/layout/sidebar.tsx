import { Box, Typography,Button } from "@mui/material";
import { RiHome7Fill } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { SET_LOGOUT } from "../../store/slice/auth";
import { useAppDispatch } from "../../store";
import { Link } from "react-router-dom";


const Sidebar = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            dispatch(SET_LOGOUT());
            window.location.href = "/login";
        }
    };

    return (
        <Box padding={4} display={'flex'} flexDirection={'column'} gap={2}>
            <Typography fontSize={30} fontWeight={600} color={'lime'} >
                Circle
            </Typography>
            <Typography fontSize={16} fontWeight={600} display={'flex'} gap={1}>
                <RiHome7Fill size={20} /><Link to='/'>Home </Link> 
            </Typography>
            <Typography fontSize={16} fontWeight={600} display={'flex'} gap={1}>
                <TbUserSearch size={20} /> <Link to='/search'>Search </Link> 
            </Typography>
            <Typography fontSize={16} fontWeight={600} display={'flex'} gap={1}>
                <CiHeart size={20} />Follows
            </Typography>
            <Typography fontSize={16} fontWeight={600} display={'flex'} gap={1}>
                <CgProfile size={20} /> <Link to='/profile'>Profile </Link> 
            </Typography>
           
            <Button 
            
                style={{
                    width: '100%', 
                    background: "lime", 
                    border: 'none', 
                    borderRadius: 20, 
                    height: 40,  
                    color: 'white',
                    fontSize: 10, 
                    fontWeight: 600
                }}
            >
                Created Post
            </Button>

         
            <Button onClick={handleLogout} 
               style={{  
              display: 'flex',
              fontSize: 15,
              fontWeight: 600,
              alignItems: 'center',
              gap: 3 , 
              position: 'absolute',
              bottom: 40, 
              left: 30, 
              border: 'none', 
              color: 'white'}}>
            <RiLogoutBoxLine size={16}/>Logout
        </Button>
        
        </Box>
    );
};

export default Sidebar;
