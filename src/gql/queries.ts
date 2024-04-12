import { gql } from "@apollo/client";
export const GET_PARENT = gql(`
query Parent {
  parent {
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
      role
      folder
      isDisabled
      profileImgUrl
      children {
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
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
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
              linkedAt
              linkCount
              isLinked
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
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
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
            accountName
            accountNumber
            bankName
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
            accountOfficer {
              id
              userId
              isDisabled
              isSuper
              isDirector
              createdAt
              fullName
              username
              phoneNumber
              role
              status
              department
              email
              profileImgUrl
              greyAdmin {
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
    }
  }
}
`);

export const ACCEPT_INVOICE = gql(`
mutation AcceptInvoice($document: String!, $fileType: String!, $amountPaid: Float!, $invoiceid: Float!, $summary: String) {
  acceptInvoice(document: $document, fileType: $fileType, amountPaid: $amountPaid, invoiceid: $invoiceid, summary: $summary) {
    errors {
      field
      message
    }
    receipt {
      id
      createdAt
      updatedAt
      parentInvoiceId
      summary
      status
      amountPaid
      uploadedDocument
      fileType
      creator
      student {
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
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
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
              linkedAt
              linkCount
              isLinked
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
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
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
    }
  }
}
`)

export const REJECT_INVOICE = gql(`
mutation RejectInvoice($response: String!, $invoiceid: Float!) {
  rejectInvoice(response: $response, invoiceid: $invoiceid)
}`)

export const GET_STUDENT_ATTENDANCE = gql(`
query FetchStudentAttendance($studentId: Float!) {
  fetchStudentAttendance(studentId: $studentId) {
    id
    createdAt
    isPresent
    wasEdited
    note
    student {
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
      linkedAt
      linkCount
      isLinked
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
          classSubjects
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
            linkedAt
            linkCount
            isLinked
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
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
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
  }
}`)

export const GET_STUDENT_INVOICE = gql(`
query GetStudentInvoice($studentId: Float!) {
  getStudentInvoice(studentId: $studentId) {
    id
    createdAt
    updatedAt
    invoiceId
    summary
    response
    status
    amount
    balance
    isDisabled
    category
    academicTerm
    academicYear
    creator
    student {
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
      linkedAt
      linkCount
      isLinked
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
          classSubjects
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
            linkedAt
            linkCount
            isLinked
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
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
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
          accountName
          accountNumber
          bankName
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
          accountOfficer {
            id
            userId
            isDisabled
            isSuper
            isDirector
            createdAt
            fullName
            username
            phoneNumber
            role
            status
            department
            email
            profileImgUrl
            greyAdmin {
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
    receipt {
      id
      createdAt
      updatedAt
      parentInvoiceId
      summary
      status
      amountPaid
      uploadedDocument
      fileType
      creator
    }
    creatorSchool
  }
}`)

export const GET_SCHOOLS = gql(`
query GetSchools {
  getSchools {
    id
    createdAt
    isDisabled
    isVerified
    schoolName
    rcnumber
    address
    type
    lgarea
    profileLikes
    profileViews
    whoLikedProfile
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
    schoolMedia
    accountName
    accountNumber
    bankName
    logoImgUrl
    bannerImgUrl
    license
    creator {
      errors {
        field
        message
      }
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
        accountOfficer {
          id
          userId
          isDisabled
          isSuper
          isDirector
          createdAt
          fullName
          username
          phoneNumber
          role
          status
          department
          email
          profileImgUrl
          greyAdmin {
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
        school
        schoolImg
        statusCode
      }
    }
  }
}`)

export const UPLOAD_RESULT = gql(`
mutation UploadResult($studentId: Float!, $resultType: String!, $fileType: String!, $folder: String!, $document: String!, $schoolId: Float, $remark: String) {
  uploadResult(studentId: $studentId, resultType: $resultType, fileType: $fileType, folder: $folder, document: $document, schoolId: $schoolId, remark: $remark) {
    errors {
      field
      message
    }
    result {
      id
      isOfficial
      wasEdited
      createdAt
      approvedAt
      updatedAt
      remark
      fileType
      resultType
      document
      folder
      verifiedBy
      studentName
      isAcknowledged
      creator
      creatorRole
      creatorPicture
      creatorName
    }
  }
}`)

