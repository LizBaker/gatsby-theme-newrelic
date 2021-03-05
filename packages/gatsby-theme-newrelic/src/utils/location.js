export const stripTrailingSlash = (path) => path.replace(/\/$/, '');

export const addLeadingSlash = (path) =>
  path.startsWith('/') ? path : `/${path}`;

export const addTrailingSlash = (path) =>
  path.endsWith('/') ? path : `${path}/`;
