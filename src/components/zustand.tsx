import { create } from 'zustand'


interface useStoreT {
    username?:string;
    setUsername?:(by:string)=>void;
    loginSuccess?:boolean;
    setLoginSuccess?:(by:boolean)=>void;
} 

export const useStore = create<any>()((set)=>({
    username: '',
    setUsername: (data:any) => set({ username: data }),
    loginSuccess:false,
    setLoginSuccess: (data:any) => set({ loginSuccess: data }),
    password:''
    ,setPassword:(data:any) => set({ loginSuccess: data }),
}));

