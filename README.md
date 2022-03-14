
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

import { ServerCallVerbs, ServerCallsType } from '../../types';

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
  const serverCall = createServerCall({
    baseUrl: 'http://localhost:9000',
    logger: mockConsole,
    defaultAuthSource: () => 'fake-auth',
    defaultResponseDataDept: (response: any) => response?.['data'],
    successFieldDept: (response: any) => response?.['data']?.['success'],
  });

export const serverCall;
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




