import { Box, Typography, Button, Modal } from "@mui/material";
import { RiHome7Fill } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { SET_LOGOUT } from "../../store/slice/auth";
import { useAppDispatch } from "../../store";
import { Link } from "react-router-dom";
import ModalCreatePost from "../modal/modalCreatePost";
import { useState } from "react";
const Sidebar = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            dispatch(SET_LOGOUT());
            window.location.href = "/login";
        }
    };

    return (
        <Box padding={4} display={'flex'} flexDirection={'column'} gap={2}>
            <Typography fontSize={30} fontWeight={600} color={'lime'}>
                Circle
            </Typography>
            <Typography
                fontSize={16}
                fontWeight={600}
                display={'flex'}
                gap={1}
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                        transition: '0.5s',
                        color: 'lime'
                    }
                }}
            >
                <RiHome7Fill size={20} />
                <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            </Typography>
            <Typography
                fontSize={16}
                fontWeight={600}
                display={'flex'}
                gap={1}
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                        transition: '0.5s',
                        color: 'lime'
                    }
                }}
            >
                <TbUserSearch size={20} />
                <Link to='/search' style={{ color: 'inherit', textDecoration: 'none' }}>Search</Link>
            </Typography>
            <Typography
                fontSize={16}
                fontWeight={600}
                display={'flex'}
                gap={1}
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                        transition: '0.5s',
                        color: 'lime'
                    }
                }}
            >
                <CiHeart size={20} />
                <Link to='/follow' style={{ color: 'inherit', textDecoration: 'none' }}>Follow</Link>
            </Typography>
            <Typography
                fontSize={16}
                fontWeight={600}
                display={'flex'}
                gap={1}
                sx={{
                    textDecoration: 'none',
                    color: 'white',
                    '&:hover': {
                        transition: '0.5s',
                        color: 'lime'
                    }
                }}
            >
                <CgProfile size={20} />
                <Link to='/profile' style={{ color: 'inherit', textDecoration: 'none' }}>Profile</Link>
            </Typography>

            <Button
                style={{
                    width: '100%',
                    background: "lime",
                    border: 'none',
                    borderRadius: 20,
                    height: 40,
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 800,

                }}
                onClick={handleOpenModal}
            >
                Created Post
            </Button>

            <Button onClick={handleLogout}
                style={{
                    display: 'flex',
                    fontSize: 15,
                    fontWeight: 600,
                    alignItems: 'center',
                    gap: 3,
                    position: 'absolute',
                    bottom: 40,
                    left: 30,
                    border: 'none',
                    color: 'white'
                }}>
                <RiLogoutBoxLine size={16} />Logout
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "#2d2d2d", boxShadow: 24, p: 2, borderRadius: "5px" }}>
                    <ModalCreatePost />
                </Box>
            </Modal>
        </Box>
    );
};

export default Sidebar;
