import { useContext } from 'react';
import { UserCanContext } from './context';

type Props = {
  children: any
};
const UCFailed = (props: Props) => {
  const isUserCanSuccess = useContext(UserCanContext);
  if (!isUserCanSuccess) {
    return props.children;
  }
  return null;
};

export default UCFailed;