import { create } from 'zustand';
import { UserType } from '~shared/services/types';

const user: UserType = {
	name: 'Sergey',
	email: 'dsa@kljhjklkhlh',
    password: 'AAAAAA',
    verificationToken: '2332423',
    activationToken: '436456546',
    isVerified: false,
    isActivated: true,
};


interface IUserStore {
  user: UserType;
  setUser: (offset: UserType | null) => () => void;
}

export const useUsersStore = create<IUserStore>((set) => {
  return {
	user: null,
	setUser: (user: UserType | null) => {
	  return (): void => {
		set((state) => {
		  return {
            user,
		  };
		});
	  };
	},
  };
});
