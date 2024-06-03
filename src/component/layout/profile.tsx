import { Avatar, Box, Button, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../store";
import UpdateModal from "../modal/modalUpdate";

const ProfileSidebar = () => {
  const profile = useAppSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      sx={{ width: '90%', mt: 1, }}
      bgcolor={"#2d2d2d"}
      borderRadius={"10px"}
      p={1}

    >
      <Box

      >
        <h1
          style={{
            padding: 20,
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          My Profile
        </h1>

        <img
          src={`http://localhost:5000/uploads/${profile?.cover}`}
          alt="cover"
          style={{
            width: "96%",
            marginLeft: "2.5%",
            height: "5.5rem",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
        <Box
          display={"flex"}
          justifyContent={"space-between"}

          mt={2}
        >
          <Avatar
            src={`http://localhost:5000/uploads/${profile?.avatar}`}
            sx={{
              mt: -6,
              ml: 3,
              height: "50px",
              width: "50px",
            }}
          />
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
              width: 100,
              border: "1px solid grey",
              borderRadius: 20,
              color: "white",
              fontSize: 10,
            }}
            variant="outlined"
            onClick={handleOpenModal}
          >
            Edit Profile
          </Button>
        </Box>
        <Box p={1} mt={-3}>
          <Typography >{profile?.user?.fullname}</Typography>
          <Typography fontSize={12} fontWeight={600}>
            @{profile?.user?.username}
          </Typography>

          <Typography fontFamily={"cursive"} fontSize={12}>
            {profile?.bio}
          </Typography>
          <Box display={"flex"} gap={1} mt={1}>
            <Typography fontSize={12}>
              {profile?.user._count?.following} Followers
            </Typography>
            <Typography fontSize={12}>
              {profile?.user._count?.follower}
              following
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal for Update */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "#2d2d2d", boxShadow: 24, p: 2, borderRadius: "5px" }}>
          <UpdateModal />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileSidebar;
