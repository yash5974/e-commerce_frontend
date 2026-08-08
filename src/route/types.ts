export interface RedirectLocation {
  pathname: string;
  search: string;
  hash: string;
}

export interface RouteState {
  from?: RedirectLocation;
}
