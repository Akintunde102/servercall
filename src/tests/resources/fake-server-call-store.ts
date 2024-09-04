import { ServerCallVerbs, ServerCallsType } from '../../types';
export type ServerCallsKeyType =
  | 'get:'
  | 'post:usersExists'
  | 'post:usersGetByField'
  | 'post:usersSendShortCode'
  | 'post:usersCreate'
  | 'post:usersCreateBusiness'
  | 'post:usersUpdate'
  | 'post:usersUpdatePic'
  | 'get:users'
  | 'get:usersIdId'
  | 'post:usersResetPassword'
  | 'post:usersForgotPassword'
  | 'get:paymentListOfBanks'
  | 'get:paymentResolveAccount'
  | 'get:paymentGetAccountName'
  | 'get:paymentGetBillDetails'
  | 'post:authLogin'
  | 'get:authDetails'
  | 'post:vendorExists'
  | 'post:vendorCreateUser'
  | 'post:vendorLoginVendorId'
  | 'get:vendorUsers'
  | 'get:vendorTransactions'
  | 'get:vendorTransactionsGetByTuidTUID'
  | 'get:vendorTransactionsClaim'
  | 'get:vendorStats'
  | 'post:cardsTriggerCreation'
  | 'post:cardsSaveTransaction'
  | 'post:cardsClaim'
  | 'get:cardsClaimStatus'
  | 'get:cardsIdId'
  | 'get:cardsCodeCode'
  | 'post:cardsCodeSpend'
  | 'get:adminApproveId'
  | 'get:adminTransactionsPayAll'
  | 'get:adminCardCardRequests'
  | 'post:adminSendGenericMail'
  | 'post:adminLogs'
  | 'post:complainCreate'
  | 'get:complain'
  | 'get:genPdf';
