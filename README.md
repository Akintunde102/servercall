# Easier Way of making Http Requests

#### Install the Npm Package
```bash
npm install servercall --save
```

#### Create a folder called `servercall` inside your project. 
```bash
mkdir servercall
```

#### Create a Store file to store your endpoints (/servercall/store.ts).

This can be done in two ways
### 1. By AutoGeneration
- Step 1: Install Servercall-cli globally
```bash
npm install servercall-cli -g
```
- Step 2: Create the folder where `servercall` store will reside. e.g. `servercall`
- Step 3: Generate the servercall store by providing your Open API url and your store location as below
```bash
servercall-cli generate -s servercall/store.ts -a https://api.example.com/docs-json
```

> Replace `https://api.example.com/docs-json` with your own API url

### 2. By Manual Process
- Step 1: Create the Store file
```bash
touch servercall/store.ts
```
- Step 2: Copy the code below, edit it and follow the model to create your own store

```ts
import { ServerCallVerbs, ServerCallsType } from 'servercall';

export type ServerCallsKeyType = 'userExists' | 'sendShortCode' | 'getUser';

export const serverCalls: ServerCallsType<ServerCallsKeyType> ={
  userExists: { path: `/users/exists`, verb: ServerCallVerbs.Post, name: 'UserExists' },
  sendShortCode: { path: `/users/send/short-code`, verb: ServerCallVerbs.Post, name: 'SendShortCode' },
  getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get, name: 'GetUser' },
};

```
#### > You are almost done

#### Create the initialization file (servercall/init.ts)

```
touch servercall/init.ts
```

#### Copy the code below into (servercall/init.ts) and readjust to fit your own use case
```ts
import { createServerCall } from 'servercall';

export const serverCall = createServerCall({
    baseUrl: 'http://localhost:9000',
    logger: console,
    defaultAuthSource: () => 'fake-auth',
    defaultResponseDataDept: (response: any) => response?.['data'],
    successFieldDept: (response: any) => response?.['data']?.['success'],
    // handleServerError: ()=>{}
  });

```

- `baseUrl: string`,  the base URL of the server being called
- `logger: string` , the logger servercall is expected to use for debugging errors, requests, and response details. e.g. console. Most importantly, the logger should have a log field as we have in `console.log`
- `defaultAuthSource`: Function: This function should return your authentication token. e.g () => "bearer token"
- `defaultResponseDataDept: Function: This function simply shows how deep the data object is located in the response object e.g. (response: any) => response?.['data']
- `successFieldDept`: Function: This function simply shows shows how deep the success field is if you have any . e.g. (response: any) => response?.['data']?.['success'],
- `handleServerError`: Function: This is an optional function that handles the errors that can occur while calling your endpoints. if not set, servercall handles error by default. it should look like this below. 

> Note: handleServerError arguments should be in this form `{ error,
  errorTag,
  defaultError}` and the response must always be in this form `{ success: false, error: errorMessage }`. **<code>success</code> has to be false and an `error` has to be a string**
  

  - ##### Sample Code for handleServerError is Below
```ts
 /**
  - error - refers to the error returned
  - errorTag - refers to the tag of the error
  - defaultError - refers to the default error message
  **/
  
export const handleServerError = ({
  error,
  errorTag,
  defaultError
}: HandleServerError) => {
  const errorMessage = error?.response?.data?.message?.[0] || error?.response?.data?.error;
  return { success: false, error: errorMessage };
};
```

#### Create an Index File
> This makes importing the files cleaner

Run the below code from your project root
```ts
touch servercall/index.ts
```

Paste the below code in the index file (`servercall/index.ts`)
```ts
export * from './init';
export * from './store';
```



#### Finally, USAGE:
Copy the code below to where you want to make api calls

```ts
  import { serverCall, serverCalls } from './servercall';
  
  serverCall({
    serverCallProps: { call: serverCalls.userExists },
    pathArgs: { id: '620aec25eaf54c618c8f26f2' },
    authorized: true,
   }).then((response) => {
    const { success, error, dataReturned } = response;
    if (!success) {
        console.log({ error });
    }
   });
```


#### Response is in one form : { success, error, dataReturned}

- Success: boolean: It returns the success state of the request
- error: string: Error is set when success is false,
- dataReturned: any. This is data returned from the server


#### Arguments is the following form
```ts
export interface ServerCallArgs {
    serverCallProps: ServerCallProps;
    authorized?: boolean;
    onSuccess?: (dataReturned: any) => void;
    run?: boolean;
    defaultError?: string;
    pathArgs?: Record<string, string>;
    debug?: boolean;
}
```

- ServerCallProps: This should look like this `{ call : serverCalls.getUser}` where call is an item from the servercall store. `/servercall/store.ts`

- authorized: This is true if bearer authentication is meant to be in the header when request is sent and false when bearer authentication is not required. It is false by default

- onSuccess: This is the function that runs when the request is successful.

- run: When this is false, the api call is never made. The servercall simply becomes a dummy call and the response becomes undefined.

- pathArgs: This is an object of arguments that get set in situations where the servercallProps used has an path argument. e.g.  `getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get, name: 'GetUser' },`. In the case of the example cited here,  pathArgs will be set as `{id: "123"}`

- debug: When debug is true, details of your servercall is logged to console. When it is false, no logging happens









