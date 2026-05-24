import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MembershipAcquisitionList } from "../../components/MembershipAcquisition/MembershipAcquisitionList"
import { fetchMembershipAcquisitions } from "../../stores/actions/booking/membershipAcquisitionActions"

export const MembershipAcquisitionListContainer = () => {
    const dispatch = useDispatch()
    const membershipAcquisitions = useSelector(state => state.membershipAcquisitions)
    const loadMembershipAcquisitions = useCallback(() => {
        dispatch(fetchMembershipAcquisitions())
    }, [dispatch])
    return <MembershipAcquisitionList
        membershipAcquisitions={membershipAcquisitions}
        loadMembershipAcquisitions={loadMembershipAcquisitions}
    />
}
