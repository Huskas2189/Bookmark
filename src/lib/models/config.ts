
export type Config = {
  title: string;
  apps: App[];
};

export type App = {
  name: string;
  url: string;
  icon?: string;
  roles: string[];
}