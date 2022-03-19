
### Install the Npm Package
```
npm install servercall --save
```

### Create a folder called `servercall` inside your project. 
Your store and server initialization will be stored here

```
mkdir servercall
```

### Create an Endpoint Store file (/servercall/store.ts) . 

This is where you endpoints are stored. <br/>
You can copy the code below and follow the model to create your own store

```

import { ServerCallVerbs, ServerCallsType } from 'servercall';

export type ServerCallsKeyType = 'userExists' | 'sendShortCode' | 'getUser';

export const serverCalls: ServerCallsType<ServerCallsKeyType> ={
  userExists: { path: `/users/exists`, verb: ServerCallVerbs.Post, name: 'UserExists' },
  sendShortCode: { path: `/users/send/short-code`, verb: ServerCallVerbs.Post, name: 'SendShortCode' },
  getUser: { path: (args: { id: string }) => `/users/id/${args.id}`, verb: ServerCallVerbs.Get, name: 'GetUser' },
};

```
### > You are almost done

### Create the initialization file (servercall/index.ts)

```
import { createServerCall } from 'servercall';

export const serverCall = createServerCall({
    baseUrl: 'http://localhost:9000',
    logger: console,
    defaultAuthSource: () => 'fake-auth',
    defaultResponseDataDept: (response: any) => response?.['data'],
    successFieldDept: (response: any) => response?.['data']?.['success'],
   handleServerError: 
  });

```

- `baseUrl: string`,  the base URL of the server being called
- `logger: string` , the logger servercall is expected to use to debug errors, requests, and response details. e.g. console. Most importantly, the logger should have a log field. Just like console.log.
- `defaultAuthSource`: Function: This function should return your authentication token. e.g () => "bearer token"
- `defaultResponseDataDept: Function: This function simply shows how deep the data object is located in the response object e.g. (response: any) => response?.['data']
- `successFieldDept`: Function: This function simply shows shows how deep the success field is if you have any . e.g. (response: any) => response?.['data']?.['success'],
- `handleServerError`: Function: This is an optional function that handles the errors servercall . if not set, servercall handles error by default. it should look like this.

```
export const defaultServerErrorHandler = ({ error, errorTag, defaultError }: HandleServerError) => {
  if (error.response) {
    const { status, statusText, data } = error.response;
    logger.log({ error: error.response }, errorTag);

    return { success: false, error: { status, statusText, data } };
  }

  return { success: false, error };
};

```


### Finally, USAGE:

``` 
  import {serverCall} from './servercall';

  const {success, error, dataReturned} = await serverCall({
      serverCallProps: { call: serverCalls.getUser },
      pathArgs: { id: '620aec25eaf54c618c8f26f2' },
      authorized: true,
      run: false,
    });
```


#Response is in one form : { success, error, dataReturned}

- Success: boolean: It returns the success state of the request
- error: string: Error is set when success is false,
- dataReturned: any. This is data returned from the server


- Arguments is the following form






