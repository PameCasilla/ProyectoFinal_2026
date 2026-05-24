export const LOADING = 'GENERAL_LOADING';


export const setIsLoading = isLoading => ({
  type: LOADING,
  payload: isLoading,
});
