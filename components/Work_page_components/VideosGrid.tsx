import React from 'react'
import styled from 'styled-components'

export default function VideosGrid({videos}:{videos:{url:string}[]}) {
  
    const VideosGrid = styled.div`
        padding: 9vmax 0;
        width: calc(100% - 4rem);
        margin: auto;
        .content
        {
            display: flex;
            justify-content: space-between;
            gap: 2rem;
            .video-container
            {
                video{
                    display: block;
                    width: 100%;
                }
            }
        }
    `;
  
    return (
    <VideosGrid>
        <div className="content">
            {
                videos.map((item:{url:string})=>(
                    <div key={item.url} className="video-container">
                        <video src={item.url} autoPlay loop muted></video>
                    </div>
                ))
            }
        </div>
    </VideosGrid>
  )
}
