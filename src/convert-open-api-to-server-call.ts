/** Convert Open API Schemas to Server call store*/
import { OpenAPIV3 } from "openapi-types";
import { pick } from "lodash";
import { logger } from "./logger";
import { createAxiosInstances } from "./server-instances";
import { ServerCall, ServerCallsType, ServerCallVerbs } from "./types";

export const convertOpenAPiToServerCallStore = async (source: any) => {
    const axiosInstance = createAxiosInstances(source);
    const response = await axiosInstance.get({ url: '/' });
    const schemas: OpenAPIV3.Document = response.data;
    const { paths } = schemas
    const listOfPaths = Object.entries(paths);
    const store = {} as any;

    const keyTypeArr = [];
    for (const [path, pathObj] of listOfPaths) {
        const endPointsInPath = pick(pathObj, ['get', 'post', 'put', 'delete']);
        for (const [verb, verbObj] of Object.entries(endPointsInPath)) {
            const pathName = createCallName(path, verb as OpenAPIV3.HttpMethods);
            keyTypeArr.push(`"${pathName}"`);
            const storeEntry = { path: formatPathIfNecessary(path, verbObj as OpenAPIV3.OperationObject), name: pathName, verb: mapHttpMethodsToServerCallVerbs(verb as OpenAPIV3.HttpMethods) };
            store[pathName] = storeEntry;
        }
    }
    return { store: reformatServerStore(store), keyType: keyTypeArr.join(' | ') };
}


/** Reformat Server Store  */

const reformatServerStore = (store: any) => {
    const stringifiedStore = JSON.stringify(store);
    const withoutOpenQuotes = stringifiedStore.replace(/"\[\[/g, '');
    const withoutBothQuotes = withoutOpenQuotes.replace(/\]\]"/g, '');
    return withoutBothQuotes;
}


/*** Map HttpMethods to ServerCallVerbs */

const mapHttpMethodsToServerCallVerbs = (verb: OpenAPIV3.HttpMethods): string => {
    const map: Record<OpenAPIV3.HttpMethods, string> = {
        [OpenAPIV3.HttpMethods.GET]: "[[ServerCallVerbs.Get]]",
        [OpenAPIV3.HttpMethods.POST]: "[[ServerCallVerbs.Post]]",
        [OpenAPIV3.HttpMethods.DELETE]: "[[ServerCallVerbs.Delete]]",
        [OpenAPIV3.HttpMethods.PATCH]: "[[ServerCallVerbs.Patch]]",
        [OpenAPIV3.HttpMethods.HEAD]: "[[ServerCallVerbs.Head]]",
        [OpenAPIV3.HttpMethods.OPTIONS]: "[[ServerCallVerbs.Options]]",
        [OpenAPIV3.HttpMethods.TRACE]: "[[ServerCallVerbs.Trace]]",
        [OpenAPIV3.HttpMethods.PUT]: "[[ServerCallVerbs.Put]]"
    }
    return map[verb]
}

const createCallName = (path: string, verb: OpenAPIV3.HttpMethods) => {
    const pathArr = path.split("");
    const newStr = [];
    for (let i = 0; i < pathArr.length; i++) {
        const element = pathArr[i];
        const elementIsAlphanumeric = element.match(/^[0-9A-Za-z]+$/);

        if (i !== 0 && !elementIsAlphanumeric) {
            const nextElement = pathArr[i + 1];
            if (nextElement) {
                pathArr[i + 1] = nextElement.toUpperCase();
            }
            continue;
        }

        if (elementIsAlphanumeric) {
            newStr.push(element);
            continue;
        }


    }
    return `${verb}:${newStr.join("")}`;
}

const formatPathIfNecessary = (path: string, verbObj: OpenAPIV3.OperationObject) => {
    let nPath = path;
    const { parameters = null } = verbObj as OpenAPIV3.OperationObject;
    const pathParams = (parameters ?? []).filter(param => (param as OpenAPIV3.ParameterObject).in === 'path');
    if (pathParams?.length) {
        const func = { tail: path, argArr: [] as any, head: `` };
        for (let j = 0; j < pathParams.length; j++) {
            const { name, schema } = pathParams[j] as OpenAPIV3.ParameterObject;
            const { type: schemaType = 'any' } = schema as OpenAPIV3.NonArraySchemaObject;
            func.tail = func.tail.replace(`{${name}}`, `\${args.${name}}`);
            func.argArr.push(`${name}:  ${schemaType}`);
        }
        func.head = `(args: { ${func.argArr.join(', ')} })`;
        nPath = `[[${func.head} => \`${func.tail}\`]]`;
    }
    return nPath;
}