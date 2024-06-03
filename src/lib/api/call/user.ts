import API from ".."

interface ILogin {
    username: string
    password: string
}

export const loginApi = async(body: ILogin) => {
    return await API.post("login", body)
}

export const registerApi = async(body: ILogin) => {
    return await API.post("register", body)
}

export const getUsers = async ( token: string) => {
    return await API.get("users" ,{
        headers: {
            Authorization: `Bearer${token}`
        }
    })
}
export const suggestUsers = async (count: number, token: string) => {
    return await API.get(`suggest/${count}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};