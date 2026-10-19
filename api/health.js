export default function handler(_request, response) {
  response.status(200).json({ message: 'Connected to the Node.js backend.' })
}
