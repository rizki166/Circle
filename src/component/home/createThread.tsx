

import React, { useState } from "react";
import { Box, Button, TextField, Avatar } from "@mui/material";
import { createThread } from "../../lib/api/call/thread";
import { useAppDispatch, useAppSelector } from "../../store";
import { GoFileMedia } from "react-icons/go";
import { getThreadsAsync } from "../../store/async/thread";

interface IThreadPostProps {
    threadId?: number;
    onCreateThread: () => void;
}

const ThreadPost: React.FC<IThreadPostProps> = ({ threadId, onCreateThread }) => {
    const profile = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [threadPost, setThreadPost] = useState<{
        content: string;
        image: FileList | null;
        threadId?: number;
    }>({ content: "", image: null });

    const handlePostThread = async (e: React.MouseEvent) => {
        try {
            e.preventDefault();

            if (threadId) {
                threadPost.threadId = threadId;
            }

            console.log(threadPost, threadId);

            await createThread(threadPost);

            dispatch(getThreadsAsync());
            onCreateThread();

            setThreadPost({ content: "", image: null });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={{ borderBottom: "1px solid gray" }}>
            <Box
                my={5}
                
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "95%",
                    gap: 2,
                    mr: 1,
                    ml: 1,
                    mb: 1,
                }}
            >
                <Avatar src={`http://localhost:5000/uploads/${profile?.avatar}`}
                    sx={{ height: '50px', width: '50px' }} />
                <TextField
                    fullWidth
                    variant="standard"
                    autoComplete="off"
                    value={threadPost.content}
                    id="outlined-multiline-static"
                    placeholder="What's on your mind?"
                    onChange={(e) =>
                        setThreadPost({ ...threadPost, content: e.target.value })
                    }
                    InputProps={{
                        sx: { color: "white" },
                        style: { width: "100%" }
                    }}
                />

                <label htmlFor="contained-button-file">
                    <GoFileMedia /> {threadPost.image?.length}
                </label>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    max={4}
                    type="file"
                    hidden
                    onChange={(e) => {
                        setThreadPost({ ...threadPost, image: e.target.files });
                    }}
                />
                <Button
                    onClick={handlePostThread}
                    variant="contained"
                    sx={{ backgroundColor: "lime", borderRadius: "20px" ,height:"30px" }}
                >
                    Post
                </Button>
            </Box>
        </Box>
    );
};

export default ThreadPost;
