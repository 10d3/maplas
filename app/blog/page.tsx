import BlogCard from '@/components/shared/BlogCard'
import React from 'react'

function page() {
    const blogData = [
        {
            title: 'Blog 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            title: 'Blog 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
    ]
  return (
    <section className='w-full h-auto flex flex-col items-center justify-center my-6'>
        <h1 className='mb-4 text-xl font-medium'>Welcomw to our BLOG</h1>
        <div className='flex flex-col gap-4 w-full items-center'>
            {
                blogData.map((blog, index) => (
                    <BlogCard key={index} data={blog}/>
                ))
            }
        </div>
    </section>
  )
}

export default page