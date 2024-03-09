"use client";
import { FC, useEffect } from "react";
import SidebarWithHeader from "@/components/navigation/secondaryNav";
import {
  Center,
  Box,
  Flex,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUserAPI } from "@/hooks/UserContext";
import { useQuery } from "@apollo/client";
import { GET_PARENT } from "@/gql/queries/queries";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: parents, loading } = useQuery(GET_PARENT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { parentData, childData, setLocalstorageId, currentId } = useUserAPI();
  const router = useRouter();

  useEffect(() => {
    const currentId = localStorage.getItem("currentId");

    if (currentId === null) {
      onOpen(); // Open the modal
    }
  }, [onOpen]);

  if (parentData?.children.length === 0) {
    window.location.replace("/dashboard");
  }

  const Overlay = () => <ModalOverlay bg="none" backdropFilter="blur(10px)" />;
  return (
    <SidebarWithHeader>
      {/* ... Your modal content ... */}
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={{base:"xs", md:"md"}}
      >
        <Overlay />
        <ModalContent>
          <ModalHeader>
            Hello{", "}
            {`${capitalizeFirstLetter(parentData?.firstName || "")} ${
              parentData?.lastName
            }`}
            🙃
          </ModalHeader>
          <ModalBody>
            <Text mb={"2rem"}>
              Kindly select a childs profile to view his/her data
            </Text>

            {childData?.map((ward: any, index: number) => {
              return (
                <Flex
                  alignItems={"center"}
                  gap={2}
                  bgColor={currentId === ward.id ? "#3F999830" : ""}
                  rounded={"md"}
                  py={"0.5rem"}
                  px={"1rem"}
                  mb={"0.4rem"}
                  border={"1px solid #1F8E74"}
                  _hover={{
                    backgroundColor: "#3F999830",
                    cursor: "pointer",
                  }}
                  key={index}
                  onClick={() => {
                    setLocalstorageId(ward?.id || 0);
                    router.refresh();
                    onClose();
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
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </SidebarWithHeader>
  );
};

export default Layout;
