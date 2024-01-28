"use client";
import { FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  FormControl,
  FormLabel,
  Avatar,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch, IoMdSettings } from "react-icons/io";
import { PiChatsTeardrop, PiChatsTeardropFill } from "react-icons/pi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaLink } from "react-icons/fa6";
import {
  RiSearchFill,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineSetting,
} from "react-icons/ai";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { PiPlus } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { IconType } from "react-icons";
import { useUserAPI } from "@/hooks/user/UserContext";

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
    schoolName: string;
    profileImageUrl: string;
  }
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: "Dashboard",
    iconLight: GoHome,
    iconFill: GoHomeFill,
    url: "/dashboard/overview",
  },
  {
    name: "Inbox",
    iconLight: PiChatsTeardrop,
    iconFill: PiChatsTeardropFill,
    url: "/inbox",
  },
  {
    name: "Settings",
    iconLight: AiOutlineSetting,
    iconFill: IoMdSettings,
    url: "/settings",
  },
];

const DrawerNavLinkItems = {
  HomeSubLinks: [
    {
      name: "Dashboard",
      icon: HiOutlineArrowSmRight,
      url: "/dashboard/overview",
    },
    {
      name: "Results",
      icon: HiOutlineArrowSmRight,
      url: "/dashboard/results",
    },
    {
      name: "Greycases",
      icon: HiOutlineArrowSmRight,
      url: "/dashboard/greycases",
    },
  ],
  NavLinks: [
    {
      name: "Inbox",
      iconLight: PiChatsTeardrop,
      iconFill: PiChatsTeardropFill,
      url: "/inbox",
    },
    {
      name: "Search",
      iconLight: IoIosSearch,
      iconFill: RiSearchFill,
      url: "/search",
    },
    {
      name: "Settings",
      iconLight: AiOutlineSetting,
      iconFill: IoMdSettings,
      url: "/settings",
    },
  ],
};

