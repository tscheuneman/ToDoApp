interface UserInsertDO {
    username: string,
    userHash?: string,
    password?: string,
    thirdPartyID?: string
}

type UserSearchType = 'ID' | 'ReadID' | 'Username' | 'ThirdPartyID';