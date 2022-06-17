function About(){
    return (
        <>
            <h1 className='text-6xl mb-4'>LNStackTips</h1>
            <p className='mb-4 text-2xl font-light'>
                An app that helps developers answer your questions.
            </p>
            <p className='text-lg text-gray-400'>
                Version <span className='text-white'>1.0.0</span>
            </p>
            <p className='text-lg text-gray-400'>
                Built By:
                <a className='text-white' href='https://twitter.com/Omoniyi24'>
                     Omoniyi Ilesanmi
                </a>
                &
                <a className='text-white' >
                    Jennifer Ezeobi
                </a>
            </p>
        </>
    )
}

export default About