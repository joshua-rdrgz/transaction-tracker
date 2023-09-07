import { z } from 'zod';
declare const _default: {
    authRouteSchemas: {
        signup: z.ZodEffects<z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            passwordConfirm: z.ZodString;
            avatar: z.ZodEffects<z.ZodEffects<z.ZodAny, any, any>, any, any>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: any;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: any;
        }>, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: any;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: any;
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
    };
    accountRouteSchemas: {
        createAccount: z.ZodObject<{
            name: z.ZodString;
            bank: z.ZodString;
            balance: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            bank: string;
            balance: number;
        }, {
            name: string;
            bank: string;
            balance: number;
        }>;
        readAccount: z.ZodString;
        updateAccount: z.ZodObject<{
            accountId: z.ZodString;
            data: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                bank: z.ZodOptional<z.ZodString>;
                balance: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                bank?: string | undefined;
                balance?: number | undefined;
            }, {
                name?: string | undefined;
                bank?: string | undefined;
                balance?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                name?: string | undefined;
                bank?: string | undefined;
                balance?: number | undefined;
            };
            accountId: string;
        }, {
            data: {
                name?: string | undefined;
                bank?: string | undefined;
                balance?: number | undefined;
            };
            accountId: string;
        }>;
        deleteAccount: z.ZodString;
    };
};
export default _default;
