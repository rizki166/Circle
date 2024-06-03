import { createAsyncThunk } from "@reduxjs/toolkit";
import { getThreads } from "../../lib/api/call/thread";

export const getThreadsAsync = createAsyncThunk(
    "thread/getThreadsAsync",
    async () => {
        try {
            const threadRes = await getThreads();
            return threadRes.data.data
        } catch (error) {
            console.log(error);
            throw error
        }
    }
);
