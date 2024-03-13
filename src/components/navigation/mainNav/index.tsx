"use client";
import { FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
  Button,
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  IconButton,
  Tooltip,
  DrawerFooter,
  DrawerBody,
  DrawerHeader,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { PiChatsTeardrop, PiChatsTeardropFill } from "react-icons/pi";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { IoClose, IoHelpCircleOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { useUserAPI } from "@/hooks/UserContext";
import SearchStudentModal from "@/components/shared/searchStudentModal";
import { LOGOUT_PARENTS } from "@/gql/mutations";
import { useMutation } from "@apollo/client";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  name: string;
}

interface LinkItemProps {
  name: string;
  iconLight: IconType;
  iconFill: IconType;
  url: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface MainNav {
  children: React.ReactNode;
}

interface SearchResultItemProps {
  student: {
    name: string;
    profileImageUrl: string;
    gender: string;
    className: string;
    age: number;
  }
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Dashboard",
    iconLight: GoHome,
    iconFill: GoHomeFill,
    url: "/dashboard",
  },
  {
    name: "Inbox",
    iconLight: PiChatsTeardrop,
    iconFill: PiChatsTeardropFill,
    url: "/dashboard/inbox",
  },
  {
    name: "Settings",
    iconLight: AiOutlineSetting,
    iconFill: IoMdSettings,
    url: "/dashboard/settings",
  },
];

const DrawerNavLinkItems = {
  HomeSubLinks: [
    {
      name: "Overview",
      icon: HiOutlineArrowSmRight,
      url: "/dashboard/home/overview",
    },
    {
      name: "Results",
      icon: HiOutlineArrowSmRight,
      url: "/dashboard/home/results",
    },
  ],
  NavLinks: [
    {
      name: "Inbox",
      iconLight: PiChatsTeardrop,
      iconFill: PiChatsTeardropFill,
      url: "dashboard/inbox",
    },
    {
      name: "Settings",
      iconLight: AiOutlineSetting,
      iconFill: IoMdSettings,
      url: "dashboard/settings",
    },
  ],
};


const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter()
  const { profileData } = useUserAPI();
  const pathName = usePathname();

  return (
    <Box
      bg={"#005D5D"}
      borderRight="1px"
      borderRightColor={"gray.300"}
      w={{ base: "full", md: "4.1rem" }}
      pos="fixed"
      h="100vh"
      py={5}
      display={{ base: "none" }}
      overflowY={"auto"}
      {...rest}
    >
      <Box
        h="100%"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
          <Image
            src={"/images/greylight.svg"}
            width={"2.5rem"}
            height={"2.5rem"}
            alt="logolight"
            pointerEvents={"none"}
          />
        </Box>
        <Grid justifyContent={"center"} gap={4}>
          {LinkItems.map((item, index) => {
            return (
              <NavItem
                key={index}
                icon={pathName === item.url ? item.iconFill : item.iconLight}
                link={item.url}
                backgroundColor={
                  pathName === item.url ? "#144646" : "transparent"
                }
                name={item.name}
              />
            );
          })}
        </Grid>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
          {profileData?.userBio?.profileImage ? (
            <>
              <Image
                src={profileData?.userBio?.profileImage}
                width={"2.7rem"}
                height={"2.7rem"}
                alt="profile"
                pointerEvents={"none"}
                rounded={"md"}
              />
            </>
          ) : (
            <>
              <Avatar
                name={`${profileData?.userBio?.firstName} ${profileData?.userBio?.lastName}`}
                size={'sm'}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, link, name, ...rest }: NavItemProps) => {
  const router = useRouter()
  return (
    <Tooltip
      hasArrow
      bg={"#144646"}
      rounded={"md"}
      py={"0.3rem"}
      transition={"0.5s"}
      px={"1rem"}
      label={name}
      placement="right"
    >
      <Box
        as="a"
        w={"auto"}
        h={"auto"}
        onClick={()=>router.push(link)}
        // href={`${link}`}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          fontSize="md"
          color={"#fff"}
          py={"3"}
          px={"3"}
          rounded={"md"}
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#144646",
            transitionDuration: "0.5s",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              color={"#fff"}
              fontSize="23"
              _groupHover={{
                color: "#fff",
                transform: "scale(1.1)",
                transition: "0.5s",
              }}
              as={icon}
            />
          )}
        </Flex>
      </Box>
    </Tooltip>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <Flex
      ml={{ base: 0, md: 16 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={"#fff"}
      borderBottom={"1px solid #C2C2C2"}
      justifyContent={"space-between"}
      {...rest}
    >
      <IconButton
        color={"#000"}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <InputGroup w={{ base: "60%", md: "30%" }}>
      </InputGroup>

      <Button
        backgroundColor={"#005D5D"}
        color={"#fff"}
        colorScheme="teal"
        _hover={{ backgroundColor: "#044141" }}
        display={{ base: "none", md: "flex" }}
        onClick={onModalOpen}
      >
        <AiOutlinePlus />
        <Text fontWeight={"light"} pl="0.5rem">
          Link your Child
        </Text>
      </Button>

      <SearchStudentModal isSearchOpen={isModalOpen} onSearchClose={onModalClose} onSearchOpen={onModalOpen} />
    </Flex>
  );
};

const MainNav: FC<MainNav> = ({ children }) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profileData, childData, currentId, setLocalstorageId } = useUserAPI();
  const pathName = usePathname();
  const [active, setActive] = useState("");
  const [isDropOpen, setDropOpen] = useState(false);
  const [logoutParent] = useMutation(LOGOUT_PARENTS);

  const handleLogout = async () => {
    const response = await logoutParent();
    if (response.data.logoutParent) {
      router.push("/signin");
      localStorage.removeItem("currentId");
    }
  };

  useEffect(() => {
    if (pathName.includes("/home/overview")) {
      setActive("Overview");
    } else if (pathName.includes("/home/results")) {
      setActive("Results");
    } else if (pathName.includes("/home/greycases")) {
      setActive("Greycases");
    } else if (pathName.includes("/dashboard/inbox")) {
      setActive("Inbox");
    } else if (pathName.includes("/dashboard/settings")) {
      setActive("Settings");
    } else {
      setActive("/");
    }
  }, [pathName]);

  return (
    <Box minH="100vh" bg={"#fff"} w={"full"} pos={"fixed"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent bgColor={"#005D5D"}>
          <DrawerHeader>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Image
                src={"/images/greylight.svg"}
                width={"2.5rem"}
                height={"2.5rem"}
                alt="logolight"
                pointerEvents={"none"}
              />
              <Icon
                as={IoClose}
                boxSize={6}
                color={"#8AACAC"}
                onClick={onClose}
              />
            </Flex>

            <Divider mt={"1.5rem"} borderColor={"#2D6666"} />
          </DrawerHeader>

          <DrawerBody>
            <Box
              as={"button"}
              textAlign={"start"}
              borderRadius={"8"}
              px={"1rem"}
              py={"0.7rem"}
              backgroundColor={isDropOpen ? "#114E4D" : ""}
              w={"full"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={() => {
                setDropOpen(!isDropOpen);
              }}
            >
              <Box display={"flex"} alignItems={"center"} my={"auto"} gap={4}>
                <Icon as={GoHomeFill} color={"#fff"} boxSize={6} />
                <Text color={"#fff"} fontWeight={"500"} fontSize={"lg"}>
                  Home
                </Text>
              </Box>
              <Icon
                as={isDropOpen ? RiArrowDownSLine : RiArrowRightSLine}
                color={"#fff"}
                boxSize={6}
              />
            </Box>
            <Box display={!isDropOpen ? "none" : "block"} mt={"0"}>
              {DrawerNavLinkItems.HomeSubLinks.map((item, index) => {
                return (
                  <Box
                    as="a"
                    key={index}
                    display={"flex"}
                    alignItems={"center"}
                    gap={4}
                    my={"1rem"}
                    color={"#9FC2C2"}
                    ml={"1.7rem"}
                    onClick={() => {
                      router.push(item.url);
                      onClose();
                    }}
                    transition={"ease-in-out 1s"}
                    _hover={{ cursor: "pointer" }}
                  >
                    <Icon
                      as={item.icon}
                      color={active == item.name ? "#fff" : "##9FC2C2"}
                      boxSize={6}
                    />
                    <Text color={active == item.name ? "#fff" : "##9FC2C2"}>
                      {item.name}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            <Box>
              {DrawerNavLinkItems.NavLinks.map((item, index) => {
                return (
                  <Box
                    as="a"
                    key={index}
                    display={"flex"}
                    alignItems={"center"}
                    gap={4}
                    my={"1rem"}
                    ml={"1rem"}
                    onClick={() => {
                      router.push(`/${item.url}`);
                      onClose();
                    }}
                    _hover={{cursor:"pointer"}}
                  >
                    <Icon as={item.iconLight} color={"#fff"} boxSize={6} />
                    <Text color={"#fff"} fontSize={"lg"}>
                      {item.name}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            <Divider mt={"1.5rem"} mb={"1.5rem"} borderColor={"#2D6666"} />

            <Box
              mt={"2rem"}
              p={"0.4rem"}
              backgroundColor={"#ffffff"}
              rounded={"lg"}
              overflowY={"auto"}
            >
              {childData?.map((ward: any, index: number) => {
                return (
                  <Flex
                    alignItems={"center"}
                    gap={2}
                    bgColor={currentId === ward.id ? "#3F999830" : ""}
                    rounded={"md"}
                    py={"0.5rem"}
                    px={"0.5rem"}
                    mb={"0.4rem"}
                    _hover={{
                      backgroundColor: "#3F999830",
                      cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => {
                      setLocalstorageId(ward?.id || 0);
                      router.refresh();
                    }}
                  >
                    <Avatar
                      size={"md"}
                      src={ward.profileImage}
                      pointerEvents={"none"}
                    />
                    <Box lineHeight={"20px"}>
                      <Text fontWeight={"600"} fontSize={"sm"}>
                        {`${ward.firstName} ${ward.lastName}`}
                      </Text>
                      <Text
                        fontSize={"12px"}
                        color={"#AAAAAA"}
                        fontWeight={"600"}
                      >
                        {ward.greynoteNumber}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
              <Flex justifyContent={"center"} mb={"1rem"} mt={"2rem"}>
                <Button
                  backgroundColor={"#005D5D"}
                  color={"#fff"}
                  colorScheme="teal"
                  w={"90%"}
                  _hover={{ backgroundColor: "#044141" }}
                  onClick={onModalOpen}
                >
                  <AiOutlinePlus />
                  <Text fontWeight={"light"} pl="0.5rem">
                    Link your Child
                  </Text>
                </Button>
              </Flex>
            </Box>
            <SearchStudentModal
              isSearchOpen={isModalOpen}
              onSearchOpen={onModalOpen}
              onSearchClose={onModalClose}
            />
          </DrawerBody>

          <DrawerFooter>
            <Popover>
              <PopoverTrigger>
                <Box
                  as={"a"}
                  w={"full"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  href="#"
                >
                  <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Image
                      src={profileData.userBio.profileImage}
                      width={"2.5rem"}
                      height={"2.5rem"}
                      alt="profile"
                      pointerEvents={"none"}
                      rounded={"md"}
                    />
                    <Grid lineHeight={"1rem"}>
                      <Text
                        color={"#fff"}
                        fontWeight={"600"}
                        fontSize={"sm"}
                      >{`${profileData.userBio.firstName} ${profileData.userBio.lastName}`}</Text>
                      <Text color={"#629B9B"} fontSize={"xs"}>
                        {profileData.userBio.email}
                      </Text>
                    </Grid>
                  </Box>
                  <Icon as={RiArrowRightSLine} color={"#fff"} boxSize={6} />
                </Box>
              </PopoverTrigger>
              <PopoverContent
                p={2}
                borderRadius="15px"
                justifyContent="center"
                alignItems="center"
                gap={2}
                maxW={"270px"}
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  border="1px solid #e3e3e3"
                  borderRadius={"10px"}
                  p={3}
                  w={'full'}
                >
                  <Avatar
                    src={profileData?.userBio?.profileImage}
                    name={`${profileData?.userBio?.firstName} ${profileData?.userBio?.lastName}`}
                  />
                  <Flex align="center" justify="center" mt={2} gap={1}>
                    <Text
                      textTransform={"capitalize"}
                      fontSize={{ base: "lg", lg: "2xl" }}
                      fontWeight={"bold"}
                    >{`${profileData?.userBio?.firstName} ${profileData?.userBio?.lastName}`}</Text>
                    <Image
                      src="/images/verifiedtag.png"
                      w={"1rem"}
                      h={"1rem"}
                      pointerEvents={"none"}
                      alt="verified tag"
                    />
                  </Flex>
                  <Text color="#A7A7A7" fontSize="12">
                    {profileData?.userBio?.email}
                  </Text>
                </Flex>
                <Button
                  leftIcon={<IoHelpCircleOutline />}
                  variant="ghost"
                  fontWeight={400}
                  w="full"
                  color="#747474"
                >
                  Contact Support
                </Button>
                <Button
                  mb={4}
                  bg="#FFC5C5"
                  color="#E03F3F"
                  _hover={{ bg: "#E03F3F", color: "white" }}
                  onClick={handleLogout}
                  fontWeight={400}
                  w="full"
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: "4.1rem" }}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default MainNav;
