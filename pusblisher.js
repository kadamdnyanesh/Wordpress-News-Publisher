const axios = require('axios');
const base64 = require('base-64');

const username = 'your-wp-username';
const appPassword = 'your-application-password';
const auth = base64.encode(`${username}:${appPassword}`);

const postNewsToWordPress = async (title, content) => {
  try {
    const res = await axios.post('https://yourdomain.com/wp-json/wp/v2/posts', {
      title: title,
      content: content,
      status: 'publish'
    }, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Post published:', res.data.link);
  } catch (error) {
    console.error('Failed to post:', error.response?.data || error.message);
  }
};