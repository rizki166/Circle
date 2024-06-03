import API from "..";

export const getProfile = async (token: string) => {
  return await API.get("profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = async (body: {
  fullname?: string;
  username?: string;
  bio?: string;
  avatar?: File | null | string;
  cover?: File | null | string;
}) => {
  const formData = new FormData();

  if (body.fullname) {
    formData.append("fullname", body.fullname);
  }

  if (body.username) {
    formData.append("username", body.username);
  }

  if (body.bio !== null && body.bio !== undefined) {
    formData.append("bio", body.bio);
  }
  if (body.avatar) {
    formData.append("avatar", body.avatar);
  }
  if (body.cover) {
    formData.append("cover", body.cover);
  }

  return await API.patch("profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getProfileById = async (id: number) => {
  return await API.get(`profile/${id}`);
};
