import { useContext } from 'react';
import { UserCanContext } from './context';

type Props = {
  children: any
};
const UCSuccess = (props: Props) => {
  const isUserCanSuccess = useContext(UserCanContext);
  if (isUserCanSuccess) {
    return props.children;
  }
  return null;
};

export default UCSuccess;