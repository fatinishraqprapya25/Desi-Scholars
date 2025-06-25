import UserDashboardContainer from '../../common/UserDashboardContainer';
import Profile from '../profile/Profile';

export default function MyProfile() {
    return (
        <UserDashboardContainer role="teacher">
            <Profile />
        </UserDashboardContainer>
    );
}