import { ECS } from "../ECS";
import { ECSClient } from "../ECSClient";
import {
  ListTaskDefinitionFamiliesCommand,
  ListTaskDefinitionFamiliesCommandInput,
  ListTaskDefinitionFamiliesCommandOutput,
} from "../commands/ListTaskDefinitionFamiliesCommand";
import { ECSPaginationConfiguration } from "./Interfaces";
import { Paginator } from "@aws-sdk/types";

const makePagedClientRequest = async (
  client: ECSClient,
  input: ListTaskDefinitionFamiliesCommandInput,
  ...args: any
): Promise<ListTaskDefinitionFamiliesCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListTaskDefinitionFamiliesCommand(input), ...args);
};
const makePagedRequest = async (
  client: ECS,
  input: ListTaskDefinitionFamiliesCommandInput,
  ...args: any
): Promise<ListTaskDefinitionFamiliesCommandOutput> => {
  // @ts-ignore
  return await client.listTaskDefinitionFamilies(input, ...args);
};
export async function* listTaskDefinitionFamiliesPaginate(
  config: ECSPaginationConfiguration,
  input: ListTaskDefinitionFamiliesCommandInput,
  ...additionalArguments: any
): Paginator<ListTaskDefinitionFamiliesCommandOutput> {
  let token: string | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListTaskDefinitionFamiliesCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof ECS) {
      page = await makePagedRequest(config.client, input, ...additionalArguments);
    } else if (config.client instanceof ECSClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected ECS | ECSClient");
    }
    yield page;
    token = page.nextToken;
    hasNext = !!token;
  }
  // @ts-ignore
  return undefined;
}
