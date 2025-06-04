import UserDashboardContainer from "../common/UserDashboardContainer";

export default function AdminHome() {
    return <UserDashboardContainer admin={true}>
        <h1>Hi</h1>
    </UserDashboardContainer>
}