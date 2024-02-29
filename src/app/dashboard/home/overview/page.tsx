'use client'
import { FC } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  Avatar,
} from "@chakra-ui/react";
import Attendance from "@/components/attendance";
import Invoice from "@/components/invoice";
import { useUserAPI } from "@/hooks/UserContext";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
    const { currentWardProfile, parentData } = useUserAPI();
    // if(parentData?.children.length === 0){
    //   window.location.replace('/dashboard')
    // }

  return (
    <Flex gap={5} flexDir={"column"} mb={{ base: "8rem", lg: "5rem" }}>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        gap={5}
        columnGap={5}
      >
        <Box
          width={"full"}
          rounded={"xl"}
          border={"1px solid #449c7c"}
          overflow={"hidden"}
          backgroundColor={"#F4FFFB"}
          p={"1rem"}
          bgSize={"cover"}
          my={{ base: "10px", md: "0" }}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"} gap={3}>
              <Avatar
                size={"lg"}
                src={currentWardProfile?.profileImage}
                pointerEvents={"none"}
              />
              <Box lineHeight={"30px"}>
                <Text fontWeight={"600"} fontSize={"2xl"}>
                  {`${currentWardProfile?.firstName} ${currentWardProfile?.lastName}`}
                </Text>
              </Box>
            </Box>
            <Image
              src={currentWardProfile?.schoollogo}
              alt="profileImg"
              w={"4.5rem"}
              h={"4.5rem"}
              pointerEvents={"none"}
            />
          </Box>
          <Box>
            <Box
              textAlign={"start"}
              display={"flex"}
              gap={{ base: 2, md: 10 }}
              my={"1rem"}
            >
              <Grid gap={1}>
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Gender
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.gender}
                </Text>
              </Grid>
              <Grid gap={1}>
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Class
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.class}
                </Text>
              </Grid>
              <Grid gap={1}>
                <Text color={"#449c7c"} fontSize={"0.8rem"} fontWeight={"600"}>
                  Date of Birth
                </Text>
                <Text
                  fontWeight={"600"}
                  fontSize={{ base: "xs", md: "lg" }}
                  color={"#606162"}
                >
                  {currentWardProfile?.dateOfBirth}
                </Text>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Flex>

      <Flex
        flexDir={{ base: "column", xl: "row" }}
        justifyContent={"space-between"}
        gap={5}
        columnGap={5}
      >
        <Attendance />

        <Invoice />
      </Flex>
    </Flex>
  );
};

export default DashboardPage;
