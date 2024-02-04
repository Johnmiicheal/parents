"use client";
import { FC, useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";
import SearchResultItem from "@/components/shared/searchResultItem";
import { IoIosSearch } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { gql, useQuery } from "@apollo/client";

interface PageProps {}

const GET_STUDENTS = gql(`
query GetStudent {
  getStudent {
    id
    createdAt
    transferedAt
    firstName
    middleName
    lastName
    gender
    ageInput
    folder
    isOwing
    isVisible
    isDuplicate
    startDate
    endDate
    birthDate
    isArchived
    profileImgUrl
    classroom {
      errors {
        field
        message
      }
      classroom {
        id
        isValid
        wasEdited
        createdAt
        updatedAt
        classId
        className
        description
        isDisabled
        students {
          id
          createdAt
          transferedAt
          firstName
          middleName
          lastName
          gender
          ageInput
          folder
          isOwing
          isVisible
          isDuplicate
          startDate
          endDate
          birthDate
          isArchived
          profileImgUrl
          grayId
          fatherName
          fatherEmail
          fatherNumber
          motherName
          motherEmail
          motherNumber
          homeAddress
          lgaOrigin
          state
        }
      }
    }
    school {
      school {
        id
        createdAt
        isDisabled
        isVerified
        schoolName
        rcnumber
        address
        type
        lgarea
        folder
        state
        country
        description
        phonenumber
        email
        websiteUrl
        instagramUrl
        facebookUrl
        twitterUrl
        linkedinUrl
        logoImgUrl
        bannerImgUrl
        license
      }
    }
    creator {
      admin {
        id
        isPaid
        userId
        folder
        status
        plan
        isReferred
        isDisabled
        agreedTo
        referralCode
        createdAt
        firstName
        middleName
        lastName
        phoneNumber
        email
        profileImgUrl
        role
        school
        schoolImg
        statusCode
      }
    }
    studentCase {
      grayCase {
        id
        createdAt
        updatedAt
        category
        owingAmount
        note
        isActive
        wasEdited
      }
    }
    grayId
    fatherName
    fatherEmail
    fatherNumber
    motherName
    motherEmail
    motherNumber
    homeAddress
    lgaOrigin
    state
  }
}`);

const Page: FC<PageProps> = ({}) => {
  const [searchInput, setSearchInput] = useState("");
  const [studentData, setStudentData] = useState([{
      name: "",
      age: 0,
      className: "",
      gender: "",
      profileImageUrl:
        "",
    }])
  const {data:search} = useQuery(GET_STUDENTS)
  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await search?.getStudent || [];
        const data = response.map((student: any) => ({
          name: student.firstName + " " + student.lastName,
          age: student.ageInput,
          className: student.classroom.classroom.className,
          gender: student.gender,
          profileImageUrl: student.profileImgUrl,
        }));
        setStudentData(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [search]);

  const filteredSearchData = studentData.filter((item) =>
    item?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"100vh"}
    >
      <Box
        px={"2rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={10}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundImage={"/images/linkchildbg.png"}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          w={{ base: "auto", lg: "670px" }}
          h={{ base: "auto", lg: "176px" }}
          p={{ base: "1rem", lg: "0rem" }}
          rounded={"xl"}
        >
          <Text
            textAlign={"center"}
            color={"#fff"}
            fontSize={{ base: "xl", lg: "3xl" }}
            fontWeight={"700"}
          >
            Link your child to your account
          </Text>
        </Box>
        <Box
          w={"full"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none" mt="0.9rem">
              <IoIosSearch color="#C2C2C2" size="28" />
            </InputLeftElement>
            <Input
              fontSize={"xl"}
              py={"2rem"}
              onChange={handleSearchChange}
              value={searchInput}
              type="text"
              placeholder="Search for your child"
              backgroundColor={"#F4F4F4"}
              _placeholder={{ color: "#C2C2C2" }}
            />
          </InputGroup>
          {searchInput && (
            <Box
              w={"full"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              mt={"1rem"}
            >
              {filteredSearchData?.map((item, index) => (
                <SearchResultItem student={item} key={index} />
              ))}
            </Box>
          )}

          <Button
            mt="6rem"
            w={"70%"}
            py={"2rem"}
            px={{base:'4rem', lg:"0rem"}}
            backgroundColor={"#007C7B"}
            color={"#fff"}
            colorScheme="teal"
            _hover={{ backgroundColor: "#044141" }}
            rounded={{base:"md", lg:"lg"}}
          >
            <Icon as={AiOutlinePlus} color={'#fff'} boxSize={{base:"5", lg:'8'}}/>
            <Text fontWeight={"light"} fontSize={{base:"md", lg:"2xl"}} pl="0.5rem">
              Send Link Request
            </Text>
          </Button>

          <Link color={"#B5B5B5"} fontSize={'xl'} mt={'2rem'}>Skip</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Page;