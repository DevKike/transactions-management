export const  TYPES = {
  DataSource: Symbol.for('DataSource'),

  Application: Symbol.for('Application'),
  RouterModule: Symbol.for('RouterModule'),
  RouterManager: Symbol.for('RouterManager'),

  AuthService: Symbol.for('AuthService'),

  UserRepository: Symbol.for('UserRepository'),
  UserService: Symbol.for('UserService'),
  RegisterUseCase: Symbol.for('RegisterUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  GetUserDataByIdUseCase: Symbol.for('GetUserDataByIdUseCase'),
  UserRouter: Symbol.for('UserRouter'),

  CreditCardRepository: Symbol.for('CreditCardRepository'),
  CreditCardService: Symbol.for('CreditCardService'),
  CreateOwnCreditCardUseCase: Symbol.for('CreditCardUseCase'),
  GetAllCreditCardsUseCase: Symbol.for('GetAllCreditCards'),
  GetUserCreditCardsUseCase: Symbol.for('GetUserCreditCards'),
  CheckCreditCardBalanceUseCase: Symbol.for('CheckCreditCardBalance'),
  CreditCardRouter: Symbol.for('CreditCardRouter'),

  TransactionRepository: Symbol.for('TransactionRepository'),
  TransactionService: Symbol.for('TransactionService'),
};
