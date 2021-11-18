export const Users = {
    isAdmin: { type: "text", default: false },
    email: { type: "text", default: false },
    displayName: { type: "text", default: false },
    photoURL: { type: "text", default: false },
    phone: { type: "text", default: '' },
    inactive: { type: "boolean", default: false },
    adresses: { type: "object", default: {} },
}

export const UsersAddress = {
    id: { type: "text", default: '' },
    address: { type: "text", default: '' },
    number: { type: "text", default: '' },
    additional: { type: "text", default: '' },
    block: { type: "text", default: '' },
    zipcode: { type: "text", default: '' },
    city: { type: "text", default: '' },
    uf: { type: "text", default: '' },
    nick: { type: "text", default: '' },
    phone: { type: "text", default: '' },
}