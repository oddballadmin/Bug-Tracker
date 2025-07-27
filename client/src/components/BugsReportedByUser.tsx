import { useContext, useEffect, useState } from 'react'
import { BugContext } from '../context/BugContext';
import { UserContext } from '../context/UserContext';
import type { BugType } from '../types/BugType';

const BugsReportedByUser = () => {
    const { bugList } = useContext(BugContext);
    const userID = useContext(UserContext).userId;

    const [userBugs, setUserBugs] = useState<BugType[]>([]);

    useEffect(() => {
        const filteredBugs = bugList.filter(bug => bug.reported_by == userID);
        setUserBugs(filteredBugs);
        console.log('Filtered Bugs:', filteredBugs);
    }, [bugList, userID]);

    if (!userBugs.length) {
        return <p>No bugs reported by this user.</p>;
    }
    return (
        <ul className='bug-list'>
            {userBugs.map(bug => (
                <li key={bug.id}>{bug.title}</li>
            ))}
        </ul>
    )
}

export default BugsReportedByUser