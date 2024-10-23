import { useState, useEffect } from "react";
import { Image } from "react-native";

export default function AvatarFetch(personId) {
  const [avatar, setAvatar] = useState(null);
  console.log("into AvatarFetch");

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(
          `https://api.multiavatar.com/${personId}.png?apikey=${process.env.MULTIAVATAR_API_KEY}`
        );
        const blob = await response.blob();
        setAvatar(URL.createObjectURL(blob));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAvatar();
  }, [personId]);

  <Image style={{ width: 50, height: 50 }} source={{ uri: avatar }} />;
}
