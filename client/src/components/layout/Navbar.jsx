import {FaGithub} from "react-icons/fa";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'

function Navbar({title}) {
    return (
        <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
            <div className='container mx-auto'>
                <div className='flex-none px-2 mx-2'>
                    <FaGithub className='inline pr-2 text-3xl'/>
                    <Link to='/' className='text-lg font-bold align-middle'>{title}</Link>
                </div>

                <div className='flex-1 px-2 mx-2'>
                    <div className='flex justify-end'>
                        <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>Home</Link>
                        <Link to='/dashboard' className='btn btn-ghost btn-sm rounded-btn'>Dashboard</Link>
                        <Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>About</Link>
                        <Link to='/help' className='btn btn-ghost btn-sm rounded-btn'>Help</Link>
                        <Link to='/signIn' className='btn btn-ghost btn-sm rounded-btn'>signIn</Link>
                        {/*<Link to='/signUp' className='btn btn-ghost btn-sm rounded-btn'>signUp</Link>*/}

                    </div>
                </div>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    title: 'LNStackTips'
}

Navbar.protoType = {
    title: PropTypes.string
}

export default Navbar