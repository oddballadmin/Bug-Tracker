import { useContext, useEffect} from 'react'
import '../styles/user-info.css';
import { BugContext } from '../context/BugContext';

const AllBugsList = () => {
    const { bugList } = useContext(BugContext);

    useEffect(() => {
        
    }, []);
    return (
        <ul className='bug-list'>
            {bugList.length === 0 && <p>No bugs found.</p>}
           {bugList.map((bug) => (
               <li key={bug.id}>{bug.title}</li>
           ))}
          
        </ul>
    )
}

export default AllBugsList