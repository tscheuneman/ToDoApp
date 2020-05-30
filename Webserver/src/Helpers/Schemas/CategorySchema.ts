export const CategoryCreateSchema = {
    name: {
        key: 'name',
        type: 'string',
        maxLength: 255,
        required: true
    },
    slug: {
        key: 'slug',
        type: 'string',
        maxLength: 255,
        required: true
    }
}

export const CategoryEditSchema = {
    id: {
        key: 'id',
        type: 'string',
        maxLength: 36,
        required: true
    },
    name: {
        key: 'name',
        type: 'string',
        maxLength: 255,
        required: true
    },
    slug: {
        key: 'slug',
        type: 'string',
        maxLength: 255,
        required: true
    }
}