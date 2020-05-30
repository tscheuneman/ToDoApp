interface CategoryInsertDO {
    name: string,
    slug: string,
    user: string
}

interface CategoryEdit {
    id: string,
    name: string,
    slug: string,
    user: string
}

interface CategoryDelete {
    id: string,
    user: string
}