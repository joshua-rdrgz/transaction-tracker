"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const MAX_FILE_SIZE = 200000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
exports.default = {
    authRouteSchemas: {
        signup: zod_1.z
            .object({
            name: zod_1.z.string().nonempty('Name is required.'),
            email: zod_1.z
                .string()
                .nonempty('Email is required')
                .email('Email must be valid.'),
            password: zod_1.z
                .string()
                .nonempty('Password is required')
                .min(8, 'Password must be at least 8 characters.'),
            passwordConfirm: zod_1.z
                .string()
                .nonempty('Password Confirm is required.')
                .min(8, 'Password must be at least 8 characters.'),
        })
            .refine((schema) => schema.password === schema.passwordConfirm, {
            message: 'Password and Confirm Password must match.',
            path: ['passwordConfirm'],
        }),
        login: zod_1.z.object({
            email: zod_1.z.string().optional(),
            password: zod_1.z.string().optional(),
        }),
        updateCurrentUser: zod_1.z.object({
            name: zod_1.z.string().optional(),
            avatar: zod_1.z
                .any()
                .refine((file) => { var _a; return (((_a = file === null || file === void 0 ? void 0 : file[0]) === null || _a === void 0 ? void 0 : _a.size) ? file[0].size >= MAX_FILE_SIZE : true); }, 'Max file size is 2MB.')
                .refine((file) => {
                var _a, _b;
                return ((_a = file === null || file === void 0 ? void 0 : file[0]) === null || _a === void 0 ? void 0 : _a.size)
                    ? ACCEPTED_IMAGE_TYPES.includes((_b = file === null || file === void 0 ? void 0 : file[0]) === null || _b === void 0 ? void 0 : _b.type)
                    : true;
            }, 'Only .jpg, .jpeg, .png, and .webp files are accepted.')
                .optional(),
        }),
        updateCurUserPassword: zod_1.z.object({
            curPassword: zod_1.z.string().nonempty('Current password is required.'),
            newPassword: zod_1.z
                .string()
                .nonempty('New password is required')
                .min(8, 'Password must be at least 8 characters.'),
            newPasswordConfirm: zod_1.z
                .string()
                .nonempty('New Password Confirm is required.')
                .min(8, 'Password must be at least 8 characters.'),
        }),
    },
    accountRouteSchemas: {
        createAccount: zod_1.z.object({
            name: zod_1.z.string().nonempty('Name is required.'),
            bank: zod_1.z.string().nonempty('Bank is required.'),
            balance: zod_1.z.coerce.number(),
        }),
        readAccount: zod_1.z.string().nonempty('Account ID is required.'),
        updateAccount: zod_1.z.object({
            accountId: zod_1.z.string().nonempty('Account ID is required.'),
            data: zod_1.z.object({
                name: zod_1.z.string().optional(),
                bank: zod_1.z.string().optional(),
                balance: zod_1.z.coerce.number().optional(),
            }),
        }),
        deleteAccount: zod_1.z.string().nonempty('Account ID is required.'),
    },
};
