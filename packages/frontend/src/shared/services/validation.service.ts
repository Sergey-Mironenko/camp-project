export const validateTitleDesctop = (str: string) => {
  if (!str) {
    return 'Required'
  } else if (!(/^[a-zA-ZА-Яа-яЁё]*$/.test(str))) {
    return 'Letters only'
  } else if (str.length > 12) {
    return 'Too long'
  }
};

export const validateTitlePhone = (str: string) => {
  if (!str || !(/^[a-zA-ZА-Яа-яЁё]*$/.test(str)) || str.length > 12) {
    return '!'
  }
};
