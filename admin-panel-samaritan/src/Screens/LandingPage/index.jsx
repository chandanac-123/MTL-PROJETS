import samaritan from '../../assets/landingpage.svg'
import samaritanlogo from '../../assets/logo.svg'
import playstore from '../../assets/playstore.svg'
import appstore from '../../assets/appstore.svg'

const LandingPage = () => {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex sm:w-[1204px] w-[336px]  sm:h-[580px] h-[360px]  outline outline-1 outline-outline_grey rounded-xl ">
                <div className="flex  flex-col gap-2  justify-center items-center w-full">
                    <div className="flex w-full justify-center items-center">
                        <img src={samaritanlogo} alt="" className='sm:w-[96px] w-[50px] sm:h-[96px] h-[49px]' />
                        <img src={samaritan} alt="" className='sm:w-[361px] w-[219px]' />
                    </div>
                    <p className='flex text-text_grey font-inter font-normal text-base break-all flex-wrap text-center py-4 px-12'>
                        Join the Green Movement: Connect, Act, and Make a Difference with Samaritan!</p>
                    <div className="w-full sm:flex gap-2 justify-center items-center">
                        <div className='flex justify-center items-center'>
                            <button><img src={appstore} alt="" className='sm:w-full w-[164px]' /></button>
                        </div>
                        <div className='flex justify-center items-center py-2'>
                            <button><img src={playstore} alt="" className='sm:w-full w-[164px]' /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LandingPage