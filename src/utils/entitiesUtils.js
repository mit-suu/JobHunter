import { v4 as uuidv4 } from "uuid";

export const createDefaultUser = ({
  username,
  email,
  password,
  isAdmin = false,
}) => ({
  id: uuidv4(),
  username,
  email,
  password,
  isAdmin,
  avatar: "",
  bio: "",
  phone: "",
  location: "",
  experienceLevel: "",
  role: "",
  skills: [],
  socialMedia: [],
  availability: "",
  website: "",
  badges: [],
  tags: [],
  isPremium: false,
});
