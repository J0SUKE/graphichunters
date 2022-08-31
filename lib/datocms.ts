import { GraphQLClient } from "graphql-request";

interface headerInterface {
  [name:string]:any,
}

export function request({ query, variables, includeDrafts, excludeInvalid }:{ query:string, variables:{limit:number}, includeDrafts?:string, excludeInvalid?:string }) {
  
  const headers:headerInterface = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  };
  
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query, variables);
}