const SearchResultItem = ({student}: SearchResultItemProps) => {
  return(
  <Box
    display={'flex'}
    alignItems={'center'}
    gap={3}
    w={'auto'}
    rounded={"md"}
    py={"0.5rem"}
    px={'1rem'}
    mb={"0.4rem"}
    _hover={{
      backgroundColor: "#3F999830",
      cursor: "pointer",
    }}
  >
    <Avatar size={"md"} src={student.profileImageUrl} pointerEvents={"none"} />
    <Box lineHeight={"20px"}>
      <Text fontWeight={"700"} fontSize={"lg"}>
        {`${student.name}`}
      </Text>
      <Text fontSize={"sm"} color={"#AAAAAA"} fontWeight={"600"}>
        {student.schoolName}
      </Text>
    </Box>
  </Box>
  )
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { profileData, setProfileData } = useUserAPI();
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
                icon={
                  pathName.includes(item.name.toLowerCase())
                    ? item.iconFill
                    : item.iconLight
                }
                link={item.url}
                backgroundColor={
                  pathName.includes(item.name.toLowerCase())
                    ? "#144646"
                    : "transparent"
                }
                name={item.name}
              />
            );
          })}
        </Grid>
        <Box justifyContent={"center"} display={"flex"} alignItems={"center"}>
          <Image
            src={profileData.userBio.profileImage}
            width={"2.7rem"}
            height={"2.7rem"}
            alt="profile"
            pointerEvents={"none"}
            rounded={"md"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, link, name, ...rest }: NavItemProps) => {
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
        href={`${link}`}
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
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };
  const studentData = [
    {
      name: "Chibuzor Ali-Williams",
      schoolName: "Greenfield High School",
      profileImageUrl:
        "https://th.bing.com/th/id/R.4c5a711143bfb1a8d5a5c8e4c806b86c?rik=5Syk2%2bsOsteflA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-KR2kHf628f0%2fUxDZbTxRBBI%2fAAAAAAAAAw8%2f0wLIlZKXZ0Q%2fs1600%2f(1%2bof%2b2)%2ba.jpg&ehk=bQbTKqYjeuycfjjYeGGOXi9mQxAZFG4F2z6AmjVgV%2bI%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "ALicia keys",
      schoolName: "Cadbury High School",
      profileImageUrl:
        "https://thumbs.dreamstime.com/b/image-child-profile-watched-tv-note-shallow-depth-field-189047061.jpg",
    },
    {
      name: "Priyanka Rishi",
      schoolName: "Mumbai general School",
      profileImageUrl:
        "https://images.statusfacebook.com/profile_pictures/beautiful-children-photos/beautiful-children-dp-profile-pictures-for-whatsapp-facebook-15.jpg",
    },
    {
      name: "Grace Williams",
      schoolName: "British elementary School",
      profileImageUrl:
        "https://dp.profilepics.in/profile_pictures/beautiful-children-photos/beautiful-children-dp-profile-pictures-for-whatsapp-facebook-167.jpg",
    },
    {
      name: "Emeka Steve",
      schoolName: "Greenfield High School",
      profileImageUrl:
        "https://th.bing.com/th/id/R.738aafb18f512a8b87b225a3279e9b9f?rik=qd5iSoMbrXsY8w&pid=ImgRaw&r=0&sres=1&sresct=1",
    },
    {
      name: "Emeka Chibuzor",
      schoolName: "Faith academy High School",
      profileImageUrl:
        "https://dp.profilepics.in/profile_pictures/beautiful-children-photos/beautiful-children-dp-profile-pictures-for-whatsapp-facebook-167.jpg",
    },
  ];
  const filteredSearchData = studentData.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

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
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Search" pl={10} borderColor={"gray.400"} />
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

      <Modal
        blockScrollOnMount={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent rounded={"xl"}>
          <ModalHeader>
            <Flex alignItems={"center"} gap={4}>
              <Icon as={FaLink} color={"#005D5D"} boxSize={6} />
              <Text fontWeight={"600"} fontSize={"lg"}>
                Link your child
              </Text>
            </Flex>
          </ModalHeader>
          <Divider />
          <ModalBody pb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IoIosSearch color="#C2C2C2" size="20" />
              </InputLeftElement>
              <Input
                onChange={handleSearchChange}
                value={searchInput}
                type="text"
                placeholder="Search for your child"
                backgroundColor={"#F4F4F4"}
                _placeholder={{ color: "#C2C2C2" }}
              />
            </InputGroup>
            {searchInput && (
              <Box display={'flex'} flexDir={'column'} justifyContent={'center'} mt={'1rem'}>
                {filteredSearchData.map((item, index) => (
                  <SearchResultItem student={item} key={index} />
                ))}
              </Box>
            )}
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button
              backgroundColor={"#005D5D"}
              mr={3}
              gap={2}
              px={"3rem"}
              _hover={{ backgroundColor: "#044141" }}
            >
              <Icon as={AiOutlinePlus} color={"#fff"} />
              <Text color={"#fff"} fontWeight={"300"} fontSize={"md"}>
                Send Request Link
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const MainNav: FC<MainNav> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { profileData, setProfileData } = useUserAPI();
  const pathName = usePathname();
  const [active, setActive] = useState("");
  const [isDropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    if (pathName.includes("/dashboard/overview")) {
      setActive("Dashboard");
    } else if (pathName.includes("/dashboard/results")) {
      setActive("Results");
    } else if (pathName.includes("/dashboard/greycases")) {
      setActive("Greycases");
    } else if (pathName.includes("/inbox")) {
      setActive("Inbox");
    } else if (pathName.includes("/search")) {
      setActive("Search");
    } else if (pathName.includes("/settings")) {
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
                    href={`${item.url}`}
                    transition={"ease-in-out 1s"}
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
                    href={`${item.url}`}
                  >
                    <Icon as={item.iconLight} color={"#fff"} boxSize={6} />
                    <Text color={"#fff"} fontSize={"lg"}>
                      {item.name}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            <Divider mt={"4rem"} mb={"1.5rem"} borderColor={"#2D6666"} />

            <Button backgroundColor={"#E4B972"} w={"full"} borderRadius={"3"}>
              <Icon as={PiPlus} color={"#fff"} boxSize={5} mx={"0.3rem"} />
              <Text color={"#fff"} mx={"0.3rem"} fontWeight={"400"}>
                Link your Child
              </Text>
            </Button>
          </DrawerBody>

          <DrawerFooter>
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