export const BaseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api-impact.devdiego.work/api/";

export const SignUpURL = new URL("signup", BaseURL);

export const LoginURL = new URL("login", BaseURL);

export const MeProfileURL = new URL("me/profile", BaseURL);

export const DocumentURL = new URL("document/upload", BaseURL);

export const UsersURL = new URL("admin/users", BaseURL);

export const getUserStatusURL = (userId: string) => {
  return new URL(`admin/users/${userId}/status`, BaseURL);
};

export const EstimatesURL = new URL("estimates", BaseURL);

export const FormDataURL = new URL("estimates/form-data", BaseURL);

export const getPanelStylesURL = (productId: string) => {
  return new URL(`estimates/form-data/panel-styles?productId=${productId}`, BaseURL);
};

export const getConfigurationsURL = (panelStyleId: string) => {
  return new URL(`estimates/form-data/configurations?panelStyleId=${panelStyleId}`, BaseURL);
};

export const getEstimateProductsURL = (estimateId: string) => {
  return new URL(`estimates/${estimateId}/products`, BaseURL);
};

export const getEstimateProductMarkupURL = (estimateId: string, productId: string) => {
  return new URL(`estimates/${estimateId}/products/${productId}/markup`, BaseURL);
};

export const getEstimateProductURL = (estimateId: string, productId: string) => {
  return new URL(`estimates/${estimateId}/products/${productId}`, BaseURL);
};

export const MergeEstimatesURL = new URL("estimates/merge", BaseURL);

export const getEstimateURL = (estimateId: string) => {
  return new URL(`estimates/${estimateId}`, BaseURL);
};

export const CloneEstimateURL = new URL("estimates/clone", BaseURL);

