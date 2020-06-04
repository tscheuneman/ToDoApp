export const TaskCreateSchema = {
    category: {
        key: 'category',
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
    text: {
        key: 'text',
        type: 'string',
        maxLength: 0,
        required: true
    }
}

export const TaskEditSchema = {
    category: {
        key: 'category',
        type: 'string',
        maxLength: 36,
        required: true
    },
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
    text: {
        key: 'text',
        type: 'string',
        maxLength: 0,
        required: true
    }
}