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
    categoryRouteSchemas: {
        getCategory: z.ZodString;
        getCategories: z.ZodOptional<z.ZodObject<{
            categoryBucket: z.ZodOptional<z.ZodString>;
            transactionIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            categoryBucket?: string | undefined;
            transactionIds?: string[] | undefined;
        }, {
            categoryBucket?: string | undefined;
            transactionIds?: string[] | undefined;
        }>>;
    };
    transactionRouteSchemas: {
        createTransaction: z.ZodObject<{
            date: z.ZodDate;
            contact: z.ZodString;
            description: z.ZodString;
            category: z.ZodString;
            amount: z.ZodNumber;
            account: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            date: Date;
            contact: string;
            description: string;
            category: string;
            amount: number;
            account: string;
        }, {
            date: Date;
            contact: string;
            description: string;
            category: string;
            amount: number;
            account: string;
        }>;
        getTransactions: z.ZodOptional<z.ZodObject<{
            accountId: z.ZodOptional<z.ZodString>;
            categoryId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            accountId?: string | undefined;
            categoryId?: string | undefined;
        }, {
            accountId?: string | undefined;
            categoryId?: string | undefined;
        }>>;
        updateTransaction: z.ZodObject<{
            transactionId: z.ZodString;
            data: z.ZodObject<{
                date: z.ZodOptional<z.ZodDate>;
                contact: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
                category: z.ZodString;
                amount: z.ZodOptional<z.ZodNumber>;
                account: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                category: string;
                account: string;
                date?: Date | undefined;
                contact?: string | undefined;
                description?: string | undefined;
                amount?: number | undefined;
            }, {
                category: string;
                account: string;
                date?: Date | undefined;
                contact?: string | undefined;
                description?: string | undefined;
                amount?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                category: string;
                account: string;
                date?: Date | undefined;
                contact?: string | undefined;
                description?: string | undefined;
                amount?: number | undefined;
            };
            transactionId: string;
        }, {
            data: {
                category: string;
                account: string;
                date?: Date | undefined;
                contact?: string | undefined;
                description?: string | undefined;
                amount?: number | undefined;
            };
            transactionId: string;
        }>;
        deleteTransaction: z.ZodString;
    };
};
export default _default;
