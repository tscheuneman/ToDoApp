interface TaskInsertDO {
    category: string,
    user: string,
    name: string,
    text: string
}

interface TaskEdit {
    id: string,
    name: string,
    text: string,
    user: string
}

interface TaskDelete {
    id: string,
    user: string
}