export const GET_STUDENT_GENERATED_RESULT = gql(`
query StudentGeneratedResult($studentId: Float!) {
  studentGeneratedResult(studentId: $studentId) {
    id
    isOfficial
    isVerified
    wasEdited
    createdAt
    approvedAt
    updatedAt
    verifiedBy
    remark
    academicTerm
    resultType
    creator
    student {
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
      linkedAt
      linkCount
      isLinked
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
          classSubjects
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
            linkedAt
            linkCount
            isLinked
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
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
          }
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
          accountOfficer {
            id
            userId
            isDisabled
            isSuper
            isDirector
            createdAt
            fullName
            username
            phoneNumber
            role
            status
            department
            email
            profileImgUrl
            greyAdmin {
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
      accountName
      accountNumber
      bankName
      logoImgUrl
      bannerImgUrl
      license
    }
    studentName
    studentAge
    attendance
    classStudents
    className
    subjects
    grades
    scores
    test1
    test2
    test3
    test4
  }
}
`)

export const REQUEST_CHILD = gql(`
mutation CreateRequest($message: String!, $purpose: String!, $studentId: Float!) {
  createRequest(message: $message, purpose: $purpose, studentId: $studentId) {
    errors {
      field
      message
    }
    requests {
      id
      message
      requestingAdmin
      student {
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
        linkedAt
        linkCount
        isLinked
        startDate
        endDate
        birthDate
        isArchived
        profileImgUrl
        classroom {
          classroom {
            id
            isValid
            wasEdited
            createdAt
            updatedAt
            classId
            className
            classSubjects
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
              linkedAt
              linkCount
              isLinked
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
            teacher {
              id
              userId
              createdAt
              status
              firstName
              middleName
              lastName
              phoneNumber
              email
              role
              folder
              isDisabled
              isVisible
              profileImgUrl
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
      status
      purpose
      accepted
      createdAt
      updatedAt
      nameOfRequesting
      roleOfRequesting
      funcOfRequesting
    }
  }
}`);

export const GET_STUDENTS = gql(`
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

export const UPDATE_PARENT = gql(`
mutation UpdateParentDetails($profileImgUrl: String!, $email: String!, $phoneNumber: String!, $lastName: String!, $middleName: String!, $firstName: String!) {
  updateParentDetails(profileImgUrl: $profileImgUrl, email: $email, phoneNumber: $phoneNumber, lastName: $lastName, middleName: $middleName, firstName: $firstName)
}`)

export const GET_STUDENT_UPLOADED_RESULT = gql(`
query StudentUploadedResult($studentId: Float!) {
  studentUploadedResult(studentId: $studentId) {
    id
    isOfficial
    wasEdited
    createdAt
    approvedAt
    updatedAt
    remark
    fileType
    resultType
    document
    folder
    verifiedBy
    studentName
    isAcknowledged
    creator
    creatorRole
    creatorPicture
    creatorName
    student {
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
      linkedAt
      linkCount
      isLinked
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
          classSubjects
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
            linkedAt
            linkCount
            isLinked
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
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
          }
        }
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
        role
        folder
        isDisabled
        profileImgUrl
        children {
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
          linkedAt
          linkCount
          isLinked
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
          accountOfficer {
            id
            userId
            isDisabled
            isSuper
            isDirector
            createdAt
            fullName
            username
            phoneNumber
            role
            status
            department
            email
            profileImgUrl
            greyAdmin {
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
      accountName
      accountNumber
      bankName
      logoImgUrl
      bannerImgUrl
      license
    }
  }
}
`)

export const PARENT_REQUESTS = gql(`
query ParentRequests($parentId: String!) {
  parentRequests(parentId: $parentId) {
    id
    message
    requestingAdmin
    student {
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
      linkedAt
      linkCount
      isLinked
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
          classSubjects
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
            linkedAt
            linkCount
            isLinked
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
          teacher {
            id
            userId
            createdAt
            status
            firstName
            middleName
            lastName
            phoneNumber
            email
            role
            folder
            isDisabled
            isVisible
            profileImgUrl
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
          accountName
          accountNumber
          bankName
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
          accountOfficer {
            id
            userId
            isDisabled
            isSuper
            isDirector
            createdAt
            fullName
            username
            phoneNumber
            role
            status
            department
            email
            profileImgUrl
            greyAdmin {
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
    status
    purpose
    accepted
    createdAt
    updatedAt
    nameOfRequesting
    roleOfRequesting
    funcOfRequesting
    picOfRequesting
  }
}`)

export const GET_NOTIFICATIONS = gql(`query FetchMyNotifications($ref: String!) {
  fetchMyNotifications(ref: $ref) {
    id
    createdAt
    isSeen
    ref
    userId
    action
    message
  }
}`)