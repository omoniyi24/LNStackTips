import {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Question from "./Question";
import QuestionList from "../components/questions/QuestionList";
import QuestionContext from "../context/question/QuestionContext";

function Dashboard() {
    const {questions, loading, fetchQuestions} = useContext(QuestionContext)


    const name = 'Ilesanmi'
    const login = 'Omoniyi24'
    const twitter_username = 'Omoniyi24'
    const html_url = 'http://google.com'
    const avatar_url = 'https://avatars.githubusercontent.com/u/31474007?v=4'
    const hireable = false
    const type = "NEW"
    const bio = "a Software Engineer who's interested in building Bitcoin/Lightning applications"
    const blog = "https://omoniyi24.github.io/"
    const location = "Lagos"
    const websiteUrl = "omoniyi24.github.io"
    const followers = "23"
    const following = "10"
    const public_repos = questions.length
    const public_gists = "https://github.com/omoniyi24"
    // const public_repos = "10"
    // const public_repos = "10"


    return (
        <>
            <div className='w-full mx-auto lg:w-10/12'>
                <div className='mb-4'>
                    <Link to='/askquestion' className='btn btn-ghost'>
                        Ask a question
                    </Link>
                </div>

                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
                    <div className='custom-card-image mb-6 md:mb-0'>
                        <div className='rounded-lg shadow-xl card image-full'>
                            <figure>
                                <img src={avatar_url} alt=''/>
                            </figure>
                            <div className='card-body justify-end'>
                                <h2 className='card-title mb-0'>{name}</h2>
                                <p className='flex-grow-0'>{login}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-2'>
                        <div className='mb-6'>
                            <h1 className='text-3xl card-title'>
                                {name}
                                <div className='ml-2 mr-1 badge badge-success'>{type}</div>
                                {hireable && (
                                    <div className='mx-1 badge badge-info'>Hireable</div>
                                )}
                            </h1>
                            <p>{bio}</p>
                            <div className='mt-4 card-actions'>
                                <a
                                    href={html_url}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='btn btn-outline'
                                >
                                    Visit Github Profile
                                </a>
                            </div>
                        </div>

                        <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
                            {location && (
                                <div className='stat'>
                                    <div className='stat-title text-md'>Location</div>
                                    <div className='text-lg stat-value'>{location}</div>
                                </div>
                            )}
                            {blog && (
                                <div className='stat'>
                                    <div className='stat-title text-md'>Website</div>
                                    <div className='text-lg stat-value'>
                                        <a href={websiteUrl} target='_blank' rel='noreferrer'>
                                            {websiteUrl}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {twitter_username && (
                                <div className='stat'>
                                    <div className='stat-title text-md'>Twitter</div>
                                    <div className='text-lg stat-value'>
                                        <a
                                            href={`https://twitter.com/${twitter_username}`}
                                            target='_blank'
                                            rel='noreferrer'
                                        >
                                            {twitter_username}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        <div className='stat'>
                            <div className='stat-figure text-secondary'>
                                <FaUsers className='text-3xl md:text-5xl'/>
                            </div>
                            <div className='stat-title pr-5'>Followers</div>
                            <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                {followers}
                            </div>
                        </div>

                        <div className='stat'>
                            <div className='stat-figure text-secondary'>
                                <FaUserFriends className='text-3xl md:text-5xl'/>
                            </div>
                            <div className='stat-title pr-5'>Following</div>
                            <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                {following}
                            </div>
                        </div>

                        <div className='stat'>
                            <div className='stat-figure text-secondary'>
                                <FaCodepen className='text-3xl md:text-5xl'/>
                            </div>
                            <div className='stat-title pr-5'>Total Question</div>
                            <div className='stat-value pr-5 text-3xl md:text-4xl'>
                                {public_repos}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rounded-lg shadow-lg card bg-base-100'>
                    <div className='card-body'>
                        <h2 className='text-3xl my-4 font-bold card-title'>
                            Your Questions
                        </h2>
                        <QuestionList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard