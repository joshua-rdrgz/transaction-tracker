export const accountErrors = {
  noAssociatedUser: 'An account must be associated with a user.',
  noName: 'An account must have a name.  Please give it one.',
  noBank: 'An account must have a corresponding bank.  Please give it one.',
  noBalance: 'An account must have a balance.  Please provide one.',
  balanceBelowZero:
    'The balance provided is below 0.  Please provide a balance above 0.',
  noAccountOrNoAccess:
    'The account you requested does not exist or the account does not belong to you.  Please try again.',
} as const;

export const authErrors = {
  incorrectUserOrPassword: 'Incorrect email or password, please try again.',
  noCredentialsProvided:
    'Email or password was not provided.  Please provide your credentials to log in.',
  notLoggedIn:
    'You are not signed in and cannot access this resource.  Please log in to gain access.',
  emailAlreadyInUse:
    'This email is already in use.  Please try again with a different email.',
  notAllowedToChangePassword:
    'Your current password does not match the password in our records, so we cannot allow you to update your password.  Please try again.',
} as const;

export const categoryBucketErrors = {
  noAssociatedUser:
    'A category must have a corresponding user.  Please provide one.',
  invalidType:
    "A category's type must be either income or expense.  Please choose one of those two.",
  noCategories:
    'A category bucket must have at least 1 category.  Please provide one.',
} as const;

export const categoryErrors = {
  noAssociatedUser:
    'A category must have a corresponding user.  Please provide one.',
  invalidType:
    "A category's type must be either income or expense.  Please choose one of those two.",
} as const;

export const targetErrors = {
  noTarget: 'A target must exist.  Please provide one.',
  noAssociatedUser:
    'A target must have a corresponding user.  Please provide one.',
  noAssociatedCategory:
    'A target must have a corresponding category.  Please provide one.',
  noMonth: 'A target must have a month.  Please provide one.',
  notValidMonth:
    'A month must be between January (1) and December (12).  Please provide an option in that range.',
  noPastMonth:
    'A target cannot be set for a previous month.  Please pick a current or future month.',
  noYear: 'A target must have a year.  Please provide one.',
  noPastYear:
    'A target cannot be set for a previous year.  Please pick a current or future year.',
} as const;

export const transactionErrors = {
  noAmount: 'A transaction must have an amount.  Please provide one.',
  noAssociatedUser:
    'A transaction must have a corresponding user.  Please provide one.',
  noAssociatedAccount:
    'A transaction must have a corresponding account.  Please provide one.',
  noAssociatedCategory:
    'A transaction must have a corresponding category.  Please provide one.',
  noDate: 'A transaction must have a date.  Please provide one.',
} as const;

export const userErrors = {
  noName: 'Your must provide your name.',
  noEmail: 'You must provide your email.',
  notValidEmail:
    'The email address provided is invalid.  Please provide a valid email address.',
  notUniqueEmail:
    'The email address provided is already in use.  Please provide a different email address.',
  noPassword: 'You must provide a password.',
  passwordTooSmall: 'Your password must be at least 8 characters long.',
  noPasswordConfirm: 'You must provide a confirm password.',
  passwordsDoNotMatch:
    'Your passwords do not match.  Please use a matching password.',
  noNetWorthInfo:
    'User validation failed: netWorth: Either net worth or accounts is missing.  Please provide at least one of the two., accounts: Either net worth or accounts is missing.  Please provide at least one of the two.',
} as const;
