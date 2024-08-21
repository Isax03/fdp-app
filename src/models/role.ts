export enum Role {
    UNVERIFIED = -5,
    NORMAL = 0,
    CHECKOUT = 2,
    SELLER = 5,
    CHECKIN = 10,
    ADMIN = 15,
    SUPERADMIN = 20
}

export const enumBindings: {[key: string]: Role} = {
    'unverified': Role.UNVERIFIED,
    'normal': Role.NORMAL,
    'checkout': Role.CHECKOUT,
    'seller': Role.SELLER,
    'checkin': Role.CHECKIN,
    'admin': Role.ADMIN,
    'superadmin': Role.SUPERADMIN
};