// utils/permission.ts
const SECRET_CODE = "admin"; 

export const setAdminPermission = (isAdmin: boolean) => {
  sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
};

export const getAdminPermission = (): boolean => {
  return JSON.parse(sessionStorage.getItem("isAdmin") || "false");
};

export const validateSecretCode = (code: string): boolean => {
  return code === SECRET_CODE;
};
// Clear admin permission (useful for logout)
export const clearAdminPermission = () => {
  sessionStorage.removeItem("isAdmin");
};