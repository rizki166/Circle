import { Box, Typography } from "@mui/material"
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import Logo from "../../assets/Red.png"
const Footer = () => {
    return (
        <Box bgcolor={'#2d2d2d'}  p={1} width={'90%'} mt={0.5} borderRadius={'10px'}>
           <Box display={'flex'} gap={0.5}  >
            <Typography fontSize={12} fontWeight={600}>
                developed by Rizki Rahmatullah 
             </Typography>
             <BsDot size={20} />
            <FaGithub  />
                <FaLinkedinIn />
                <FaFacebook />
                <FaInstagram />
            </Box>
            <Box>
                <Typography fontSize={10}>Powered By <img src={Logo} width={17} /> Dumbways Indonesia  <BsDot /> #1Coding Indonesia</Typography>
            </Box>
        </Box>

    )
}

export default Footer