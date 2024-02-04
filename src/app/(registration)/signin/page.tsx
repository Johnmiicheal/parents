'use client'
import { FC, useState } from 'react'
import {
  Box,
  Image,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation';
import { gql, useMutation } from "@apollo/client";

interface pageProps {
  
}

const LOGIN_PARENT = gql(`
mutation LoginParent($password: String!, $email: String!) {
  loginParent(password: $password, email: $email) {
    errors {
      field
      message
    }
    parent {
      id
      userId
      status
      isPaid
      isVerified
      isReferred
      agreedTo
      createdAt
      firstName
      middleName
      lastName
      parentRole
      phoneNumber
      email
      relationToStudent
      role
      folder
      isDisabled
      profileImgUrl
    }
  }
}`);

const Page: FC<pageProps> = ({}) => {
    const router = useRouter()
    const toast = useToast()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login] = useMutation(LOGIN_PARENT);

    const handleEmailChange = (e:any) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: any) => {
      setPassword(e.target.value);
    };

    const handleLogin = async () => {
      const response = await login({
        variables: {
          password: password,
          email: email,
        },
      })
      console.log(response.data);
      
    }
  return (
    <Box
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={20}
        py={{base:"2rem", lg:"0"}}
      >
        <Image src="/images/greylightBordered.svg" alt="logo" />
        <Box
          rounded={'xl'}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          backgroundImage={"/images/loginbg.png"}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          w={{base:"auto", lg:"670px"}}
          h={{base:"auto", lg:"176px"}}
          p={{base:"3rem", lg:"0rem"}}
        >
          <Text fontWeight={"700"} fontSize={{base:"xl", lg:"4xl"}} color={"#fff"}>
            Login to your account
          </Text>
        </Box>
        <Box w={"full"} display={"flex"} flexDir={"column"} gap={10}>
          <FormControl>
            <FormLabel color={"#484848"} fontSize={"xl"}>
              Email Address
            </FormLabel>
            <Input
              fontSize={"xl"}
              py={"2rem"}
              rounded={"xl"}
              type="email"
              value={email}
              border={"1px solid #D5D5D5"}
              backgroundColor={"#F5F5F5"}
              onChange={handleEmailChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel color={"#484848"} fontSize={"xl"}>
              Password
            </FormLabel>
            <Input
              fontSize={"xl"}
              py={"2rem"}
              rounded={"xl"}
              type="password"
              value={password}
              border={"1px solid #D5D5D5"}
              backgroundColor={"#F5F5F5"}
              onChange={handlePasswordChange}
            />
          </FormControl>
        </Box>

        <Button
          onClick={handleLogin}
          backgroundColor={"#007C7B"}
          w={"full"}
          py={"2rem"}
          color={"#fff"}
          fontSize={"2xl"}
          _hover={{ backgroundColor: "#0F5151" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default Page