export interface IFortniteClientOptions {
  timeoutMs?: number;
  proxy?: IProxyOptions;
}

export interface IProxyOptions {
  host: string;
  port: number;
}
