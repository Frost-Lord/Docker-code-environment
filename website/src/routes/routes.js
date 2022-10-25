/////////////////////////////////Host//////////////////////////////////////////////////////////////

export const host = "http://localhost:7777";

/////////////////////////////////Auth//////////////////////////////////////////////////////////////
export const loginRoute = `${host}/auth/login`;
export const registerRoute = `${host}/auth/register`;
export const logoutRoute = `${host}/auth/logout`;
export const dockerlogs = `${host}/docker/logs`;
/////////////////////////////////Create//////////////////////////////////////////////////////////////
export const allfiles = `${host}/files/allfiles`;
export const CDir = `${host}/files/cdir`;
export const CFile = `${host}/files/cfile`;
export const getfile = `${host}/files/getfile`;
export const savefile = `${host}/files/savefile`;