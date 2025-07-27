import ProfileMenu from "./ProfileMenu"

function Header() {
  return (
    <header className="header" style={styles.header}>
        <div className="container" style={styles.container}>
            <h1>Bug Tracker</h1>
            <nav>
                <ul className="nav" style={styles.nav}>
                    <li className="navItem" style={styles.navItem}>Dashboard</li>
                    <li>Report Bug</li>
                    <li>View Bugs</li>
                    <ProfileMenu isUserLoggedIn={false} />
                </ul>

            </nav>
        </div>
    </header>
  )
}
const styles = {
    header: {
        // backgroundColor: '#282c34',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        justifyContent: 'space-around',
        width: '100%',
        
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nav: {
        listStyleType: 'none',
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center',

    },
    navItem: {
        cursor: 'pointer',
    },
}

export default Header