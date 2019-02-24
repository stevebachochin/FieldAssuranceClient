export interface IAppConfig {
    env: {
        name: string;
    };
    ConnectionStrings: {
      apiServer: string;
      apiAuthServer: string;
      timeout: number;
    };
}
