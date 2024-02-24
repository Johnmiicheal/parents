"use client";
import { FC, useEffect, useState } from "react";
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
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CloseButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { CiGrid42 } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { TbFile } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";
import { IconType } from "react-icons";
import { useUserAPI } from "@/hooks/UserContext";
import { UserChildren } from "@/hooks/UserContext";
import SearchStudentModal from "@/components/shared/searchStudentModal";

interface NavItemProps extends FlexProps {
  icon: IconType;
  link: string;
  children: React.ReactNode;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface SidebarWithHeader {
  children: React.ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Overview", icon: CiGrid42, url: "/dashboard/home/overview" },
  { name: "Academic Results", icon: TbFile, url: "/dashboard/home/results" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    profileData,
    currentId,
    setCurrentId,
    currentWardProfile,
  } = useUserAPI();
  const [wardProfile, setWardprofile] = useState(profileData.userChildren);
  const pathName = usePathname();
  return (
    <Box
      transition="3s ease"
      borderRight="1px solid #C2C2C2"
      w={{ base: "full", md: "16rem" }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Box
        py={5}
        display={"flex"}
        flexDirection={"column"}
        justifyItems={"center"}
        mx={"0.5rem"}
        gap={2}
      >
        <Box display={"flex"} w={"full"} mb={10} alignItems={"center"}>
          <Popover isLazy matchWidth={true}>
            <PopoverTrigger>
              <Box
                display={"flex"}
                alignItems={"center"}
                width={"full"}
                justifyContent={"space-between"}
                _hover={{ cursor: "pointer" }}
              >
                <Flex alignItems={"center"} gap={2}>
                  <Avatar
                    size={"md"}
                    src={currentWardProfile?.profileImage}
                    pointerEvents={"none"}
                  />
                  <Box lineHeight={"20px"}>
                    <Text fontWeight={"600"} fontSize={"sm"}>
                      {`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                    </Text>
                    <Text
                      fontSize={"12px"}
                      color={"#AAAAAA"}
                      fontWeight={"600"}
                    >
                      {currentWardProfile?.greynoteNumber}
                    </Text>
                  </Box>
                </Flex>
                <BsThreeDots color={"#005D5D"} />
              </Box>
            </PopoverTrigger>
            <PopoverContent rounded={"xl"} w={"auto"} shadow={"lg"}>
              <PopoverBody p={"0.4rem"}>
                {wardProfile.map((ward: UserChildren, index: number) => {
                  return (
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                      bgColor={
                        currentId === profileData.userChildren[index].id
                          ? "#3F999830"
                          : ""
                      }
                      rounded={"md"}
                      py={"0.5rem"}
                      mb={"0.4rem"}
                      _hover={{
                        backgroundColor: "#3F999830",
                        cursor: "pointer",
                      }}
                      key={index}
                      onClick={() => {
                        localStorage.setItem(
                          "currentId",
                          `${profileData.userChildren[index].id}`
                        );
                        setCurrentId(
                          parseInt(
                            localStorage.getItem("currentId") ??
                              `${profileData.userChildren[0]?.id}`,
                            10
                          )
                        );
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
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
          <SearchStudentModal isSearchOpen={isModalOpen} onSearchOpen={onModalOpen} onSearchClose={onModalClose} />
        </Box>
        {LinkItems.map((item, index) => {
          return (
            <NavItem
              key={index}
              icon={item.icon}
              link={item.url}
              bg={pathName === item.url ? "#005D5D" : ""}
            >
              {item.name}
            </NavItem>
          );
        })}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const router = useRouter()
  const pathName = usePathname();
  return (
    <Box
      as="a"
      onClick={() => router.push(link)}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        fontSize="md"
        color={pathName === link ? "#FFF" : "#979797"}
        py={"2"}
        px={"2"}
        rounded={"md"}
        role="group"
        cursor="pointer"
        _hover={{
          bg: pathName === link ? "" : "#005D5D29",
          color: pathName === link ? "#fff" : "#979797",
          transition: "0.5s",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            color={pathName === link ? "#FFF" : "#979797"}
            fontSize="20"
            _groupHover={{
              color: pathName === link ? "#fff" : "#979797",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const SidebarWithHeader: FC<SidebarWithHeader> = ({ children }) => {
  const [profileData] = useState({
    name: "",
    numberOfChildren: 1,
  });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("/results")) {
      setActive("results");
    } else {
      setActive("overview");
    }
  }, [pathName]);

  return (
    <>
        <Box minH="100vh" bg={"#fff"}>
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
            size="full"
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <Box ml={{ base: 0, md: 64 }} p="4" h={"100vh"} overflowY={"auto"}>
            {/* Content */}
            <Box>
              <Breadcrumb
                mb={"1rem"}
                spacing="4px"
                separator={<BiChevronRight color="gray.500" />}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    fontSize={"sm"}
                    fontWeight={"600"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <HiOutlineHome />
                    <Text ml={"5px"}>Home</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    href={"/"}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    color={"#005D5D"}
                  >
                    {active}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            {children}
          </Box>
        </Box>
    </>
  );
};

export default SidebarWithHeader;
