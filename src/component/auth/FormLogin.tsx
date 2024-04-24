import { Box, TextField, Typography } from '@mui/material'
import { Link } from "react-router-dom";
import { loginApi } from "../../lib/api/call/user";
import { getProfile } from "../../lib/api/call/profile";
import { useAppDispatch } from "../../store";
import { SET_LOGIN } from "../../store/slice/auth";
import React, { useState } from 'react';

const ModalLogin: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formInput, setFormInput] = useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginApi(formInput);
            const token = res.data.token;
            const resProfile = await getProfile(token);
            localStorage.setItem("token", token);
            dispatch(SET_LOGIN({ user: resProfile.data.data, token }));
          
            window.location.href = "/"; 
        } catch (error) {
            window.alert("Invalid username or password");
        }
    };

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            mt={18}
        >
            <form onSubmit={handleLogin}>
                <Box
                    display={'flex'}
                    width={'100%'}
                    flexDirection={'column'}
                    margin={2}
                >
                    <Typography sx={{ color: 'lime', fontSize: 30, fontWeight: 600 }}>
                        CIRCLE
                    </Typography>
                    <Typography sx={{ color: 'white', fontSize: 25, fontWeight: 600 }}>
                        Login Your Account
                    </Typography>
                    <TextField
                        label="Email or Username"
                        type='text'
                        sx={{
                            color: 'white',
                            height: 55,
                            backgroundColor: 'white', border: '1px solid grey',
                            borderRadius: '5px'
                        }}
                        value={formInput.username}
                        onChange={(e) =>
                            setFormInput({ ...formInput, username: e.target.value })
                        }
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={formInput.password}
                        onChange={(e) =>
                            setFormInput({ ...formInput, password: e.target.value })
                        }
                       sx={{
                            color: 'white',
                            height: 55,
                            backgroundColor: 'white', border: '1px solid grey',
                            borderRadius: '5px',
                            mt: 2,
                            
                            
                        }}

                    />
                    <Typography
                        color={'white'}
                        fontWeight={'bold'}
                        fontSize={11}
                        justifyContent={'end'}
                        display={'flex'}
                        fontStyle={'italic'}
                    >
                        ForgotPassword?
                    </Typography>
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
                    >
                        Login
                    </button>
                    <Typography color={'white'} mt={1}>
                        Don't have an account yet?
                        <Link to='/register' style={{ color: "lime" }}>
                            Create account
                        </Link>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};

export default ModalLogin;
