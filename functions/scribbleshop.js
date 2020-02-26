const axios = require("axios");

const { SLACK_TOKEN } = process.env;

exports.handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  console.log({ requestBody });
  if (requestBody.challenge) {
    return callback(null, {
      statusCode: 200,
      body: requestBody.challenge
    });
  }

  if (requestBody.event) {
    const userData = await axios.get(
      `https://slack.com/api/users.info?token=${SLACK_TOKEN}&user=${requestBody.event.user}`
    );
    const channelData = await axios.get(
      `https://slack.com/api/conversations.info?token=${SLACK_TOKEN}&channel=${requestBody.event.channel}`
    );
    console.log({
      channelId: requestBody.event.channel,
      name: userData.data.user.profile.display_name,
      channel: channelData.data.channel.name,
      time: new Date(requestBody.event_time * 1000),
      text: requestBody.event.text,
      files: requestBody.event.files && requestBody.event.files.map(file => file.url_private).join("\n")
    });
    callback(null, {
      statusCode: 200
    });
  }
};
