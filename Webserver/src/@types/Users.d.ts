interface UserInsertDO {
    username: string,
    email: string,
    password: string
}

type UserSearchType = 'ID' | 'ReadID' | 'Username';