import Profile from "../Profile";
import UserDashboardContainer from "../../common/UserDashboardContainer";

export default function UserDashboardProfile() {
    console.log("This component rendered!")
    return <>
        <UserDashboardContainer>
            <Profile />
        </UserDashboardContainer>
    </>
}