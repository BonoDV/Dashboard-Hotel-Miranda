import { Link } from 'react-router';

function SideBar() {
    return (

        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/room">Room</Link></li>
                <li><Link to="/booking">Bookings</Link></li>
                <li><Link to="/user">Guest</Link></li>
                <li><Link to="/contact">Concierge</Link></li>
            </ul>
        </nav>

    );
}


export default SideBar;