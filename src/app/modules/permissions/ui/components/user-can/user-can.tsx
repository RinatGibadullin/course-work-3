import React, { useEffect, useState } from 'react';
import { UserCanContext } from './context';
import userPermissions from 'app/modules/permissions/domain/services/UserPermissions';
import { UserActions } from 'app/modules/permissions/domain/enums/UserActions';
import { useUser } from '../../hooks/use-user';

type Props = {
  children: any
  action: UserActions
  payload?: any
};

const UserCan = (props: Props) => {
  const user = useUser();
  const [isUserCan, setUserCan] = useState<boolean | null>(null);
  useEffect(() => {
    if (user != null) {
      const isUserCan = userPermissions.userCan(user, props.action, props.payload)
      setUserCan(isUserCan);
    }
  }, [user]);
  return (
    <UserCanContext.Provider value={isUserCan}>
      {props.children}
    </UserCanContext.Provider>
  )
}

export default UserCan;