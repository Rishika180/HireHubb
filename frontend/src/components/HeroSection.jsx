import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4'>
            <div className='flex flex-col gap-5 my-8 sm:my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Smart Hiring Platform</span>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'> Find Opportunities That Match<br />Your Skills <span className='text-[#6A38C2]'></span></h1>
                <p className='max-w-2xl mx-auto text-sm sm:text-base'> Connect with top recruiters, explore curated job listings,
  and take the next step in your professional journey with HireHub.</p>
                <div className='flex w-full sm:w-3/4 lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full min-w-0'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection