import API from "..";

export const follow = async ( followingId: number) => {
    return await API.post(`follow/${followingId}`,null  ,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }

    })
}

export const getFollowers = async () => {
    return await API.get("/follower", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
   )
}


export const getFollowing = async () => {
    return await API.get("following", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
   )
}