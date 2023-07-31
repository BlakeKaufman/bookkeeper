export async function handler(event, context) {
  console.log(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(event.body),
  };
}
