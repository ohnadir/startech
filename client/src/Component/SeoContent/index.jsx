import React from 'react'
import content from '../../JSON/details.json'
import './SeoContent.scss';

const SeoContent =()=>{
    return (
      <div className='seo-content'>
        {
          content.map((content)=> <div key={content?.id} className="pb-3">
            <h1 className='text-[22px] pb-[4px]'>{content.name}</h1>
            <p>{content.desc}</p>
          </div>)
        }
      </div>
    )
}

export default SeoContent;