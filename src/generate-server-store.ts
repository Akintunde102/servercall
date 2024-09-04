import * as fs from 'fs';
import * as prettier from 'prettier';
import { convertOpenAPiToServerCallStore } from './convert-open-api-to-server-call';
import { getArgs } from './get-args';
import { logger } from './logger';
import { GenerateServerStoreArgs } from './types';

export const generateServerStore = async () => {
  const { apidoc, storepath } = getArgs<GenerateServerStoreArgs>(process);

  const { store: serverStore, keyType } = await convertOpenAPiToServerCallStore(apidoc);

  const fileLocation = storepath;

  const content = `
import { ServerCallVerbs, ServerCallsType } from 'servercall';
export type ServerCallsKeyType = ${keyType};
export const serverCalls: ServerCallsType<ServerCallsKeyType> = ${serverStore};
`;

  const prettyContent = prettier.format(content, { semi: true, parser: 'typescript' });

  fs.writeFile(fileLocation, prettyContent, (err) => {
    if (err) {
      logger.log('Error while creating' + fileLocation);
    } else {
      logger.log('File ' + fileLocation + ' created');
    }
  });
};

generateServerStore().then();
