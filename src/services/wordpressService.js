import axios from 'axios';
import base64 from 'base-64';

const username = import.meta.env.VITE_WP_USERNAME;
const appPassword = import.meta.env.VITE_WP_PASSWORD;
const baseUrl = import.meta.env.VITE_WP_URL;
const auth = base64.encode(`${username}:${appPassword}`);

export const postNewsToWordPress = async (articleData) => {
  try {
    const res = await axios.post(`${baseUrl}/wp-json/wp/v2/posts`, {
      title: articleData.title,
      slug: articleData.slug,
      status: articleData.status,
      date: articleData.date,
      content: articleData.content,
      format: articleData.format,
      meta: articleData.meta
    }, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      link: res.data.link
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}; 