import { z } from 'zod';
declare const _default: {
    authRouteSchemas: {
        signup: z.ZodEffects<z.ZodEffects<z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            passwordConfirm: z.ZodString;
            avatar: z.ZodOptional<z.ZodString>;
            netWorth: z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodLiteral<"">, undefined, "">, z.ZodNumber]>>;
            accounts: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: string | undefined;
            netWorth?: number | undefined;
            accounts?: string[] | null | undefined;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: string | undefined;
            netWorth?: number | "" | undefined;
            accounts?: string[] | null | undefined;
        }>, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: string | undefined;
            netWorth?: number | undefined;
            accounts?: string[] | null | undefined;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: string | undefined;
            netWorth?: number | "" | undefined;
            accounts?: string[] | null | undefined;
        }>, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: string | undefined;
            netWorth?: number | undefined;
            accounts?: string[] | null | undefined;
        }, {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
            avatar?: string | undefined;
            netWorth?: number | "" | undefined;
            accounts?: string[] | null | undefined;
        }>;
        login: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            password: string;
        }, {
            email: string;
            password: string;
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
            accountId: string;
            data: {
                name?: string | undefined;
                bank?: string | undefined;
                balance?: number | undefined;
            };
        }, {
            accountId: string;
            data: {
                name?: string | undefined;
                bank?: string | undefined;
                balance?: number | undefined;
            };
        }>;
        deleteAccount: z.ZodString;
    };
};
export default _default;
