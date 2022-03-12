# Server Call

## Install
```
npm install servercall
```

## Set up
- Create the Caller Function

```
const createServerCallConfig: CreateServerCall = {
    defaultAuthSource: () => "bearer token",
    handleServerError: () => {// here is where you handle error returned}, 
    baseUrl: "https://example.com/api",
    logger: console.log,
    defaultResponseDataDept: (response: any) => response?.['data']?,
    successFieldDept: (response: any) => response?.['data']?.['success'],
}
```
export const serverCall = createServerCall(createServerCallConfig);


- Set Up Store

> The store is meant to be a map of all your api endpoints you make calls to. It has to follow the model below

```
//server-call-store.ts
import { ServerCallVerbs, ServerCall } from "server-call";

export type ServerCallsType = Record<ServerCallsKeyType, ServerCall>;

export const getDataByGeneralDept = (response: any) => response?.['data']?.['data'];

export const serverCalls: ServerCallsType = {
  userExists: { path: `/users/exists`, verb: ServerCallVerbs.Post},
  sendShortCode: { path: `/users/send/short-code`, verb: ServerCallVerbs.Post },
  getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get }
};

export type ServerCallsKeyType =  "userExists" | "sendShortCode" | "getUser";

```

## Usage
```
import { serverCall } from "server-call";
import { serverCalls } from "./server-call-store";

 const { success, error } = await serverCall({
      serverCallProps: {
        call: serverCalls.sendShortCode,
        data: {
          phoneNumber: +2349045908756
        }
      },
    });
```