export const serverCalls: ServerCallsType<ServerCallsKeyType> = {
  'get:': { path: '/', name: 'get:', verb: ServerCallVerbs.Get },
  'post:usersExists': {
    path: '/users/exists',
    name: 'post:usersExists',
    verb: ServerCallVerbs.Post,
  },
  'post:usersGetByField': {
    path: '/users/get-by-field',
    name: 'post:usersGetByField',
    verb: ServerCallVerbs.Post,
  },
  'post:usersSendShortCode': {
    path: '/users/send/short-code',
    name: 'post:usersSendShortCode',
    verb: ServerCallVerbs.Post,
  },
  'post:usersCreate': {
    path: '/users/create',
    name: 'post:usersCreate',
    verb: ServerCallVerbs.Post,
  },
  'post:usersCreateBusiness': {
    path: '/users/create/business',
    name: 'post:usersCreateBusiness',
    verb: ServerCallVerbs.Post,
  },
  'post:usersUpdate': {
    path: '/users/update',
    name: 'post:usersUpdate',
    verb: ServerCallVerbs.Post,
  },
  'post:usersUpdatePic': {
    path: '/users/update/pic',
    name: 'post:usersUpdatePic',
    verb: ServerCallVerbs.Post,
  },
  'get:users': { path: '/users', name: 'get:users', verb: ServerCallVerbs.Get },
  'get:usersIdId': {
    path: (args: { id: string }) => `/users/id/${args.id}`,
    name: 'get:usersIdId',
    verb: ServerCallVerbs.Get,
  },
  'post:usersResetPassword': {
    path: '/users/resetPassword',
    name: 'post:usersResetPassword',
    verb: ServerCallVerbs.Post,
  },
  'post:usersForgotPassword': {
    path: '/users/forgotPassword',
    name: 'post:usersForgotPassword',
    verb: ServerCallVerbs.Post,
  },
  'get:paymentListOfBanks': {
    path: '/payment/list-of-banks',
    name: 'get:paymentListOfBanks',
    verb: ServerCallVerbs.Get,
  },
  'get:paymentResolveAccount': {
    path: '/payment/resolve-account',
    name: 'get:paymentResolveAccount',
    verb: ServerCallVerbs.Get,
  },
  'get:paymentGetAccountName': {
    path: '/payment/get-account-name',
    name: 'get:paymentGetAccountName',
    verb: ServerCallVerbs.Get,
  },
  'get:paymentGetBillDetails': {
    path: '/payment/get-bill-details',
    name: 'get:paymentGetBillDetails',
    verb: ServerCallVerbs.Get,
  },
  'post:authLogin': {
    path: '/auth/login',
    name: 'post:authLogin',
    verb: ServerCallVerbs.Post,
  },
  'get:authDetails': {
    path: '/auth/details',
    name: 'get:authDetails',
    verb: ServerCallVerbs.Get,
  },
  'post:vendorExists': {
    path: '/vendor/exists',
    name: 'post:vendorExists',
    verb: ServerCallVerbs.Post,
  },
  'post:vendorCreateUser': {
    path: '/vendor/create-user',
    name: 'post:vendorCreateUser',
    verb: ServerCallVerbs.Post,
  },
  'post:vendorLoginVendorId': {
    path: (args: { vendorId: string }) => `/vendor/login/${args.vendorId}`,
    name: 'post:vendorLoginVendorId',
    verb: ServerCallVerbs.Post,
  },
  'get:vendorUsers': {
    path: '/vendor/users',
    name: 'get:vendorUsers',
    verb: ServerCallVerbs.Get,
  },
  'get:vendorTransactions': {
    path: '/vendor/transactions',
    name: 'get:vendorTransactions',
    verb: ServerCallVerbs.Get,
  },
  'get:vendorTransactionsGetByTuidTUID': {
    path: (args: { tUID: string }) => `/vendor/transactions/get_by_tuid/${args.tUID}`,
    name: 'get:vendorTransactionsGetByTuidTUID',
    verb: ServerCallVerbs.Get,
  },
  'get:vendorTransactionsClaim': {
    path: '/vendor/transactions/claim',
    name: 'get:vendorTransactionsClaim',
    verb: ServerCallVerbs.Get,
  },
  'get:vendorStats': {
    path: '/vendor/stats',
    name: 'get:vendorStats',
    verb: ServerCallVerbs.Get,
  },
  'post:cardsTriggerCreation': {
    path: '/cards/triggerCreation',
    name: 'post:cardsTriggerCreation',
    verb: ServerCallVerbs.Post,
  },
  'post:cardsSaveTransaction': {
    path: '/cards/save-transaction',
    name: 'post:cardsSaveTransaction',
    verb: ServerCallVerbs.Post,
  },
  'post:cardsClaim': {
    path: '/cards/claim',
    name: 'post:cardsClaim',
    verb: ServerCallVerbs.Post,
  },
  'get:cardsClaimStatus': {
    path: (args: { claimStatus: string }) => `/cards/${args.claimStatus}`,
    name: 'get:cardsClaimStatus',
    verb: ServerCallVerbs.Get,
  },
  'get:cardsIdId': {
    path: (args: { id: string }) => `/cards/id/${args.id}`,
    name: 'get:cardsIdId',
    verb: ServerCallVerbs.Get,
  },
  'get:cardsCodeCode': {
    path: (args: { code: string }) => `/cards/code/${args.code}`,
    name: 'get:cardsCodeCode',
    verb: ServerCallVerbs.Get,
  },
  'post:cardsCodeSpend': {
    path: (args: { code: string }) => `/cards/${args.code}/spend`,
    name: 'post:cardsCodeSpend',
    verb: ServerCallVerbs.Post,
  },
  'get:adminApproveId': {
    path: (args: { id: string }) => `/admin/approve/${args.id}`,
    name: 'get:adminApproveId',
    verb: ServerCallVerbs.Get,
  },
  'get:adminTransactionsPayAll': {
    path: '/admin/transactions/pay-all',
    name: 'get:adminTransactionsPayAll',
    verb: ServerCallVerbs.Get,
  },
  'get:adminCardCardRequests': {
    path: '/admin/card/card-requests',
    name: 'get:adminCardCardRequests',
    verb: ServerCallVerbs.Get,
  },
  'post:adminSendGenericMail': {
    path: '/admin/send-generic-mail',
    name: 'post:adminSendGenericMail',
    verb: ServerCallVerbs.Post,
  },
  'post:adminLogs': {
    path: '/admin/logs',
    name: 'post:adminLogs',
    verb: ServerCallVerbs.Post,
  },
  'post:complainCreate': {
    path: '/complain/create',
    name: 'post:complainCreate',
    verb: ServerCallVerbs.Post,
  },
  'get:complain': {
    path: '/complain',
    name: 'get:complain',
    verb: ServerCallVerbs.Get,
  },
  'get:genPdf': {
    path: '/gen/pdf',
    name: 'get:genPdf',
    verb: ServerCallVerbs.Get,
  },
};
