import '../styles/user-info.css';
import AllBugsList from './AllBugsList';
import BugsReportedByUser from './BugsReportedByUser';

const UserInfo = () => {
    return (
        <div className='user-info container'>
            <div className="info-component">
                <h3>List Of Bugs Reported</h3>
                <AllBugsList />
            </div>
            <div className="info-component">
                <h3>Bugs Reported By You</h3>
                <BugsReportedByUser />
            </div>
        </div>
    )
}

export default UserInfo