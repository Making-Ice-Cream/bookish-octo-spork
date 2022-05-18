import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import fetch from 'sync-fetch';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { mockImgCover } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((_, index) => {

  // ------------------------------------------
  // fetch('https://newsapi.org/v2/everything?q=Technology&from=2022-02-17&sortBy=popularity&apiKey=a19dd466d7324e3cb83429f0d1818f3b', {
  //   method: 'GET'
    
  // })
  // .then(response => response.json())
  // .then(data => {
  //   let newsdata = Array.from(data.articles).slice(0,5);
  //   console.log(newsdata)
  //   const setIndex = index + 1;
  //   return {
  //     title: faker.name.title(),
  //     description: newsdata[setIndex].content,
  //     image: newsdata[setIndex].urlToImage,
  //     postedAt: faker.date.soon()
  //   };
  // })
  // .catch((error) => {
  //   const setIndex = index + 1;
  // return {
  //   title: faker.name.title(),
  //   description: faker.lorem.paragraphs(),
  //   image: mockImgCover(setIndex),
  //   postedAt: faker.date.soon()
  // };
  // });
// ================================
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgCover(setIndex),
    postedAt: faker.date.soon()
  };
});




NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {formatDistance(postedAt, new Date())}
      </Typography>
    </Stack>
  );
}

function NewsItems({ news }) {
  // console.log(news);
  const { urlToImage, title, description ,publishedAt ,url  } = news;
  // console.log(url);
  return (
   
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        src={urlToImage}
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
      <Box sx={{ minWidth: 240 }}>
        <Link  href= {url} color="inherit" underline="hover"  rel="noreferrer"  target = "_blank">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
         {formatDistance(new Date(publishedAt), new Date(),{ addSuffix: true })}
      </Typography>
      
    </Stack>
  );
}

export default function AppNewsUpdate() {
  let d = [];
 try{
  const metadata = fetch('https://saurav.tech/NewsAPI/top-headlines/category/general/in.json', {
  headers: {
    Accept: 'application/vnd.citationstyles.csl+json'
  }
   }).json()
   d = metadata.articles.slice(0,5);
   console.log(d)
   localStorage.setItem("news" , JSON.stringify(d));
  }
  catch(err){
   d = JSON.parse(localStorage.getItem("news"));
  }
   

  return (
    <Card>
      <CardHeader title="Admin | News Update" />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          
          {d != null ? d.map((news) => (
            <NewsItems key={news.title} news={news} />
          )): ''}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
