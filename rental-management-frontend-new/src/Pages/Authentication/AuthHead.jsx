import logo from '../../Static/Images/logo-dark.svg'

const AuthHead = ({head,subhead,icon}) => {
    return (
        <div className='text-center mb-11'>
            <img src={logo} alt='' className='mb-4 ml-20'/>
            <h1 className='text-dark font-bold mb-3 text-2xl'>{head}</h1>
            <img src={icon} alt='' className='w-32 inline-flex' />
            <div className='text-md text-secondary font-medium'>{subhead}</div>
        </div>
    )
}

export default AuthHead