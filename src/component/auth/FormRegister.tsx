import { Box, Input, Typography } from '@mui/material'
import React from 'react';
import { Link } from "react-router-dom";
import { IRegister } from '../../types/app';
import { useNavigate } from 'react-router-dom';
import API from '../../lib/api'



const ModalRegister = () => {
const navigate = useNavigate();

    const [formRegister, setFormRegister] =  React.useState<IRegister>({
        fullname: '',
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (): Promise<void> => {
        try {
            await API.post('register', formRegister)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Box display={'flex'}
            justifyContent={'center'}
            mt={18}
            
        >
            <Box display={'flex'}
                width={'26%'} flexDirection={'column'}
                margin={2}>
                <Typography sx={{ color: 'lime', fontSize: 30, fontWeight: 600 }}
                >CIRCLE
                </Typography>

                <Typography sx={{ color: 'white', fontSize: 25, fontWeight: 600 }}
                >Create Account Circle</Typography>

                <Input
                    type="text"
                    name="username"
                    placeholder="Username*"
                    onChange={handleChange}
                    sx={{ color: 'white', height: 39, backgroundColor: '#1d1d1d', border: '1px solid grey', borderRadius: '5px' }}
                />


                <Input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="email*"
                    sx={{ marginTop: 2, 
                        color: 'white', 
                        height: 39, 
                        backgroundColor: '#1d1d1d', 
                        border: '1px solid grey', 
                        borderRadius: '5px' }}
                />


                <Input
                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    placeholder="fullname*"
                    
                    sx={{marginTop: 2, 
                        color: 'white', 
                        height: 39, 
                        backgroundColor: '#1d1d1d', 
                        border: '1px solid grey', 
                        borderRadius: '5px' }}
                />


                <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password*"
                    sx={{ mt: 2, 
                        color: 'white', 
                        height: 39, 
                        backgroundColor: '#1d1d1d', 
                        border: '1px solid grey', 
                        borderRadius: '5px' }}

                />

                <Typography color={'white'}
                    fontWeight={'bold'}
                    fontSize={11}
                    justifyContent={'end'}
                    display={'flex'}
                    fontStyle={'italic'}
                >ForgotPassword?</Typography>

                <button
                    style={{
                        backgroundColor: 'lime',
                        color: 'white',
                        marginTop: 5,
                        height: 40,
                        borderRadius: '30px',
                        border: 'none',
                        fontSize: 20,
                        fontWeight: 600
                    }}
                    onClick={handleSubmit}

                >Login</button>
                <Typography color={'white'}
                    mt={1}
                >
                    <Link to='/login'
                        style={{ color: "lime" }}
                    >Already have account</Link>
                </Typography>
            </Box>
        </Box>

    )
}

export default ModalRegister;