import React from 'react'
import Layout from '../components/Layout'
import Archive from '../components/pages/Archive'
import DataInterface from '../types/DataInterface';
import { request } from "../lib/datocms";

export default function ArchivePage({data}:{data:DataInterface}) {
  return (
    <div>
        <Layout >
            <Archive data={data}/>
        </Layout>
    </div>
  )
}


const ARCHIVE_QUERY = `
    {
        archive
        {
            image
            {
                url
                width
                height
            }
        }
    }
    `;
  
  export async function getStaticProps() {
    const data = await request({
      query: ARCHIVE_QUERY,
      variables: { limit: 10 }
    });
    return {
      props: { data }
    };
  }