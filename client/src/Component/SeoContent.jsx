import React from 'react'
import content from '../details.json'
import '../Style/SeoContent.css';

const SeoContent =()=>{
    return (
      <div className='pb-[30px] max-w-7xl mx-auto px-2'>
        <div className='cardContainer'>
            {
                content.map((content)=> <div key={content?.id} className="pb-3">
                    <h1 className='text-[22px] pb-[4px]'>{content.name}</h1>
                    <p>{content.desc}</p>
                </div>)
            }
        </div>
      </div>
    )
}

export default SeoContent;