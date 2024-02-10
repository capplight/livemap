import {Auth} from 'aws-amplify';
import {Signin} from '@redux/Login/LoginAction';

export const signInApi = ({email, password}: Signin) => {
  // const session: any = async () => await Auth?.currentSession();
  // console.log(session?.getIdToken, 'Seession');
  const res = Auth.signIn(email, password);
  return res;
};
