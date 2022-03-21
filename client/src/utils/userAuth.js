export const saveUserAuth = (data) => {
  localStorage.setItem(
    `${process.env.REACT_APP_PREFIX}-userAuth`,
    JSON.stringify(data)
  );
};

export const removeUserAuth = () => {
  localStorage.removeItem(`${process.env.REACT_APP_PREFIX}-userAuth`);
};

export const getUserAuth = () => {
  let data = localStorage.getItem(`${process.env.REACT_APP_PREFIX}-userAuth`);

  const getInitialState = () => ({
    accessToken: null,
    expiresAt: Date.now(),
  });

  if (!data) return getInitialState();
  
  data = JSON.parse(data);

  return data.expiresAt > Date.now() ? data : getInitialState();
};
