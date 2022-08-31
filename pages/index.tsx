import { log } from 'console';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'
import { request } from "../lib/datocms";

const HOMEPAGE_QUERY = `{
  allWorks {
    id
    title
    desc
    slug
    laoder {hex}
    image {url}
    _status
    _firstPublishedAt
  }
	heroSlideshow{
    images{url}
  }
  _allWorksMeta {
    count
  }
}`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 }
  });
  return {
    props: { data }
  };
}

interface DataInterface {
  [field:string]:any,
}

function Home({data}:{data:DataInterface}) 
{  
  return (
    <div>      
      <Layout data={data}/>
    </div>
  )
}

export default Home
