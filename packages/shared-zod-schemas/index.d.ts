import { z } from 'zod';
declare const _default: {
    authRouteSchemas: {
        signup: z.ZodEffects<z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            passwordConfirm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        }>, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        }>;
        login: z.ZodObject<{
            email: z.ZodOptional<z.ZodString>;
            password: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            email?: string | undefined;
            password?: string | undefined;
        }, {
            email?: string | undefined;
            password?: string | undefined;
        }>;
        updateCurrentUser: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            avatar: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, any, any>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            avatar?: any;
        }, {
            name?: string | undefined;
            avatar?: any;
        }>;
        updateCurUserPassword: z.ZodObject<{
            curPassword: z.ZodString;
            newPassword: z.ZodString;
            newPasswordConfirm: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            curPassword: string;
            newPassword: string;
            newPasswordConfirm: string;
        }, {
            curPassword: string;
            newPassword: string;
            newPasswordConfirm: string;
        }>;
    };
    accountRouteSchemas: {
        createAccount: z.ZodObject<{
            name: z.ZodString;
            bank: z.ZodString;
            initialBalance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            bank: string;
            initialBalance: number;
        }, {
            name: string;
            bank: string;
            initialBalance: number;
        }>;
        readAccount: z.ZodString;
        updateAccount: z.ZodObject<{
            accountId: z.ZodString;
            data: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                bank: z.ZodOptional<z.ZodString>;
                initialBalance: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                bank?: string | undefined;
                initialBalance?: number | undefined;
            }, {
                name?: string | undefined;
                bank?: string | undefined;
                initialBalance?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            accountId: string;
            data: {
                name?: string | undefined;
                bank?: string | undefined;
                initialBalance?: number | undefined;
            };
        }, {
            accountId: string;
            data: {
                name?: string | undefined;
                bank?: string | undefined;
                initialBalance?: number | undefined;
            };
        }>;
        deleteAccount: z.ZodString;
    };
};
export default _default;
