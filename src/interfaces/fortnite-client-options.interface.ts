export interface IFortniteClientOptions {
  /**
   * Timeout for awaiting a response until it fails. Defaults to 5000 milliseconds.
   */
  timeoutMs?: number;
  /**
   * Tunnel requests through a proxy of your choice. If you want to inspect requests with Fiddler you have to
   * setup the proxy here.
   */
  proxy?: IProxyOptions;
}

export interface IProxyOptions {
  host: string;
  port: number;
}
