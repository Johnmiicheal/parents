import { FC, useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Avatar,
  Flex,
  Icon,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoCopy } from "react-icons/io5";
import SchoolDetailsModal from "./SchoolDetailsModal";
import { LIKE_PROFILE, UNLIKE_PROFILE } from "@/gql/mutations";
import { useUserAPI } from "@/hooks/UserContext";
import { useMutation } from "@apollo/client";
import { useUserLikesAPI } from "@/hooks/UserLikesContext";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

interface PostItemProps {
  profile: {
    genderType: string;
    schoolType: string;
    type: string;
    bannerImgUrl: string;
    country: string;
    createdAt: string;
    description: string;
    email: string;
    facebookUrl: string;
    id: number;
    instagramUrl: string;
    lgarea: string;
    linkedinUrl: string;
    logoImgUrl: string;
    phonenumber: string;
    profileLikes: number;
    profileViews: number;
    rcnumber: string;
    schoolName: string;
    state: string;
    twitterUrl: string;
    websiteUrl: string;
    whoLikedProfile: string[];
    schoolMedia: string[];
  };
  currentIndex: number;
}

const PostItem: FC<PostItemProps> = ({ profile, currentIndex }) => {
  const {
    likePost,
    unlikePost,
    isPostLiked,
    setLikedPosts,
    setActiveProfileIndex,
  } = useUserLikesAPI();
  const { parentData } = useUserAPI();
  const [profileLikes, setProfileLikes] = useState(profile?.profileLikes);
  const imageLinks: string[] = [];

  profile?.schoolMedia?.forEach((link) => {
    if (
      link.endsWith(".jpg") ||
      link.endsWith(".jpeg") ||
      link.endsWith(".png")
    ) {
      imageLinks.push(link);
    }
  });

  const handleToggleLike = () => {
    if (isPostLiked(profile?.id)) {
      setProfileLikes((prevLikes) => Math.max(prevLikes - 1, 0));
      unlikePost(profile?.id);
    } else {
      setProfileLikes((prevLikes) => prevLikes + 1);
      likePost(profile?.id);
    }
  };

  useEffect(() => {
    const userId = parentData?.userId;
    if (profile?.whoLikedProfile?.includes(userId || "")) {
      setLikedPosts((prevState) => ({
        ...prevState,
        [profile.id]: true,
      }));
    }
  }, [profile, parentData, setLikedPosts]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <Box
        border={"1px solid #00000060"}
        rounded={"xl"}
        p={"0.4rem"}
        maxW={{ base: "300px", md: "400px" }}
        _hover={{ cursor: "pointer" }}
      >
        <SchoolDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          setProfileLikes={setProfileLikes}
        />
        <Box position={"relative"}>
          <Image
            rounded={"md"}
            alt="postItem"
            src={imageLinks[0]}
            h={{ base: "250px", xl: "350px" }}
            objectFit={"cover"}
            w={"full"}
            onClick={() => {
              onOpen();
              setActiveProfileIndex(currentIndex);
            }}
          />
          <Icon
            as={IoCopy}
            position="absolute"
            top="8px"
            right="8px"
            boxSize={6}
            color={"white"}
          />
        </Box>

        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex gap={2} my={"1rem"}>
            <Avatar
              size={{ base: "sm", md: "md" }}
              src={profile?.logoImgUrl}
              name={profile?.schoolName}
            />
            <Flex flexDir={"column"} justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={{ base: "xs", md: "md" }}>
                {capitalizeFirstLetter(profile?.schoolName.toLowerCase())}
              </Text>
              <Text fontSize={{ base: "xs", md: "md" }}>
                {profile?.state}, Nigeria
              </Text>
            </Flex>
          </Flex>

          <Flex alignItems={"center"} flexDir={"column"}>
            <Icon
              as={isPostLiked(profile?.id) ? IoMdHeart : IoMdHeartEmpty}
              onClick={handleToggleLike}
              color={isPostLiked(profile?.id) ? "red.500" : "#00000070"}
              boxSize={7}
              transition="transform 0.2s ease-in-out"
              _hover={{
                cursor: "pointer",
                transform: "scale(1.1)",
                transition: "0.2s",
              }}
            />

            <Text fontSize={"xs"} color={"#00000070"}>
              {profileLikes} {profileLikes !== 1 ? "Likes" : "Like"}
            </Text>
          </Flex>
        </Flex>
      </Box>
  );
};

export default PostItem;
