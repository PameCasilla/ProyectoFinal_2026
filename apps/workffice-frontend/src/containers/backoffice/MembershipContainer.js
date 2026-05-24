import React from 'react';
import { useSelector } from 'react-redux';
import { MembershipListComponent } from '../../components/Membership/MembershipListComponent';



export const MembershipContainer = () => {
    const loading = useSelector(state => state.isLoading);
    const userMe = useSelector(state => state.userMe)
    const branch = useSelector(state => state.officeBranch);
    const membership = useSelector(state => state.membership)
    return <MembershipListComponent membership={membership} branch={branch} userMe={userMe} loading={loading}/>;
};
