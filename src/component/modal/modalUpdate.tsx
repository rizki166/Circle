import { Box, Typography,Avatar, Input, Button } from "@mui/material"
import { useState } from "react";
import { useAppSelector } from "../../store";
import { updateProfile } from "../../lib/api/call/profile";
import { BiImageAdd } from "react-icons/bi";
const UpdateModal = () => {
    const profile = useAppSelector((state) => state.auth.user)
      

      const [dataPatchProfile, setDataPatchProfile] = useState<{
        fullname: string;
        username: string;
        bio: string;
        avatar: File | null | string;
        cover: File | null | string;
      }>({
        fullname: profile?.user.fullname || "",
        username: profile?.user.username || "",
        bio: profile?.bio || "",
        avatar: null,
        cover: null,
      })
      console.log(dataPatchProfile)

      const [imageCover, setImageCover] = useState<string | undefined>();
      const [imageAvatar, setImageAvatar] = useState<string | undefined>();

      const getAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImageAvatar(imageUrl);
        }
        setDataPatchProfile({
          ...dataPatchProfile,
          avatar: file || profile?.avatar || null
        });
      };

      const getCover = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImageCover(imageUrl);
        }
        setDataPatchProfile({
          ...dataPatchProfile,
          cover: file || profile?.cover || null
        });
      };
        
      const handleEditProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await updateProfile(dataPatchProfile);
          setDataPatchProfile(dataPatchProfile);
        } catch (error) {
          console.log(error);
        }
      }
    return (
      <form  onSubmit={handleEditProfile} encType="multipart/form-data">
        <Box width={'60vh'} height={"64vh"} >
            <Box >
                <Box>
                <Typography fontFamily={'Poppins'} 
                fontSize={'1rem'} 
                fontWeight={700} 
                color={'white'} 
                p={0}
                >Edit Profile</Typography>
                </Box>
                <Box>
                  <input 
                  
                  id="cover"
                  type="file"
                  name="cover"
                  onChange={getCover}/>
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

       <Box>
        <input 
                  style={{display: "none"}}
                  id="cover"
                  type="file"
                  name="cover"
                  onChange={getAvatar}
                  />
                  <BiImageAdd /> 
                  </Box>
        <Avatar
            src={`http://localhost:5000/uploads/${profile?.avatar}`}
            sx={{
              mt: -3,
              ml: 3,
              height: "55px",
              width: "55px",
              border: "3px solid #1d1d1d",
            }}
          />
            <Input  placeholder="username"
           name="username"
           onChange={(e) => setDataPatchProfile({...dataPatchProfile, username: e.target.value})}
             sx={{border: '1px solid white', 
             width: '99%', 
             mt: 2, 
             height: '40px', 
             color: 'white',
             borderRadius: '10px'}} 
            />
             <Input  placeholder="name"
             name="fullname"
             onChange={(e) => setDataPatchProfile({...dataPatchProfile, fullname: e.target.value})}
             sx={{border: '1px solid white', 
             width: '99%', 
             mt: 2, 
             height: '40px', 
             color: 'white',
             borderRadius: '10px'}} 
            /> 
            
            <Input  placeholder="Bio"
             name="bio"
             onChange={(e) => setDataPatchProfile({...dataPatchProfile, bio: e.target.value})}
             sx={{border: '1px solid white', 
             width: '99%', 
             mt: 2, 
             height: '70px', 
             color: 'white',
             borderRadius: '10px'}} 
            /> 
            <Box display={'flex'} justifyContent={'end'}>
            <Button onClick={handleEditProfile} sx={{backgroundColor:'lime', color: 'white', borderRadius: '20px', mt: 2, fontWeight: 700,width: '80px'}} >Save</Button>
            </Box>
                </Box>
            </Box>
        </Box>
      </form>
    )
}

export default UpdateModal