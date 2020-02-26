exports.handler = async (event, context, callback) => {
  console.log({ event });
  const { challenge } = JSON.parse(
    '{"' + event.body.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) =>
      key === ""
        ? value
        : decodeURIComponent(value)
            .replace(/\+/g, " ")
            .trim()
  );

  if (challenge) {
    return callback(null, {
      statusCode: 200,
      body: challenge
    });
  }
};
