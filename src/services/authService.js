import { getUsers, addUser } from "./userService";
export const handleGoogleLogin = async (googleUserData) => {
   try {
    const allUsers = await getUsers();
    let user = allUsers.find(u => u.email === googleUserData.email);

    if (!user) {
      console.log("Creating new user from Google:", googleUserData.email);
      const newUser = {
        id: googleUserData.sub,
        username: googleUserData.name,
        email: googleUserData.email,
        password: "",
        isAdmin: false,
        avatar: googleUserData.picture,
        role: "user",
        bio: "",
        phone: "",
        location: "",
        skills: [],
        socialMedia: [],
        isPremium: false,
      };
      user = await addUser(newUser);
    }
    
    return user;

  } catch (error) {
    console.error("Error processing Google Login:", error);
    return null;
  }
};